package br.com.fiap.ecovolt_api.app;

import java.time.*;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {
    private final JdbcTemplate db;
    private static final String REVIEWER_EMAIL="profalexandre.jesus@fiap.com.br";
    private static final String INVITE_HASH="7368801ea785863d945c223fcbf3d01f0453a7078006df8e39dff11ddfda026f";
    record Session(long userId, Instant expires) {}
    record Attempt(int count, Instant expires) {}
    private final Map<String, Session> sessions = new ConcurrentHashMap<>();
    private final Map<String, Attempt> attempts = new ConcurrentHashMap<>();
    public AuthService(JdbcTemplate db) { this.db = db; }
    public static ResponseStatusException fail(int code, String message) { return new ResponseStatusException(HttpStatus.valueOf(code), message); }
    public void throttle(String key) {
        Instant now = Instant.now();
        attempts.entrySet().removeIf(e -> e.getValue().expires().isBefore(now));
        if (attempts.size() > 10000) throw fail(429, "Muitas solicitações. Tente novamente mais tarde.");
        Attempt a = attempts.compute(key, (k, old) -> old == null ? new Attempt(1, now.plusSeconds(900)) : new Attempt(old.count()+1, old.expires()));
        if (a.count() > 20) throw fail(429, "Muitas tentativas. Aguarde 15 minutos.");
    }
    public Map<String,Object> profile(long id) {
        var rows = db.queryForList("""
            SELECT u.id_usuario "id", u.nm_usuario "displayName", u.em_usuario "email",
            u.pt_total "points", u.xp_total "xp", u.tp_usuario "role", t.nm_tier "tier",
            (SELECT COUNT(*) FROM T_EV_ENVIO_ACAO e WHERE e.T_EV_USUARIO_id_usuario=u.id_usuario AND e.st_envio='APROVADO') "completedActions",
            (SELECT COUNT(*) FROM T_EV_USU_MIS m WHERE m.id_usuario=u.id_usuario AND m.st_missao_usuario='EM_ANDAMENTO') "activeMissions"
            FROM T_EV_USUARIO u JOIN T_EV_TIER t ON t.id_tier=u.id_tier
            WHERE u.id_usuario=? AND u.at_usuario='S' AND u.st_usuario='ATIVO'
            """, id);
        if (rows.isEmpty()) throw fail(401, "Sua sessão expirou. Entre novamente.");
        return rows.getFirst();
    }
    public long require(String header) {
        if (header == null || !header.startsWith("Bearer ")) throw fail(401, "Entre na sua conta para continuar.");
        String key = Passwords.digest(header.substring(7));
        Session session = sessions.get(key);
        if (session == null || session.expires().isBefore(Instant.now())) { sessions.remove(key); throw fail(401, "Sua sessão expirou. Entre novamente."); }
        profile(session.userId());
        return session.userId();
    }
    public void logout(String header) { if (header != null && header.startsWith("Bearer ")) sessions.remove(Passwords.digest(header.substring(7))); }
    private void revoke(long id) { sessions.entrySet().removeIf(e -> e.getValue().userId()==id); }
    private Map<String,Object> start(long id) {
        sessions.entrySet().removeIf(e -> e.getValue().expires().isBefore(Instant.now()));
        if (sessions.size() >= 10000) throw fail(503, "Não foi possível iniciar a sessão. Tente novamente.");
        String token = Passwords.token();
        sessions.put(Passwords.digest(token), new Session(id, Instant.now().plusSeconds(43200)));
        return Map.of("token",token,"user",profile(id));
    }
    private Map<String,Object> credentials(String email) {
        var rows = db.queryForList("SELECT id_usuario, sn_hash FROM T_EV_USUARIO WHERE LOWER(em_usuario)=? AND at_usuario='S' AND st_usuario='ATIVO'", email.trim().toLowerCase(Locale.ROOT));
        return rows.isEmpty() ? null : rows.getFirst();
    }
    public Map<String,Object> login(String email, String password) {
        var row = credentials(email);
        if (row == null || !Passwords.verify(password, (String)row.get("SN_HASH"))) throw fail(401, "E-mail ou senha incorretos.");
        long id = ((Number)row.get("ID_USUARIO")).longValue();
        db.update("UPDATE T_EV_USUARIO SET dt_ultimo_login=SYSDATE WHERE id_usuario=?",id);
        return start(id);
    }
    @Transactional
    public synchronized Map<String,Object> register(String name, String email, String password) {
        email = email.trim().toLowerCase(Locale.ROOT);
        if (db.queryForObject("SELECT COUNT(*) FROM T_EV_USUARIO WHERE LOWER(em_usuario)=?",Integer.class,email)>0) throw fail(409,"Já existe uma conta com este e-mail.");
        Long tier = db.queryForObject("SELECT MIN(id_tier) KEEP (DENSE_RANK FIRST ORDER BY rd_tier) FROM T_EV_TIER WHERE st_tier='ATIVO'",Long.class);
        Long level = db.queryForObject("SELECT MIN(id_nivel) KEEP (DENSE_RANK FIRST ORDER BY nr_nivel) FROM T_EV_NIVEL WHERE st_nivel='ATIVO'",Long.class);
        if (tier == null || level == null) throw fail(503,"O cadastro está temporariamente indisponível.");
        long id = db.queryForObject("SELECT SQ_EV_USUARIO.NEXTVAL FROM DUAL",Long.class);
        String recovery = Passwords.token();
        db.update("INSERT INTO T_EV_USUARIO (id_usuario,nm_usuario,em_usuario,sn_hash,id_tier,id_nivel) VALUES (?,?,?,?,?,?)",id,name.trim(),email,Passwords.hash(password,recovery),tier,level);
        return Map.of("recoveryCode",recovery,"email",email);
    }
    @Transactional
    public String recover(String email, String key, String password) {
        var row = credentials(email);
        if (row == null || !Passwords.recover(key,(String)row.get("SN_HASH"))) throw fail(400,"E-mail ou código de recuperação inválido.");
        long id = ((Number)row.get("ID_USUARIO")).longValue();
        String next = Passwords.token();
        db.update("UPDATE T_EV_USUARIO SET sn_hash=? WHERE id_usuario=?",Passwords.hash(password,next),id);
        revoke(id); return next;
    }
    @Transactional
    public void activateReviewer(long id,String code) {
        var user=profile(id);
        if(!REVIEWER_EMAIL.equalsIgnoreCase((String)user.get("email")) || !java.security.MessageDigest.isEqual(Passwords.digest(code).getBytes(),INVITE_HASH.getBytes())) throw fail(403,"Convite inválido para esta conta.");
        db.update("UPDATE T_EV_USUARIO SET tp_usuario='FUNCIONARIO' WHERE id_usuario=?",id);
    }
    @Transactional
    public String changePassword(long id, String oldPassword, String password) {
        String hash = db.queryForObject("SELECT sn_hash FROM T_EV_USUARIO WHERE id_usuario=?",String.class,id);
        if (!Passwords.verify(oldPassword,hash)) throw fail(400,"A senha atual está incorreta.");
        String next = Passwords.token();
        db.update("UPDATE T_EV_USUARIO SET sn_hash=? WHERE id_usuario=?",Passwords.hash(password,next),id);
        revoke(id); return next;
    }
}

package br.com.fiap.ecovolt_api.app;

import java.util.*;
import java.math.BigDecimal;
import java.time.YearMonth;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AppService {
    final JdbcTemplate db; final AuthService auth; final FileStore files;
    public AppService(JdbcTemplate db,AuthService auth,FileStore files) { this.db=db;this.auth=auth;this.files=files; }
    Map<String,Object> one(String sql,Object... args) { var rows=db.queryForList(sql,args); if(rows.isEmpty()) throw AuthService.fail(404,"Registro não encontrado."); return rows.getFirst(); }
    long num(Map<String,Object> row,String field) { Object x=row.get(field);return x==null?0:((Number)x).longValue(); }
    long next(String sequence) { return db.queryForObject("SELECT "+sequence+".NEXTVAL FROM DUAL",Long.class); }
    public boolean staff(long id) { return Set.of("ADMIN","FUNCIONARIO").contains(auth.profile(id).get("role")); }
    public Map<String,Object> overview(long id) {
        return Map.of("user",auth.profile(id),"pending",db.queryForObject("SELECT COUNT(*) FROM T_EV_ENVIO_ACAO WHERE T_EV_USUARIO_id_usuario=? AND st_envio IN ('PENDENTE','EM_VALIDACAO')",Integer.class,id),
        "accounts",db.queryForObject("SELECT COUNT(*) FROM T_EV_CONTA_ENERGIA WHERE id_usuario=?",Integer.class,id),"recent",submissions(id,false).stream().limit(4).toList());
    }
    public List<Map<String,Object>> missions(long id) {
        return db.queryForList("""
            SELECT m.id_missao "id",m.nm_missao "nome",m.dc_missao "descricao",m.df_missao "dificuldade",m.pt_recompensa "pontos",m.xp_recompensa "xp",
            m.st_missao "status", NVL(u.st_missao_usuario,'DISPONIVEL') "participacao",NVL(u.pg_missao_usuario,0) "progresso"
            FROM T_EV_MISSAO m LEFT JOIN T_EV_USU_MIS u ON u.id_missao=m.id_missao AND u.id_usuario=?
            WHERE m.st_missao='ATIVA' OR u.id_usuario IS NOT NULL ORDER BY m.id_missao
            """,id);
    }
    public Map<String,Object> mission(long user,long id) {
        var m=missions(user).stream().filter(x->num(x,"id")==id).findFirst().orElseThrow(()->AuthService.fail(404,"Missão não encontrada."));
        m.put("acoes",db.queryForList("""
            SELECT a.id_acao "id",a.nm_acao "nome",a.dc_acao_sustentavel "descricao",a.pt_base "pontos",am.qt_necessaria "quantidade"
            FROM T_EV_ACA_SUS_MIS am JOIN T_EV_ACAO_SUSTENTAVEIS a ON a.id_acao=am.id_acao WHERE am.id_missao=? ORDER BY a.id_acao
            """,id)); return m;
    }
    @Transactional public void join(long user,long id) {
        one("SELECT id_missao FROM T_EV_MISSAO WHERE id_missao=? AND st_missao='ATIVA' FOR UPDATE",id);
        var existing=db.queryForList("SELECT st_missao_usuario FROM T_EV_USU_MIS WHERE id_usuario=? AND id_missao=?",user,id);
        if(existing.isEmpty()) db.update("INSERT INTO T_EV_USU_MIS(id_usuario,id_missao) VALUES (?,?)",user,id);
        else if(Set.of("CANCELADA","EXPIRADA").contains(existing.getFirst().get("ST_MISSAO_USUARIO"))) db.update("UPDATE T_EV_USU_MIS SET st_missao_usuario='EM_ANDAMENTO',dt_inicio=SYSDATE WHERE id_usuario=? AND id_missao=?",user,id);
    }
    public List<Map<String,Object>> actions() { return db.queryForList("SELECT id_acao \"id\",nm_acao \"nome\",dc_acao_sustentavel \"descricao\",pt_base \"pontos\" FROM T_EV_ACAO_SUSTENTAVEIS WHERE st_acao='ATIVA' ORDER BY nm_acao"); }
    static final String SUBMISSIONS="""
        SELECT e.id_envio "id",a.nm_acao "nome",e.T_EV_USUARIO_id_usuario "userId",e.st_envio "status",e.ob_usuario "descricao",e.rq_evidencia "arquivo",
        TO_CHAR(e.dt_envio,'YYYY-MM-DD"T"HH24:MI:SS') "data",e.pt_prevista "pontos",a.id_acao "actionId",
        (SELECT MAX(v.ob_validacao) KEEP (DENSE_RANK LAST ORDER BY v.id_validacao) FROM T_EV_VALIDACAO v WHERE v.id_envio=e.id_envio) "feedback",
        (SELECT MAX(r.st_recurso) KEEP (DENSE_RANK LAST ORDER BY r.id_recurso) FROM T_EV_RECURSO_REVISAO r JOIN T_EV_VALIDACAO v ON v.id_validacao=r.id_validacao WHERE v.id_envio=e.id_envio) "revisao",
        (SELECT MAX(r.dc_recurso) KEEP (DENSE_RANK LAST ORDER BY r.id_recurso) FROM T_EV_RECURSO_REVISAO r JOIN T_EV_VALIDACAO v ON v.id_validacao=r.id_validacao WHERE v.id_envio=e.id_envio) "motivoRevisao"
        FROM T_EV_ENVIO_ACAO e JOIN T_EV_ACAO_SUSTENTAVEIS a ON a.id_acao=e.T_EV_ACAO_SUSTENTAVEIS_id_acao
        """;
    public List<Map<String,Object>> submissions(long user,boolean queue) {
        if(queue && !staff(user)) throw AuthService.fail(403,"Somente avaliadores podem acessar a fila.");
        return db.queryForList(SUBMISSIONS+" WHERE (?=1 OR e.T_EV_USUARIO_id_usuario=?) ORDER BY e.dt_envio DESC,e.id_envio DESC",queue?1:0,user);
    }
    public Map<String,Object> submission(long user,long id) {
        return one(SUBMISSIONS+" WHERE e.id_envio=? AND (e.T_EV_USUARIO_id_usuario=? OR ?=1)",id,user,staff(user)?1:0);
    }
    @Transactional public long submit(long user,long action,Long mission,String description,MultipartFile file) {
        var a=one("SELECT pt_base,lm_diario FROM T_EV_ACAO_SUSTENTAVEIS WHERE id_acao=? AND st_acao='ATIVA'",action);
        // Serialize submissions per user to enforce daily limits under concurrent requests.
        one("SELECT id_usuario FROM T_EV_USUARIO WHERE id_usuario=? FOR UPDATE",user);
        long limit=num(a,"LM_DIARIO");
        int today=db.queryForObject("SELECT COUNT(*) FROM T_EV_ENVIO_ACAO WHERE T_EV_USUARIO_id_usuario=? AND T_EV_ACAO_SUSTENTAVEIS_id_acao=? AND dt_envio>=TRUNC(SYSDATE) AND st_envio<>'CANCELADO'",Integer.class,user,action);
        if(limit>0 && today>=limit) throw AuthService.fail(409,"Você já atingiu o limite diário desta ação.");
        if(mission!=null) {
            one("SELECT id_missao FROM T_EV_ACA_SUS_MIS WHERE id_missao=? AND id_acao=?",mission,action);
            join(user,mission);
            one("SELECT id_missao FROM T_EV_USU_MIS WHERE id_usuario=? AND id_missao=? AND st_missao_usuario='EM_ANDAMENTO'",user,mission);
        }
        if(file==null || file.isEmpty()) throw AuthService.fail(400,"Adicione uma evidência da ação.");
        String key=files.save(user,file); long id=next("SQ_EV_ENVIO_ACAO");
        String type=Objects.toString(file.getContentType(),"");String evidence=type.startsWith("image/")?"FOTO":type.startsWith("video/")?"VIDEO":"DOCUMENTO";
        db.update("INSERT INTO T_EV_ENVIO_ACAO(id_envio,T_EV_USUARIO_id_usuario,T_EV_ACAO_SUSTENTAVEIS_id_acao,tp_evidencia,rq_evidencia,pt_prevista,ob_usuario) VALUES (?,?,?,?,?,?,?)",id,user,action,evidence,key,num(a,"PT_BASE"),description.trim());
        if(mission!=null) db.update("INSERT INTO T_EV_ENV_ACA_MIS(id_envio,id_missao) VALUES (?,?)",id,mission);
        return id;
    }
    @Transactional public void cancel(long user,long id) {
        var row=one("SELECT st_envio FROM T_EV_ENVIO_ACAO WHERE id_envio=? AND T_EV_USUARIO_id_usuario=? FOR UPDATE",id,user);
        if(!Set.of("PENDENTE","EM_VALIDACAO").contains(row.get("ST_ENVIO"))) throw AuthService.fail(409,"Esta ação já foi avaliada e não pode ser cancelada.");
        db.update("UPDATE T_EV_ENVIO_ACAO SET st_envio='CANCELADO' WHERE id_envio=?",id);
        db.update("UPDATE T_EV_RECURSO_REVISAO SET st_recurso='CANCELADO' WHERE id_validacao IN (SELECT id_validacao FROM T_EV_VALIDACAO WHERE id_envio=?) AND st_recurso IN ('ABERTO','EM_ANALISE')",id);
    }
    @Transactional public void requestReview(long user,long id,String reason) {
        var row=one("SELECT st_envio FROM T_EV_ENVIO_ACAO WHERE id_envio=? AND T_EV_USUARIO_id_usuario=? FOR UPDATE",id,user);
        if(!"REPROVADO".equals(row.get("ST_ENVIO"))) throw AuthService.fail(409,"A revisão está disponível apenas para ações reprovadas.");
        var v=one("SELECT id_validacao FROM T_EV_VALIDACAO WHERE id_envio=? ORDER BY id_validacao DESC FETCH FIRST 1 ROW ONLY",id);
        Long reviewer=db.queryForObject("SELECT MIN(id_usuario) FROM T_EV_USUARIO WHERE tp_usuario IN ('ADMIN','FUNCIONARIO') AND st_usuario='ATIVO' AND at_usuario='S' AND id_usuario<>?",Long.class,user);
        if(reviewer==null) throw AuthService.fail(409,"Não há avaliador disponível para receber sua revisão.");
        db.update("INSERT INTO T_EV_RECURSO_REVISAO(id_recurso,id_validacao,id_usuario,id_revisor,mt_recurso,dc_recurso) VALUES (?,?,?,?,?,?)",next("SQ_EV_RECURSO_REVISAO"),num(v,"ID_VALIDACAO"),user,reviewer,"Revisão solicitada pelo participante",reason.trim());
        db.update("UPDATE T_EV_ENVIO_ACAO SET st_envio='EM_VALIDACAO' WHERE id_envio=?",id);
    }
    @Transactional public void evaluate(long reviewer,long id,boolean approve,String reason) {
        if(!staff(reviewer)) throw AuthService.fail(403,"Somente avaliadores podem aprovar ações.");
        var e=one("SELECT T_EV_USUARIO_id_usuario user_id,st_envio,pt_prevista FROM T_EV_ENVIO_ACAO WHERE id_envio=? FOR UPDATE",id);
        long user=num(e,"USER_ID");
        if(user==reviewer) throw AuthService.fail(403,"Você não pode avaliar sua própria ação.");
        if(!Set.of("PENDENTE","EM_VALIDACAO").contains(e.get("ST_ENVIO"))) throw AuthService.fail(409,"Esta ação já foi avaliada.");
        long validation=next("SQ_EV_VALIDACAO");
        db.update("INSERT INTO T_EV_VALIDACAO(id_validacao,id_envio,tp_validacao,st_validacao,cc_aprovada,ob_validacao) VALUES (?,?,'REGRA',?,?,?)",validation,id,approve?"APROVADA":"REPROVADA",approve?"S":"N",reason.trim());
        db.update("UPDATE T_EV_ENVIO_ACAO SET st_envio=? WHERE id_envio=?",approve?"APROVADO":"REPROVADO",id);
        db.update("UPDATE T_EV_RECURSO_REVISAO SET st_recurso='RESPONDIDO',dt_resposta=SYSDATE,rs_recurso=?,ob_revisor=?,id_revisor=? WHERE id_validacao IN (SELECT id_validacao FROM T_EV_VALIDACAO WHERE id_envio=?) AND st_recurso IN ('ABERTO','EM_ANALISE')",approve?"APROVADO":"REPROVADO",reason.trim(),reviewer,id);
        if(approve) {
            // Lock user balance before applying points or completing missions.
            one("SELECT id_usuario FROM T_EV_USUARIO WHERE id_usuario=? FOR UPDATE",user);
            award(user,num(e,"PT_PREVISTA"),num(e,"PT_PREVISTA"),id,validation,null);
            for(var m:db.queryForList("SELECT id_missao FROM T_EV_ENV_ACA_MIS WHERE id_envio=?",id)) progress(user,num(m,"ID_MISSAO"));
        }
    }
    void award(long user,long points,long xp,Long envio,Long validation,Long mission) {
        db.update("INSERT INTO T_EV_PONTUACAO(id_pontuacao,id_usuario,id_envio,id_validacao,id_missao,tp_pontuacao,pt_obtidos,xp_obtido,pr_referencia,og_pontuacao) VALUES (?,?,?,?,?,?,?,?,?,?)",next("SQ_EV_PONTUACAO"),user,envio,validation,mission,mission==null?"ACAO":"MISSAO",points,xp,YearMonth.now().toString(),"EcoVolt Web");
        db.update("UPDATE T_EV_USUARIO SET pt_total=pt_total+?,xp_total=xp_total+? WHERE id_usuario=?",points,xp,user);
        db.update("UPDATE T_EV_USUARIO u SET id_nivel=NVL((SELECT MIN(n.id_nivel) KEEP (DENSE_RANK LAST ORDER BY n.nr_nivel) FROM T_EV_NIVEL n WHERE n.st_nivel='ATIVO' AND n.xp_minimo<=u.xp_total),u.id_nivel) WHERE id_usuario=?",user);
    }
    void progress(long user,long mission) {
        var participation=one("SELECT st_missao_usuario FROM T_EV_USU_MIS WHERE id_usuario=? AND id_missao=? FOR UPDATE",user,mission);
        if(!"EM_ANDAMENTO".equals(participation.get("ST_MISSAO_USUARIO"))) return;
        double required=0,completed=0;
        for(var requirement:db.queryForList("SELECT id_acao,qt_necessaria FROM T_EV_ACA_SUS_MIS WHERE id_missao=?",mission)) {
            long amount=num(requirement,"QT_NECESSARIA");required+=amount;
            int count=db.queryForObject("SELECT COUNT(*) FROM T_EV_ENVIO_ACAO e JOIN T_EV_ENV_ACA_MIS em ON em.id_envio=e.id_envio WHERE em.id_missao=? AND e.T_EV_USUARIO_id_usuario=? AND e.T_EV_ACAO_SUSTENTAVEIS_id_acao=? AND e.st_envio='APROVADO'",Integer.class,mission,user,num(requirement,"ID_ACAO"));
            completed+=Math.min(amount,count);
        }
        double pct=required==0?0:Math.min(100,100*completed/required);
        db.update("UPDATE T_EV_USU_MIS SET pg_missao_usuario=?,st_missao_usuario=?,dt_conclusao=CASE WHEN ?=100 THEN SYSDATE ELSE NULL END WHERE id_usuario=? AND id_missao=?",pct,pct==100?"CONCLUIDA":"EM_ANDAMENTO",pct,user,mission);
        if(pct==100) { var m=one("SELECT pt_recompensa,xp_recompensa FROM T_EV_MISSAO WHERE id_missao=?",mission); award(user,num(m,"PT_RECOMPENSA"),num(m,"XP_RECOMPENSA"),null,null,mission); }
    }
    public List<Map<String,Object>> ranking() {
        return db.queryForList("SELECT u.id_usuario \"id\",u.nm_usuario \"nome\",u.pt_total \"pontos\",u.xp_total \"xp\",t.nm_tier \"tier\",DENSE_RANK() OVER(ORDER BY u.pt_total DESC) \"posicao\" FROM T_EV_USUARIO u JOIN T_EV_TIER t ON t.id_tier=u.id_tier WHERE u.st_usuario='ATIVO' AND u.at_usuario='S' ORDER BY u.pt_total DESC,u.id_usuario");
    }
    public List<Map<String,Object>> accounts(long user) {
        return db.queryForList("SELECT id_conta_energia \"id\",nm_titular \"nomeTitular\",cc_conta_energia \"concessionaria\",nr_instalacao \"numeroInstalacao\",ms_referencia \"mesReferencia\",vl_conta \"valorConta\",vl_subsidiado \"valorSubsidio\",st_pagamento \"status\",rq_comprovante \"arquivo\" FROM T_EV_CONTA_ENERGIA WHERE id_usuario=? ORDER BY ms_referencia DESC,id_conta_energia DESC",user);
    }
    public record Account(String nomeTitular,String concessionaria,String numeroInstalacao,String mesReferencia,BigDecimal valorConta) {}
    public static void validateAccount(Account a) {
        if(a.nomeTitular()==null || a.nomeTitular().isBlank() || a.nomeTitular().length()>120 || a.concessionaria()==null || a.concessionaria().isBlank() || a.concessionaria().length()>120 || a.numeroInstalacao()==null || a.numeroInstalacao().length()>80) throw AuthService.fail(400,"Confira titular, concessionária e instalação.");
        try { if(!YearMonth.parse(a.mesReferencia()).toString().equals(a.mesReferencia())) throw new IllegalArgumentException(); } catch(Exception e) { throw AuthService.fail(400,"Informe um mês válido."); }
        if(a.valorConta()==null || a.valorConta().signum()<0 || a.valorConta().compareTo(new BigDecimal("99999999.99"))>0 || a.valorConta().stripTrailingZeros().scale()>2) throw AuthService.fail(400,"Informe um valor válido com até duas casas decimais.");
    }
    @Transactional public long saveAccount(long user,Long id,Account a,MultipartFile file) {
        validateAccount(a);
        if(id!=null) editableAccount(user,id);
        String key=files.save(user,file);
        if(id==null) { id=next("SQ_EV_CONTA_ENERGIA");db.update("INSERT INTO T_EV_CONTA_ENERGIA(id_conta_energia,id_usuario,nm_titular,cc_conta_energia,nr_instalacao,ms_referencia,vl_conta,rq_comprovante) VALUES (?,?,?,?,?,?,?,?)",id,user,a.nomeTitular().trim(),a.concessionaria().trim(),a.numeroInstalacao().trim(),a.mesReferencia(),a.valorConta(),key); }
        else db.update("UPDATE T_EV_CONTA_ENERGIA SET nm_titular=?,cc_conta_energia=?,nr_instalacao=?,ms_referencia=?,vl_conta=?,rq_comprovante=NVL(?,rq_comprovante) WHERE id_conta_energia=? AND id_usuario=?",a.nomeTitular().trim(),a.concessionaria().trim(),a.numeroInstalacao().trim(),a.mesReferencia(),a.valorConta(),key,id,user);
        return id;
    }
    void editableAccount(long user,long id) {
        var c=one("SELECT st_pagamento,id_recompensa FROM T_EV_CONTA_ENERGIA WHERE id_conta_energia=? AND id_usuario=? FOR UPDATE",id,user);
        if(!"PENDENTE".equals(c.get("ST_PAGAMENTO")) || c.get("ID_RECOMPENSA")!=null) throw AuthService.fail(409,"Somente contas pendentes sem benefício podem ser alteradas.");
    }
    @Transactional public void deleteAccount(long user,long id) { editableAccount(user,id); db.update("DELETE FROM T_EV_CONTA_ENERGIA WHERE id_conta_energia=? AND id_usuario=?",id,user); }
    public List<Map<String,Object>> rewards(long user) { return db.queryForList("SELECT id_recompensa \"id\",dc_recompensa \"descricao\",tp_recompensa \"tipo\",vl_recompensa \"valor\",vl_maximo \"limite\",st_recompensa \"status\",pr_referencia \"periodo\" FROM T_EV_RECOMPENSA WHERE id_usuario=? ORDER BY id_recompensa DESC",user); }
    @Transactional public void redeem(long user,long id,Long account) {
        var r=one("SELECT st_recompensa,tp_recompensa,vl_recompensa,vl_maximo FROM T_EV_RECOMPENSA WHERE id_recompensa=? AND id_usuario=? FOR UPDATE",id,user);
        if(!"CONCEDIDA".equals(r.get("ST_RECOMPENSA"))) throw AuthService.fail(409,"Esta recompensa não está disponível para resgate.");
        if(Set.of("SUBSIDIO_ENERGIA","DESCONTO").contains(r.get("TP_RECOMPENSA"))) {
            if(account==null) throw AuthService.fail(400,"Selecione uma conta de energia pendente.");
            editableAccount(user,account);
            BigDecimal value=(BigDecimal)r.get("VL_RECOMPENSA");BigDecimal limit=(BigDecimal)r.get("VL_MAXIMO");
            BigDecimal bill=db.queryForObject("SELECT vl_conta FROM T_EV_CONTA_ENERGIA WHERE id_conta_energia=?",BigDecimal.class,account);
            value=value.min(bill);if(limit!=null)value=value.min(limit);
            db.update("UPDATE T_EV_CONTA_ENERGIA SET id_recompensa=?,vl_subsidiado=?,st_pagamento='APROVADO' WHERE id_conta_energia=?",id,value,account);
        }
        db.update("UPDATE T_EV_RECOMPENSA SET st_recompensa='UTILIZADA' WHERE id_recompensa=?",id);
    }
    public Map<String,Object> updateProfile(long id,String name) { db.update("UPDATE T_EV_USUARIO SET nm_usuario=? WHERE id_usuario=?",name.trim(),id);return auth.profile(id); }
}

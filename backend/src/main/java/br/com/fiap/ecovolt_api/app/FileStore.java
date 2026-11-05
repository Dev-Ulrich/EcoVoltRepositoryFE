package br.com.fiap.ecovolt_api.app;

import jakarta.annotation.PostConstruct;
import java.io.*;
import java.util.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStore {
    private final JdbcTemplate db;
    public FileStore(JdbcTemplate db) { this.db=db; }
    @PostConstruct public void initialize() {
        if (db.queryForObject("SELECT COUNT(*) FROM USER_TABLES WHERE TABLE_NAME='T_EV_ARQUIVO_WEB'",Integer.class)==0)
            db.execute("CREATE TABLE T_EV_ARQUIVO_WEB (id_arquivo VARCHAR2(36) PRIMARY KEY, id_usuario NUMBER(10) NOT NULL REFERENCES T_EV_USUARIO(id_usuario), nm_arquivo VARCHAR2(180) NOT NULL, tp_arquivo VARCHAR2(100) NOT NULL, conteudo BLOB NOT NULL, dt_criacao DATE DEFAULT SYSDATE NOT NULL)");
    }
    public String save(long user,MultipartFile file) {
        if (file==null || file.isEmpty()) return null;
        if (file.getSize()>5*1024*1024) throw AuthService.fail(400,"O anexo deve ter no máximo 5 MB.");
        String type=Objects.toString(file.getContentType(),"");
        if (!Set.of("image/jpeg","image/png","image/webp","application/pdf","video/mp4").contains(type)) throw AuthService.fail(400,"Envie JPG, PNG, WEBP, PDF ou MP4.");
        String name=Objects.toString(file.getOriginalFilename(),"anexo").replaceAll("[^\\p{L}\\p{N}._ -]","_");
        if (name.length()>180) name=name.substring(name.length()-180);
        String id=UUID.randomUUID().toString();
        try {
            byte[] data=file.getBytes(); String safeName=name;
            db.update(c -> { var ps=c.prepareStatement("INSERT INTO T_EV_ARQUIVO_WEB (id_arquivo,id_usuario,nm_arquivo,tp_arquivo,conteudo) VALUES (?,?,?,?,?)");
                ps.setString(1,id);ps.setLong(2,user);ps.setString(3,safeName);ps.setString(4,type);ps.setBinaryStream(5,new ByteArrayInputStream(data),data.length); return ps; });
        } catch(IOException e) { throw AuthService.fail(400,"Não foi possível ler o anexo."); }
        return id;
    }
    public record Download(String name, byte[] bytes) {}
    public Download read(long user,boolean staff,String id) {
        var rows=db.query("SELECT nm_arquivo,conteudo FROM T_EV_ARQUIVO_WEB WHERE id_arquivo=? AND (id_usuario=? OR (?=1 AND EXISTS (SELECT 1 FROM T_EV_ENVIO_ACAO e WHERE e.rq_evidencia=T_EV_ARQUIVO_WEB.id_arquivo)))",
            (r,n)->new Download(r.getString(1),r.getBytes(2)),id,user,staff?1:0);
        if(rows.isEmpty()) throw AuthService.fail(404,"Anexo não encontrado."); return rows.getFirst();
    }
}

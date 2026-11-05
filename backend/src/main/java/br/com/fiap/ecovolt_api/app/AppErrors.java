package br.com.fiap.ecovolt_api.app;
import java.util.Map;
import org.springframework.core.annotation.Order;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.dao.DataAccessException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
@Order(-10)
public class AppErrors {
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<?> status(ResponseStatusException e) { return ResponseEntity.status(e.getStatusCode()).body(Map.of("message",e.getReason()==null?"Não foi possível concluir a solicitação.":e.getReason())); }
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<?> size(Exception e) { return ResponseEntity.status(413).body(Map.of("message","O anexo deve ter no máximo 5 MB.")); }
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<?> validation(Exception e) { return ResponseEntity.badRequest().body(Map.of("message","Confira os campos e os limites de tamanho informados.")); }
    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<?> database(DataAccessException e) {
        org.slf4j.LoggerFactory.getLogger(AppErrors.class).error("Database request failed: {}",e.getClass().getSimpleName());
        return ResponseEntity.status(409).body(Map.of("message","Não foi possível salvar ou consultar o registro. Atualize a página e tente novamente."));
    }
}

package br.com.fiap.ecovolt_api.app;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.*;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.*;

@RestController
@Validated
@RequestMapping("/app")
public class AppController {
    private final AppService app; private final FileStore files;
    public AppController(AppService app,FileStore files) { this.app=app;this.files=files; }
    public record Reason(@NotBlank @Size(min=10,max=500) String reason) {}
    public record Evaluation(boolean approved,@NotBlank @Size(min=10,max=500) String reason) {}
    public record Profile(@NotBlank @Size(min=2,max=120) String name) {}
    public record Redeem(Long accountId) {}
    @GetMapping("/painel") public Map<String,Object> overview(@RequestAttribute("userId") long user) { return app.overview(user); }
    @GetMapping("/missoes") public Object missions(@RequestAttribute("userId") long user) { return app.missions(user); }
    @GetMapping("/missoes/{id}") public Object mission(@RequestAttribute("userId") long user,@PathVariable long id) { return app.mission(user,id); }
    @PostMapping("/missoes/{id}/participar") @ResponseStatus(HttpStatus.NO_CONTENT) public void join(@RequestAttribute("userId") long user,@PathVariable long id) { app.join(user,id); }
    @GetMapping("/acoes") public Object actions() { return app.actions(); }
    @GetMapping("/envios") public Object submissions(@RequestAttribute("userId") long user,@RequestParam(defaultValue="false") boolean queue) { return app.submissions(user,queue); }
    @GetMapping("/envios/{id}") public Object submission(@RequestAttribute("userId") long user,@PathVariable long id) { return app.submission(user,id); }
    @PostMapping(value="/envios",consumes=MediaType.MULTIPART_FORM_DATA_VALUE) @ResponseStatus(HttpStatus.CREATED)
    public Object submit(@RequestAttribute("userId") long user,@RequestParam @Positive long actionId,@RequestParam(required=false) Long missionId,
        @RequestParam @NotBlank @Size(min=10,max=500) String description,@RequestPart MultipartFile file) { return Map.of("id",app.submit(user,actionId,missionId,description,file)); }
    @PostMapping("/envios/{id}/cancelar") @ResponseStatus(HttpStatus.NO_CONTENT) public void cancel(@RequestAttribute("userId") long user,@PathVariable long id) { app.cancel(user,id); }
    @PostMapping("/envios/{id}/revisao") @ResponseStatus(HttpStatus.NO_CONTENT) public void review(@RequestAttribute("userId") long user,@PathVariable long id,@Valid @RequestBody Reason body) { app.requestReview(user,id,body.reason()); }
    @PostMapping("/envios/{id}/avaliar") @ResponseStatus(HttpStatus.NO_CONTENT) public void evaluate(@RequestAttribute("userId") long user,@PathVariable long id,@Valid @RequestBody Evaluation body) { app.evaluate(user,id,body.approved(),body.reason()); }
    @GetMapping("/ranking") public Object ranking() { return app.ranking(); }
    @GetMapping("/contas") public Object accounts(@RequestAttribute("userId") long user) { return app.accounts(user); }
    @PostMapping(value="/contas",consumes=MediaType.MULTIPART_FORM_DATA_VALUE) @ResponseStatus(HttpStatus.CREATED)
    public Object createAccount(@RequestAttribute("userId") long user,@RequestParam String nomeTitular,@RequestParam String concessionaria,@RequestParam(defaultValue="") String numeroInstalacao,@RequestParam String mesReferencia,@RequestParam BigDecimal valorConta,@RequestPart(required=false) MultipartFile file) {
        return Map.of("id",app.saveAccount(user,null,new AppService.Account(nomeTitular,concessionaria,numeroInstalacao,mesReferencia,valorConta),file));
    }
    @PutMapping(value="/contas/{id}",consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
    public Object updateAccount(@RequestAttribute("userId") long user,@PathVariable long id,@RequestParam String nomeTitular,@RequestParam String concessionaria,@RequestParam(defaultValue="") String numeroInstalacao,@RequestParam String mesReferencia,@RequestParam BigDecimal valorConta,@RequestPart(required=false) MultipartFile file) {
        return Map.of("id",app.saveAccount(user,id,new AppService.Account(nomeTitular,concessionaria,numeroInstalacao,mesReferencia,valorConta),file));
    }
    @DeleteMapping("/contas/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void deleteAccount(@RequestAttribute("userId") long user,@PathVariable long id) { app.deleteAccount(user,id); }
    @GetMapping("/recompensas") public Object rewards(@RequestAttribute("userId") long user) { return app.rewards(user); }
    @PostMapping("/recompensas/{id}/resgatar") @ResponseStatus(HttpStatus.NO_CONTENT) public void redeem(@RequestAttribute("userId") long user,@PathVariable long id,@RequestBody Redeem body) { app.redeem(user,id,body.accountId()); }
    @PutMapping("/perfil") public Object profile(@RequestAttribute("userId") long user,@Valid @RequestBody Profile body) { return app.updateProfile(user,body.name()); }
    @GetMapping("/arquivos/{id}") public ResponseEntity<byte[]> download(@RequestAttribute("userId") long user,@PathVariable String id) {
        var file=files.read(user,app.staff(user),id);
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_OCTET_STREAM)
          .header(HttpHeaders.CONTENT_DISPOSITION,ContentDisposition.attachment().filename(file.name(),StandardCharsets.UTF_8).build().toString())
          .body(file.bytes());
    }
}

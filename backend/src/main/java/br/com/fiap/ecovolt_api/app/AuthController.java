package br.com.fiap.ecovolt_api.app;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.Map;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService auth;
    public AuthController(AuthService auth) { this.auth=auth; }
    public record Login(@NotBlank @Email @Size(max=150) String email, @NotBlank @Size(max=128) String password) {}
    public record Register(@NotBlank @Size(min=2,max=120) String name, @NotBlank @Email @Size(max=150) String email, @NotBlank @Size(min=10,max=128) String password) {}
    public record Recover(@NotBlank @Email @Size(max=150) String email, @NotBlank @Size(max=100) String code, @NotBlank @Size(min=10,max=128) String password) {}
    public record Change(@NotBlank @Size(max=128) String currentPassword, @NotBlank @Size(min=10,max=128) String password) {}
    @PostMapping("/login") public Map<String,Object> login(@Valid @RequestBody Login body,HttpServletRequest req) {
        auth.throttle(req.getRemoteAddr()+":"+body.email().trim().toLowerCase()); return auth.login(body.email(),body.password());
    }
    @PostMapping("/cadastro") @ResponseStatus(HttpStatus.CREATED)
    public Map<String,Object> register(@Valid @RequestBody Register body,HttpServletRequest req) {
        auth.throttle("register:"+req.getRemoteAddr()); return auth.register(body.name(),body.email(),body.password());
    }
    @PostMapping("/recuperar") public Map<String,String> recover(@Valid @RequestBody Recover body,HttpServletRequest req) {
        auth.throttle("recover:"+req.getRemoteAddr()+":"+body.email().trim().toLowerCase());
        return Map.of("recoveryCode",auth.recover(body.email(),body.code(),body.password()));
    }
    @GetMapping("/me") public Map<String,Object> me(@RequestAttribute("userId") long id) { return auth.profile(id); }
    @PostMapping("/sair") @ResponseStatus(HttpStatus.NO_CONTENT)
    public void logout(@RequestHeader(value="Authorization",required=false) String token) { auth.logout(token); }
    public record Invite(@NotBlank @Size(max=100) String code) {}
    @PostMapping("/avaliador") @ResponseStatus(HttpStatus.NO_CONTENT)
    public void invite(@RequestAttribute("userId") long id,@Valid @RequestBody Invite body,HttpServletRequest req) { auth.throttle("invite:"+id);auth.activateReviewer(id,body.code()); }
    @PostMapping("/senha") public Map<String,String> change(@RequestAttribute("userId") long id,@Valid @RequestBody Change body) {
        return Map.of("recoveryCode",auth.changePassword(id,body.currentPassword(),body.password()));
    }
}

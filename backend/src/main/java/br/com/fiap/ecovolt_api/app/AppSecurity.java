package br.com.fiap.ecovolt_api.app;

import java.util.Set;
import jakarta.servlet.http.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class AppSecurity implements WebMvcConfigurer {
    private final AuthService auth;
    public AppSecurity(AuthService auth) { this.auth=auth; }
    @Override public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new HandlerInterceptor() {
            @Override public boolean preHandle(HttpServletRequest req,HttpServletResponse res,Object handler) {
                res.setHeader("Cache-Control","no-store");
                res.setHeader("X-Content-Type-Options","nosniff");
                String path=req.getRequestURI();
                if (req.getMethod().equals("OPTIONS") || path.equals("/error") || path.equals("/health")) return true;
                if (req.getMethod().equals("POST") && Set.of("/auth/login","/auth/cadastro","/auth/recuperar","/auth/sair").contains(path)) return true;
                long id=auth.require(req.getHeader("Authorization"));
                if (!path.startsWith("/app/") && !path.startsWith("/auth/")) throw AuthService.fail(403,"Utilize os recursos da sua área autenticada.");
                req.setAttribute("userId",id); return true;
            }
        });
    }
}

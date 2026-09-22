package br.com.fiap.epay.controller;

import br.com.fiap.epay.dto.LoginRequestDto;
import br.com.fiap.epay.dto.LoginResponseDto;
import br.com.fiap.epay.dto.RegisterRequestDto;
import br.com.fiap.epay.dto.UsuarioResponseDto;
import br.com.fiap.epay.model.Usuario;
import br.com.fiap.epay.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "1. Autenticação", description = "Endpoints para registro, login e perfil do cliente")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @Operation(summary = "Criar nova conta de usuário", description = "Cadastra um novo cliente na fintech, abre a conta bancária automaticamente e gera cartão virtual com bônus de abertura.")
    public ResponseEntity<LoginResponseDto> register(@RequestBody @Valid RegisterRequestDto dto) {
        LoginResponseDto response = authService.cadastrar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    @Operation(summary = "Autenticar usuário", description = "Valida as credenciais (e-mail e senha) e retorna o token JWT de acesso.")
    public ResponseEntity<LoginResponseDto> login(@RequestBody @Valid LoginRequestDto dto) {
        LoginResponseDto response = authService.login(dto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    @Operation(summary = "Dados do usuário autenticado", description = "Retorna os dados cadastrais do cliente atualmente logado no sistema.")
    public ResponseEntity<UsuarioResponseDto> me(@AuthenticationPrincipal Usuario usuario) {
        UsuarioResponseDto response = authService.obterPerfil(usuario);
        return ResponseEntity.ok(response);
    }
}

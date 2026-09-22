package br.com.fiap.epay.controller;

import br.com.fiap.epay.dto.ContaResponseDto;
import br.com.fiap.epay.dto.DepositoRequestDto;
import br.com.fiap.epay.model.Usuario;
import br.com.fiap.epay.service.ContaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contas")
@Tag(name = "2. Conta Bancária", description = "Endpoints para consulta de saldo, dados da conta e depósitos")
public class ContaController {

    private final ContaService contaService;

    public ContaController(ContaService contaService) {
        this.contaService = contaService;
    }

    @GetMapping("/saldo")
    @Operation(summary = "Consultar saldo e dados da conta", description = "Retorna o saldo em tempo real, número da agência, conta corrente e chave Pix.")
    public ResponseEntity<ContaResponseDto> obterSaldo(@AuthenticationPrincipal Usuario usuario) {
        ContaResponseDto response = contaService.obterContaDoUsuario(usuario);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/deposito")
    @Operation(summary = "Realizar depósito em dinheiro", description = "Credita o valor informado na conta bancária do usuário logado de forma instantânea.")
    public ResponseEntity<ContaResponseDto> depositar(@AuthenticationPrincipal Usuario usuario,
                                                      @RequestBody @Valid DepositoRequestDto dto) {
        ContaResponseDto response = contaService.depositar(usuario, dto);
        return ResponseEntity.ok(response);
    }
}

package br.com.fiap.epay.controller;

import br.com.fiap.epay.dto.PixRequestDto;
import br.com.fiap.epay.dto.TransacaoResponseDto;
import br.com.fiap.epay.model.Usuario;
import br.com.fiap.epay.service.TransacaoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transacoes")
@Tag(name = "3. Transações & Pix", description = "Endpoints para envio de Pix e consulta de extrato financeiro")
public class TransacaoController {

    private final TransacaoService transacaoService;

    public TransacaoController(TransacaoService transacaoService) {
        this.transacaoService = transacaoService;
    }

    @GetMapping("/extrato")
    @Operation(summary = "Consultar extrato bancário", description = "Retorna o histórico completo de transações da conta (entradas e saídas) ordenadas da mais recente para a mais antiga.")
    public ResponseEntity<List<TransacaoResponseDto>> obterExtrato(@AuthenticationPrincipal Usuario usuario) {
        List<TransacaoResponseDto> extrato = transacaoService.listarExtrato(usuario);
        return ResponseEntity.ok(extrato);
    }

    @PostMapping("/pix")
    @Operation(summary = "Realizar transferência Pix", description = "Executa a transferência atômica de fundos entre contas com validação de saldo e verificação de chave Pix.")
    public ResponseEntity<TransacaoResponseDto> transferirPix(@AuthenticationPrincipal Usuario usuario,
                                                              @RequestBody @Valid PixRequestDto dto) {
        TransacaoResponseDto response = transacaoService.realizarPix(usuario, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}

package br.com.fiap.epay.controller;

import br.com.fiap.epay.dto.AjusteLimiteDto;
import br.com.fiap.epay.dto.CartaoResponseDto;
import br.com.fiap.epay.model.Usuario;
import br.com.fiap.epay.service.CartaoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cartoes")
@Tag(name = "4. Cartões", description = "Endpoints para gerenciamento de cartão virtual, bloqueio temporário e limites")
public class CartaoController {

    private final CartaoService cartaoService;

    public CartaoController(CartaoService cartaoService) {
        this.cartaoService = cartaoService;
    }

    @GetMapping
    @Operation(summary = "Listar cartões da conta", description = "Retorna os cartões virtuais e físicos vinculados à conta do cliente.")
    public ResponseEntity<List<CartaoResponseDto>> listar(@AuthenticationPrincipal Usuario usuario) {
        List<CartaoResponseDto> cartoes = cartaoService.listarCartoes(usuario);
        return ResponseEntity.ok(cartoes);
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Bloquear ou desbloquear cartão", description = "Alterna dinamicamente entre os estados ATIVO e BLOQUEADO para proteção contra fraudes.")
    public ResponseEntity<CartaoResponseDto> alternarStatus(@AuthenticationPrincipal Usuario usuario,
                                                            @PathVariable Long id) {
        CartaoResponseDto response = cartaoService.alternarStatus(usuario, id);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/limite")
    @Operation(summary = "Ajustar limite de crédito", description = "Atualiza o limite total de crédito disponível no cartão virtual.")
    public ResponseEntity<CartaoResponseDto> ajustarLimite(@AuthenticationPrincipal Usuario usuario,
                                                           @PathVariable Long id,
                                                           @RequestBody @Valid AjusteLimiteDto dto) {
        CartaoResponseDto response = cartaoService.ajustarLimite(usuario, id, dto);
        return ResponseEntity.ok(response);
    }
}

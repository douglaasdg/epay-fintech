package br.com.fiap.epay.service;

import br.com.fiap.epay.dto.AjusteLimiteDto;
import br.com.fiap.epay.dto.CartaoResponseDto;
import br.com.fiap.epay.exception.BusinessException;
import br.com.fiap.epay.exception.ResourceNotFoundException;
import br.com.fiap.epay.model.Cartao;
import br.com.fiap.epay.model.Conta;
import br.com.fiap.epay.model.Usuario;
import br.com.fiap.epay.repository.CartaoRepository;
import br.com.fiap.epay.repository.ContaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartaoService {

    private final CartaoRepository cartaoRepository;
    private final ContaRepository contaRepository;

    public CartaoService(CartaoRepository cartaoRepository, ContaRepository contaRepository) {
        this.cartaoRepository = cartaoRepository;
        this.contaRepository = contaRepository;
    }

    public List<CartaoResponseDto> listarCartoes(Usuario usuario) {
        Conta conta = contaRepository.findByUsuario(usuario)
                .orElseThrow(() -> new ResourceNotFoundException("Conta não encontrada."));

        return cartaoRepository.findByConta(conta).stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public CartaoResponseDto alternarStatus(Usuario usuario, Long cartaoId) {
        Cartao cartao = buscarCartaoDoUsuario(usuario, cartaoId);

        if ("ATIVO".equalsIgnoreCase(cartao.getStatus())) {
            cartao.setStatus("BLOQUEADO");
        } else {
            cartao.setStatus("ATIVO");
        }

        cartao = cartaoRepository.save(cartao);
        return toDto(cartao);
    }

    @Transactional
    public CartaoResponseDto ajustarLimite(Usuario usuario, Long cartaoId, AjusteLimiteDto dto) {
        Cartao cartao = buscarCartaoDoUsuario(usuario, cartaoId);

        if (dto.getNovoLimite().compareTo(cartao.getLimiteUtilizado()) < 0) {
            throw new BusinessException("O novo limite não pode ser menor que a fatura atual utilizada (R$ " + cartao.getLimiteUtilizado() + ").");
        }

        cartao.setLimiteTotal(dto.getNovoLimite());
        cartao = cartaoRepository.save(cartao);
        return toDto(cartao);
    }

    private Cartao buscarCartaoDoUsuario(Usuario usuario, Long cartaoId) {
        Conta conta = contaRepository.findByUsuario(usuario)
                .orElseThrow(() -> new ResourceNotFoundException("Conta não encontrada."));

        Cartao cartao = cartaoRepository.findById(cartaoId)
                .orElseThrow(() -> new ResourceNotFoundException("Cartão não encontrado."));

        if (!cartao.getConta().getId().equals(conta.getId())) {
            throw new BusinessException("Você não tem permissão para gerenciar este cartão.");
        }

        return cartao;
    }

    private CartaoResponseDto toDto(Cartao cartao) {
        return new CartaoResponseDto(
                cartao.getId(),
                cartao.getNumeroMascarado(),
                cartao.getNomeTitular(),
                cartao.getValidade(),
                cartao.getCvv(),
                cartao.getTipo(),
                cartao.getLimiteTotal(),
                cartao.getLimiteUtilizado(),
                cartao.getStatus()
        );
    }
}

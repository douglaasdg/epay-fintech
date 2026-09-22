package br.com.fiap.epay.service;

import br.com.fiap.epay.dto.ContaResponseDto;
import br.com.fiap.epay.dto.DepositoRequestDto;
import br.com.fiap.epay.exception.ResourceNotFoundException;
import br.com.fiap.epay.model.Conta;
import br.com.fiap.epay.model.TipoTransacao;
import br.com.fiap.epay.model.Transacao;
import br.com.fiap.epay.model.Usuario;
import br.com.fiap.epay.repository.ContaRepository;
import br.com.fiap.epay.repository.TransacaoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContaService {

    private final ContaRepository contaRepository;
    private final TransacaoRepository transacaoRepository;

    public ContaService(ContaRepository contaRepository, TransacaoRepository transacaoRepository) {
        this.contaRepository = contaRepository;
        this.transacaoRepository = transacaoRepository;
    }

    public ContaResponseDto obterContaDoUsuario(Usuario usuario) {
        Conta conta = contaRepository.findByUsuario(usuario)
                .orElseThrow(() -> new ResourceNotFoundException("Conta do usuário não encontrada."));

        return toDto(conta);
    }

    @Transactional
    public ContaResponseDto depositar(Usuario usuario, DepositoRequestDto dto) {
        Conta conta = contaRepository.findByUsuario(usuario)
                .orElseThrow(() -> new ResourceNotFoundException("Conta do usuário não encontrada."));

        // Credita o saldo na conta de forma segura
        conta.creditar(dto.getValor());
        conta = contaRepository.save(conta);

        // Registra a transação no extrato
        Transacao transacao = new Transacao();
        transacao.setContaOrigem(null);
        transacao.setContaDestino(conta);
        transacao.setTipo(TipoTransacao.DEPOSITO);
        transacao.setValor(dto.getValor());
        transacao.setDescricao(dto.getDescricao() != null && !dto.getDescricao().isBlank()
                ? dto.getDescricao()
                : "Depósito bancário em dinheiro");
        transacaoRepository.save(transacao);

        return toDto(conta);
    }

    private ContaResponseDto toDto(Conta conta) {
        return new ContaResponseDto(
                conta.getId(),
                conta.getNumeroConta(),
                conta.getAgencia(),
                conta.getSaldo(),
                conta.getChavePix(),
                conta.getStatus()
        );
    }
}

package br.com.fiap.epay.service;

import br.com.fiap.epay.dto.PixRequestDto;
import br.com.fiap.epay.dto.TransacaoResponseDto;
import br.com.fiap.epay.exception.BusinessException;
import br.com.fiap.epay.exception.ResourceNotFoundException;
import br.com.fiap.epay.model.*;
import br.com.fiap.epay.repository.ContaRepository;
import br.com.fiap.epay.repository.TransacaoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransacaoService {

    private final ContaRepository contaRepository;
    private final TransacaoRepository transacaoRepository;

    public TransacaoService(ContaRepository contaRepository, TransacaoRepository transacaoRepository) {
        this.contaRepository = contaRepository;
        this.transacaoRepository = transacaoRepository;
    }

    @Transactional
    public TransacaoResponseDto realizarPix(Usuario usuario, PixRequestDto dto) {
        // 1. Busca a conta de origem do remetente
        Conta contaOrigem = contaRepository.findByUsuario(usuario)
                .orElseThrow(() -> new ResourceNotFoundException("Conta de origem não encontrada."));

        if (!"ATIVA".equalsIgnoreCase(contaOrigem.getStatus())) {
            throw new BusinessException("Sua conta bancária não está ativa para transferências.");
        }

        // 2. Busca a conta de destino por chave Pix ou número de conta
        Conta contaDestino = contaRepository.findByChavePix(dto.getChaveDestino())
                .or(() -> contaRepository.findByNumeroConta(dto.getChaveDestino()))
                .orElseThrow(() -> new BusinessException("Chave Pix ou Conta de destino não encontrada: " + dto.getChaveDestino()));

        // 3. Validações de integridade
        if (contaOrigem.getId().equals(contaDestino.getId())) {
            throw new BusinessException("Não é permitido transferir dinheiro para a sua própria conta via Pix.");
        }

        if (!"ATIVA".equalsIgnoreCase(contaDestino.getStatus())) {
            throw new BusinessException("A conta de destino está temporariamente indisponível para receber valores.");
        }

        // 4. Execução atômica (Débito e Crédito)
        try {
            contaOrigem.debitar(dto.getValor());
        } catch (IllegalStateException ex) {
            throw new BusinessException("Saldo insuficiente para realizar esta transferência Pix.");
        }

        contaDestino.creditar(dto.getValor());

        contaRepository.save(contaOrigem);
        contaRepository.save(contaDestino);

        // 5. Registra no livro-razão (histórico de transações)
        Transacao transacao = new Transacao();
        transacao.setContaOrigem(contaOrigem);
        transacao.setContaDestino(contaDestino);
        transacao.setTipo(TipoTransacao.PIX);
        transacao.setValor(dto.getValor());
        transacao.setDescricao(dto.getDescricao() != null && !dto.getDescricao().isBlank()
                ? dto.getDescricao()
                : "Transferência Pix enviada");
        transacao = transacaoRepository.save(transacao);

        return new TransacaoResponseDto(
                transacao.getId(),
                transacao.getTipo(),
                transacao.getValor(),
                transacao.getDataHora(),
                transacao.getDescricao(),
                contaOrigem.getUsuario().getNome(),
                contaDestino.getUsuario().getNome(),
                false // Para a conta de origem, é uma saída
        );
    }

    public List<TransacaoResponseDto> listarExtrato(Usuario usuario) {
        Conta minhaConta = contaRepository.findByUsuario(usuario)
                .orElseThrow(() -> new ResourceNotFoundException("Conta do usuário não encontrada."));

        List<Transacao> transacoes = transacaoRepository.findAllByContaOrderByDataHoraDesc(minhaConta);

        return transacoes.stream().map(t -> {
            boolean isEntrada = t.getContaDestino().getId().equals(minhaConta.getId());
            String nomeOrigem = t.getContaOrigem() != null ? t.getContaOrigem().getUsuario().getNome() : "Depósito Bancário";
            String nomeDestino = t.getContaDestino().getUsuario().getNome();

            return new TransacaoResponseDto(
                    t.getId(),
                    t.getTipo(),
                    t.getValor(),
                    t.getDataHora(),
                    t.getDescricao(),
                    nomeOrigem,
                    nomeDestino,
                    isEntrada
            );
        }).collect(Collectors.toList());
    }
}

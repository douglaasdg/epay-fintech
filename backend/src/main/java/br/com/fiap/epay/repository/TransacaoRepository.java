package br.com.fiap.epay.repository;

import br.com.fiap.epay.model.Conta;
import br.com.fiap.epay.model.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransacaoRepository extends JpaRepository<Transacao, Long> {

    @Query("SELECT t FROM Transacao t WHERE t.contaOrigem = :conta OR t.contaDestino = :conta ORDER BY t.dataHora DESC")
    List<Transacao> findAllByContaOrderByDataHoraDesc(@Param("conta") Conta conta);

    List<Transacao> findTop10ByContaOrigemOrContaDestinoOrderByDataHoraDesc(Conta origem, Conta destino);
}

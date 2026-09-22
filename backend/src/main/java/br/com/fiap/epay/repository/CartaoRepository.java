package br.com.fiap.epay.repository;

import br.com.fiap.epay.model.Cartao;
import br.com.fiap.epay.model.Conta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartaoRepository extends JpaRepository<Cartao, Long> {
    List<Cartao> findByConta(Conta conta);
}

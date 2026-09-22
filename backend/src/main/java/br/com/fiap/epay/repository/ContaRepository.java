package br.com.fiap.epay.repository;

import br.com.fiap.epay.model.Conta;
import br.com.fiap.epay.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ContaRepository extends JpaRepository<Conta, Long> {
    Optional<Conta> findByUsuario(Usuario usuario);
    Optional<Conta> findByUsuarioEmail(String email);
    Optional<Conta> findByChavePix(String chavePix);
    Optional<Conta> findByNumeroConta(String numeroConta);
    boolean existsByNumeroConta(String numeroConta);
    boolean existsByChavePix(String chavePix);
}

package br.com.fiap.epay.repository;

import br.com.fiap.epay.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmailIgnoreCase(String email);
    Optional<Usuario> findByEmail(String email);
    boolean existsByEmailIgnoreCase(String email);
    boolean existsByEmail(String email);
    boolean existsByCpf(String cpf);
}

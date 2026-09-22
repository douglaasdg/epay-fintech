package br.com.fiap.epay.service;

import br.com.fiap.epay.dto.*;
import br.com.fiap.epay.exception.BusinessException;
import br.com.fiap.epay.exception.ResourceNotFoundException;
import br.com.fiap.epay.model.*;
import br.com.fiap.epay.repository.CartaoRepository;
import br.com.fiap.epay.repository.ContaRepository;
import br.com.fiap.epay.repository.TransacaoRepository;
import br.com.fiap.epay.repository.UsuarioRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Random;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final ContaRepository contaRepository;
    private final CartaoRepository cartaoRepository;
    private final TransacaoRepository transacaoRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public AuthService(UsuarioRepository usuarioRepository, ContaRepository contaRepository,
                       CartaoRepository cartaoRepository, TransacaoRepository transacaoRepository,
                       PasswordEncoder passwordEncoder, TokenService tokenService) {
        this.usuarioRepository = usuarioRepository;
        this.contaRepository = contaRepository;
        this.cartaoRepository = cartaoRepository;
        this.transacaoRepository = transacaoRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }

    @Transactional
    public LoginResponseDto cadastrar(RegisterRequestDto dto) {
        if (usuarioRepository.existsByEmail(dto.getEmail())) {
            throw new BusinessException("Já existe um usuário cadastrado com este e-mail.");
        }
        if (usuarioRepository.existsByCpf(dto.getCpf())) {
            throw new BusinessException("Já existe um usuário cadastrado com este CPF.");
        }

        // 1. Cria o Usuário com senha criptografada em BCrypt
        Usuario usuario = new Usuario();
        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());
        usuario.setSenhaHash(passwordEncoder.encode(dto.getSenha()));
        usuario.setCpf(dto.getCpf());
        usuario.setTelefone(dto.getTelefone());
        usuario = usuarioRepository.save(usuario);

        // 2. Abre a Conta Corrente automaticamente com R$ 1.000 de bônus inicial para testes
        Conta conta = new Conta();
        conta.setUsuario(usuario);
        conta.setNumeroConta(gerarNumeroConta());
        conta.setAgencia("0001");
        conta.setSaldo(new BigDecimal("1000.00"));
        conta.setChavePix(usuario.getEmail());
        conta.setStatus("ATIVA");
        conta = contaRepository.save(conta);

        // 3. Emite automaticamente um Cartão Virtual de Crédito com limite de R$ 5.000
        Cartao cartao = new Cartao();
        cartao.setConta(conta);
        cartao.setNomeTitular(usuario.getNome().toUpperCase());
        cartao.setNumeroMascarado(gerarNumeroCartaoMascarado());
        cartao.setValidade("08/31");
        cartao.setCvv(String.format("%03d", new Random().nextInt(1000)));
        cartao.setTipo("VIRTUAL");
        cartao.setLimiteTotal(new BigDecimal("5000.00"));
        cartao.setLimiteUtilizado(BigDecimal.ZERO);
        cartao.setStatus("ATIVO");
        cartaoRepository.save(cartao);

        // 4. Registra a transação do Bônus de Abertura
        Transacao transacao = new Transacao();
        transacao.setContaOrigem(null);
        transacao.setContaDestino(conta);
        transacao.setTipo(TipoTransacao.DEPOSITO);
        transacao.setValor(new BigDecimal("1000.00"));
        transacao.setDescricao("Bônus de boas-vindas E-Pay Fintech");
        transacaoRepository.save(transacao);

        // 5. Emite o Token JWT
        String token = tokenService.gerarToken(usuario);

        UsuarioResponseDto userDto = new UsuarioResponseDto(usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.getCpf(), usuario.getTelefone());
        ContaResponseDto contaDto = new ContaResponseDto(conta.getId(), conta.getNumeroConta(), conta.getAgencia(), conta.getSaldo(), conta.getChavePix(), conta.getStatus());

        return new LoginResponseDto(token, userDto, contaDto);
    }

    public LoginResponseDto login(LoginRequestDto dto) {
        Usuario usuario = usuarioRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Credenciais inválidas."));

        if (!passwordEncoder.matches(dto.getSenha(), usuario.getSenhaHash())) {
            throw new BadCredentialsException("Credenciais inválidas.");
        }

        Conta conta = contaRepository.findByUsuario(usuario)
                .orElseThrow(() -> new ResourceNotFoundException("Conta bancária associada não encontrada."));

        String token = tokenService.gerarToken(usuario);

        UsuarioResponseDto userDto = new UsuarioResponseDto(usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.getCpf(), usuario.getTelefone());
        ContaResponseDto contaDto = new ContaResponseDto(conta.getId(), conta.getNumeroConta(), conta.getAgencia(), conta.getSaldo(), conta.getChavePix(), conta.getStatus());

        return new LoginResponseDto(token, userDto, contaDto);
    }

    public UsuarioResponseDto obterPerfil(Usuario usuario) {
        return new UsuarioResponseDto(usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.getCpf(), usuario.getTelefone());
    }

    private String gerarNumeroConta() {
        Random random = new Random();
        int numero = 10000 + random.nextInt(90000);
        int digito = random.nextInt(10);
        return numero + "-" + digito;
    }

    private String gerarNumeroCartaoMascarado() {
        Random random = new Random();
        int finalQuatro = 1000 + random.nextInt(9000);
        return "5520 •••• •••• " + finalQuatro;
    }
}

package br.com.fiap.epay.config;

import br.com.fiap.epay.model.*;
import br.com.fiap.epay.repository.CartaoRepository;
import br.com.fiap.epay.repository.ContaRepository;
import br.com.fiap.epay.repository.TransacaoRepository;
import br.com.fiap.epay.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;

@Configuration
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final ContaRepository contaRepository;
    private final CartaoRepository cartaoRepository;
    private final TransacaoRepository transacaoRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UsuarioRepository usuarioRepository, ContaRepository contaRepository,
                           CartaoRepository cartaoRepository, TransacaoRepository transacaoRepository,
                           PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.contaRepository = contaRepository;
        this.cartaoRepository = cartaoRepository;
        this.transacaoRepository = transacaoRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (usuarioRepository.count() == 0) {
            System.out.println(">>> [E-PAY FINTECH] Inicializando dados de demonstração para portfólio...");

            // 1. Usuário Principal: Douglas Cristian
            Usuario douglas = new Usuario();
            douglas.setNome("Douglas Cristian");
            douglas.setEmail("douglas@epay.com.br");
            douglas.setSenhaHash(passwordEncoder.encode("123456"));
            douglas.setCpf("123.456.789-00");
            douglas.setTelefone("(11) 98765-4321");
            douglas = usuarioRepository.save(douglas);

            Conta contaDouglas = new Conta();
            contaDouglas.setUsuario(douglas);
            contaDouglas.setNumeroConta("10001-9");
            contaDouglas.setAgencia("0001");
            contaDouglas.setSaldo(new BigDecimal("5420.50"));
            contaDouglas.setChavePix("douglas@epay.com.br");
            contaDouglas.setStatus("ATIVA");
            contaDouglas = contaRepository.save(contaDouglas);

            Cartao cartaoDouglas = new Cartao();
            cartaoDouglas.setConta(contaDouglas);
            cartaoDouglas.setNomeTitular("DOUGLAS C FERREIRA");
            cartaoDouglas.setNumeroMascarado("5520 •••• •••• 8492");
            cartaoDouglas.setValidade("08/31");
            cartaoDouglas.setCvv("382");
            cartaoDouglas.setTipo("VIRTUAL");
            cartaoDouglas.setLimiteTotal(new BigDecimal("8000.00"));
            cartaoDouglas.setLimiteUtilizado(new BigDecimal("1250.30"));
            cartaoDouglas.setStatus("ATIVO");
            cartaoRepository.save(cartaoDouglas);

            // Transações de demonstração para Douglas
            Transacao t1 = new Transacao();
            t1.setContaOrigem(null);
            t1.setContaDestino(contaDouglas);
            t1.setTipo(TipoTransacao.DEPOSITO);
            t1.setValor(new BigDecimal("6000.00"));
            t1.setDescricao("Depósito inicial de abertura de conta");
            transacaoRepository.save(t1);

            // 2. Segundo Usuário para simular transferências Pix reais entre contas: Maria Silva
            Usuario maria = new Usuario();
            maria.setNome("Maria Silva");
            maria.setEmail("maria@epay.com.br");
            maria.setSenhaHash(passwordEncoder.encode("123456"));
            maria.setCpf("987.654.321-99");
            maria.setTelefone("(11) 91234-5678");
            maria = usuarioRepository.save(maria);

            Conta contaMaria = new Conta();
            contaMaria.setUsuario(maria);
            contaMaria.setNumeroConta("20002-1");
            contaMaria.setAgencia("0001");
            contaMaria.setSaldo(new BigDecimal("2500.00"));
            contaMaria.setChavePix("maria@epay.com.br");
            contaMaria.setStatus("ATIVA");
            contaMaria = contaRepository.save(contaMaria);

            Cartao cartaoMaria = new Cartao();
            cartaoMaria.setConta(contaMaria);
            cartaoMaria.setNomeTitular("MARIA SILVA");
            cartaoMaria.setNumeroMascarado("4129 •••• •••• 1920");
            cartaoMaria.setValidade("10/30");
            cartaoMaria.setCvv("941");
            cartaoMaria.setTipo("VIRTUAL");
            cartaoMaria.setLimiteTotal(new BigDecimal("4000.00"));
            cartaoMaria.setLimiteUtilizado(new BigDecimal("320.00"));
            cartaoMaria.setStatus("ATIVO");
            cartaoRepository.save(cartaoMaria);

            // Transação de Pix entre Douglas e Maria
            Transacao t2 = new Transacao();
            t2.setContaOrigem(contaDouglas);
            t2.setContaDestino(contaMaria);
            t2.setTipo(TipoTransacao.PIX);
            t2.setValor(new BigDecimal("579.50"));
            t2.setDescricao("Pagamento de serviços de consultoria");
            transacaoRepository.save(t2);

            System.out.println(">>> [E-PAY FINTECH] 2 contas de demonstração criadas com sucesso!");
            System.out.println(">>> Douglas: douglas@epay.com.br (senha: 123456) | Chave Pix: douglas@epay.com.br");
            System.out.println(">>> Maria: maria@epay.com.br (senha: 123456) | Chave Pix: maria@epay.com.br");
        }
    }
}

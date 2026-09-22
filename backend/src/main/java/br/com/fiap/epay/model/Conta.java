package br.com.fiap.epay.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "TB_EPAY_CONTA")
public class Conta {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SQ_EPAY_CONTA")
    @SequenceGenerator(name = "SQ_EPAY_CONTA", sequenceName = "SQ_EPAY_CONTA", allocationSize = 1)
    @Column(name = "ID_CONTA")
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ID_USUARIO", nullable = false)
    private Usuario usuario;

    @Column(name = "NUMERO_CONTA", nullable = false, unique = true, length = 10)
    private String numeroConta;

    @Column(name = "AGENCIA", nullable = false, length = 6)
    private String agencia;

    @Column(name = "SALDO", nullable = false, precision = 15, scale = 2)
    private BigDecimal saldo;

    @Column(name = "CHAVE_PIX", unique = true, length = 100)
    private String chavePix;

    @Column(name = "STATUS", nullable = false, length = 20)
    private String status;

    @Column(name = "DATA_ABERTURA", nullable = false)
    private LocalDateTime dataAbertura;

    public Conta() {
        this.agencia = "0001";
        this.saldo = BigDecimal.ZERO;
        this.status = "ATIVA";
        this.dataAbertura = LocalDateTime.now();
    }

    public Conta(Long id, Usuario usuario, String numeroConta, String agencia, BigDecimal saldo, String chavePix, String status) {
        this.id = id;
        this.usuario = usuario;
        this.numeroConta = numeroConta;
        this.agencia = agencia != null ? agencia : "0001";
        this.saldo = saldo != null ? saldo : BigDecimal.ZERO;
        this.chavePix = chavePix;
        this.status = status != null ? status : "ATIVA";
        this.dataAbertura = LocalDateTime.now();
    }

    // Métodos de domínio financeiro
    public void creditar(BigDecimal valor) {
        if (valor == null || valor.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("O valor a creditar deve ser positivo.");
        }
        this.saldo = this.saldo.add(valor);
    }

    public void debitar(BigDecimal valor) {
        if (valor == null || valor.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("O valor a debitar deve ser positivo.");
        }
        if (this.saldo.compareTo(valor) < 0) {
            throw new IllegalStateException("Saldo insuficiente para esta transação.");
        }
        this.saldo = this.saldo.subtract(valor);
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getNumeroConta() {
        return numeroConta;
    }

    public void setNumeroConta(String numeroConta) {
        this.numeroConta = numeroConta;
    }

    public String getAgencia() {
        return agencia;
    }

    public void setAgencia(String agencia) {
        this.agencia = agencia;
    }

    public BigDecimal getSaldo() {
        return saldo;
    }

    public void setSaldo(BigDecimal saldo) {
        this.saldo = saldo;
    }

    public String getChavePix() {
        return chavePix;
    }

    public void setChavePix(String chavePix) {
        this.chavePix = chavePix;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getDataAbertura() {
        return dataAbertura;
    }

    public void setDataAbertura(LocalDateTime dataAbertura) {
        this.dataAbertura = dataAbertura;
    }
}

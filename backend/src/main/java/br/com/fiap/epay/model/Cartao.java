package br.com.fiap.epay.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "TB_EPAY_CARTAO")
public class Cartao {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SQ_EPAY_CARTAO")
    @SequenceGenerator(name = "SQ_EPAY_CARTAO", sequenceName = "SQ_EPAY_CARTAO", allocationSize = 1)
    @Column(name = "ID_CARTAO")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_CONTA", nullable = false)
    private Conta conta;

    @Column(name = "NUMERO_MASCARADO", nullable = false, length = 19)
    private String numeroMascarado;

    @Column(name = "NOME_TITULAR", nullable = false, length = 120)
    private String nomeTitular;

    @Column(name = "VALIDADE", nullable = false, length = 7)
    private String validade;

    @Column(name = "CVV", nullable = false, length = 4)
    private String cvv;

    @Column(name = "TIPO", nullable = false, length = 20)
    private String tipo;

    @Column(name = "LIMITE_TOTAL", nullable = false, precision = 15, scale = 2)
    private BigDecimal limiteTotal;

    @Column(name = "LIMITE_UTILIZADO", nullable = false, precision = 15, scale = 2)
    private BigDecimal limiteUtilizado;

    @Column(name = "STATUS", nullable = false, length = 20)
    private String status;

    public Cartao() {
        this.tipo = "VIRTUAL";
        this.limiteTotal = new BigDecimal("5000.00");
        this.limiteUtilizado = BigDecimal.ZERO;
        this.status = "ATIVO";
    }

    public Cartao(Long id, Conta conta, String numeroMascarado, String nomeTitular, String validade, String cvv, String tipo, BigDecimal limiteTotal, BigDecimal limiteUtilizado, String status) {
        this.id = id;
        this.conta = conta;
        this.numeroMascarado = numeroMascarado;
        this.nomeTitular = nomeTitular;
        this.validade = validade;
        this.cvv = cvv;
        this.tipo = tipo != null ? tipo : "VIRTUAL";
        this.limiteTotal = limiteTotal != null ? limiteTotal : new BigDecimal("5000.00");
        this.limiteUtilizado = limiteUtilizado != null ? limiteUtilizado : BigDecimal.ZERO;
        this.status = status != null ? status : "ATIVO";
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Conta getConta() {
        return conta;
    }

    public void setConta(Conta conta) {
        this.conta = conta;
    }

    public String getNumeroMascarado() {
        return numeroMascarado;
    }

    public void setNumeroMascarado(String numeroMascarado) {
        this.numeroMascarado = numeroMascarado;
    }

    public String getNomeTitular() {
        return nomeTitular;
    }

    public void setNomeTitular(String nomeTitular) {
        this.nomeTitular = nomeTitular;
    }

    public String getValidade() {
        return validade;
    }

    public void setValidade(String validade) {
        this.validade = validade;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public BigDecimal getLimiteTotal() {
        return limiteTotal;
    }

    public void setLimiteTotal(BigDecimal limiteTotal) {
        this.limiteTotal = limiteTotal;
    }

    public BigDecimal getLimiteUtilizado() {
        return limiteUtilizado;
    }

    public void setLimiteUtilizado(BigDecimal limiteUtilizado) {
        this.limiteUtilizado = limiteUtilizado;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

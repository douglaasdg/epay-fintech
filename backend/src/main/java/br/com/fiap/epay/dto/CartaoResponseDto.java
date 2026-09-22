package br.com.fiap.epay.dto;

import java.math.BigDecimal;

public class CartaoResponseDto {
    private Long id;
    private String numeroMascarado;
    private String nomeTitular;
    private String validade;
    private String cvv;
    private String tipo;
    private BigDecimal limiteTotal;
    private BigDecimal limiteUtilizado;
    private BigDecimal limiteDisponivel;
    private String status;

    public CartaoResponseDto() {}

    public CartaoResponseDto(Long id, String numeroMascarado, String nomeTitular, String validade, String cvv, String tipo, BigDecimal limiteTotal, BigDecimal limiteUtilizado, String status) {
        this.id = id;
        this.numeroMascarado = numeroMascarado;
        this.nomeTitular = nomeTitular;
        this.validade = validade;
        this.cvv = cvv;
        this.tipo = tipo;
        this.limiteTotal = limiteTotal;
        this.limiteUtilizado = limiteUtilizado;
        this.limiteDisponivel = limiteTotal != null && limiteUtilizado != null ? limiteTotal.subtract(limiteUtilizado) : BigDecimal.ZERO;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public BigDecimal getLimiteDisponivel() {
        return limiteDisponivel;
    }

    public void setLimiteDisponivel(BigDecimal limiteDisponivel) {
        this.limiteDisponivel = limiteDisponivel;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

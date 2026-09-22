package br.com.fiap.epay.dto;

import java.math.BigDecimal;

public class ContaResponseDto {
    private Long id;
    private String numeroConta;
    private String agencia;
    private BigDecimal saldo;
    private String chavePix;
    private String status;

    public ContaResponseDto() {}

    public ContaResponseDto(Long id, String numeroConta, String agencia, BigDecimal saldo, String chavePix, String status) {
        this.id = id;
        this.numeroConta = numeroConta;
        this.agencia = agencia;
        this.saldo = saldo;
        this.chavePix = chavePix;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}

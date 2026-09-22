package br.com.fiap.epay.dto;

import java.math.BigDecimal;

public class SimulacaoInvestimentoDto {
    private BigDecimal valorInicial;
    private int meses;
    private BigDecimal rendimentoPoupanca;
    private BigDecimal rendimentoCdi;
    private BigDecimal rendimentoCripto;

    public SimulacaoInvestimentoDto() {}

    public SimulacaoInvestimentoDto(BigDecimal valorInicial, int meses, BigDecimal rendimentoPoupanca, BigDecimal rendimentoCdi, BigDecimal rendimentoCripto) {
        this.valorInicial = valorInicial;
        this.meses = meses;
        this.rendimentoPoupanca = rendimentoPoupanca;
        this.rendimentoCdi = rendimentoCdi;
        this.rendimentoCripto = rendimentoCripto;
    }

    public BigDecimal getValorInicial() {
        return valorInicial;
    }

    public void setValorInicial(BigDecimal valorInicial) {
        this.valorInicial = valorInicial;
    }

    public int getMeses() {
        return meses;
    }

    public void setMeses(int meses) {
        this.meses = meses;
    }

    public BigDecimal getRendimentoPoupanca() {
        return rendimentoPoupanca;
    }

    public void setRendimentoPoupanca(BigDecimal rendimentoPoupanca) {
        this.rendimentoPoupanca = rendimentoPoupanca;
    }

    public BigDecimal getRendimentoCdi() {
        return rendimentoCdi;
    }

    public void setRendimentoCdi(BigDecimal rendimentoCdi) {
        this.rendimentoCdi = rendimentoCdi;
    }

    public BigDecimal getRendimentoCripto() {
        return rendimentoCripto;
    }

    public void setRendimentoCripto(BigDecimal rendimentoCripto) {
        this.rendimentoCripto = rendimentoCripto;
    }
}

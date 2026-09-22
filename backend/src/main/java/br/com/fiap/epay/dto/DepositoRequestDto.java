package br.com.fiap.epay.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class DepositoRequestDto {

    @NotNull(message = "O valor do depósito é obrigatório.")
    @DecimalMin(value = "1.00", message = "O valor mínimo de depósito é R$ 1,00.")
    private BigDecimal valor;

    private String descricao;

    public DepositoRequestDto() {}

    public DepositoRequestDto(BigDecimal valor, String descricao) {
        this.valor = valor;
        this.descricao = descricao;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}

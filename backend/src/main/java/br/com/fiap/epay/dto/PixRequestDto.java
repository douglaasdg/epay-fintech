package br.com.fiap.epay.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class PixRequestDto {

    @NotBlank(message = "A chave Pix de destino é obrigatória.")
    private String chaveDestino;

    @NotNull(message = "O valor é obrigatório.")
    @DecimalMin(value = "0.01", message = "O valor mínimo para transferência é R$ 0,01.")
    private BigDecimal valor;

    private String descricao;

    public PixRequestDto() {}

    public PixRequestDto(String chaveDestino, BigDecimal valor, String descricao) {
        this.chaveDestino = chaveDestino;
        this.valor = valor;
        this.descricao = descricao;
    }

    public String getChaveDestino() {
        return chaveDestino;
    }

    public void setChaveDestino(String chaveDestino) {
        this.chaveDestino = chaveDestino;
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

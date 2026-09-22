package br.com.fiap.epay.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class AjusteLimiteDto {

    @NotNull(message = "O novo limite é obrigatório.")
    @DecimalMin(value = "100.00", message = "O limite mínimo é R$ 100,00.")
    private BigDecimal novoLimite;

    public AjusteLimiteDto() {}

    public AjusteLimiteDto(BigDecimal novoLimite) {
        this.novoLimite = novoLimite;
    }

    public BigDecimal getNovoLimite() {
        return novoLimite;
    }

    public void setNovoLimite(BigDecimal novoLimite) {
        this.novoLimite = novoLimite;
    }
}

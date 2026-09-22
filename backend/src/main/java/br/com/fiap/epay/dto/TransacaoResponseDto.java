package br.com.fiap.epay.dto;

import br.com.fiap.epay.model.TipoTransacao;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class TransacaoResponseDto {
    private Long id;
    private TipoTransacao tipo;
    private BigDecimal valor;
    private LocalDateTime dataHora;
    private String descricao;
    private String nomeOrigem;
    private String nomeDestino;
    private boolean entrada;

    public TransacaoResponseDto() {}

    public TransacaoResponseDto(Long id, TipoTransacao tipo, BigDecimal valor, LocalDateTime dataHora, String descricao, String nomeOrigem, String nomeDestino, boolean entrada) {
        this.id = id;
        this.tipo = tipo;
        this.valor = valor;
        this.dataHora = dataHora;
        this.descricao = descricao;
        this.nomeOrigem = nomeOrigem;
        this.nomeDestino = nomeDestino;
        this.entrada = entrada;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TipoTransacao getTipo() {
        return tipo;
    }

    public void setTipo(TipoTransacao tipo) {
        this.tipo = tipo;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getNomeOrigem() {
        return nomeOrigem;
    }

    public void setNomeOrigem(String nomeOrigem) {
        this.nomeOrigem = nomeOrigem;
    }

    public String getNomeDestino() {
        return nomeDestino;
    }

    public void setNomeDestino(String nomeDestino) {
        this.nomeDestino = nomeDestino;
    }

    public boolean isEntrada() {
        return entrada;
    }

    public void setEntrada(boolean entrada) {
        this.entrada = entrada;
    }
}

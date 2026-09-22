package br.com.fiap.epay.dto;

public class LoginResponseDto {
    private String token;
    private String tipo = "Bearer";
    private UsuarioResponseDto usuario;
    private ContaResponseDto conta;

    public LoginResponseDto() {}

    public LoginResponseDto(String token, UsuarioResponseDto usuario, ContaResponseDto conta) {
        this.token = token;
        this.tipo = "Bearer";
        this.usuario = usuario;
        this.conta = conta;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public UsuarioResponseDto getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioResponseDto usuario) {
        this.usuario = usuario;
    }

    public ContaResponseDto getConta() {
        return conta;
    }

    public void setConta(ContaResponseDto conta) {
        this.conta = conta;
    }
}

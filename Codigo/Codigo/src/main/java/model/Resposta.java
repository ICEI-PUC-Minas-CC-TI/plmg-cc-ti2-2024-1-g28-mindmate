package model;

public class Resposta {
    private int idResposta;
    private String descResposta;
    private double valor;

    public Resposta(int idResposta, String descResposta, double valor) {
        this.idResposta = idResposta;
        this.descResposta = descResposta;
        this.valor = valor;
    }

    public int getIdResposta() {
        return idResposta;
    }

    public String getDescResposta() {
        return descResposta;
    }

    public double getValor() {
        return valor;
    }
}
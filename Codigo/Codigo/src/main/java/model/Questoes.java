package model;

import java.util.ArrayList;

public class Questoes {
    private int id_pergunta;
    private String desc_pergunta;
    private ArrayList<Resposta> respostas;
    
    public Questoes(int id_pergunta, String desc_pergunta) {
        this.id_pergunta = id_pergunta;
        this.desc_pergunta = desc_pergunta;
    }
    
    public Questoes(int id_pergunta, String desc_pergunta, ArrayList<Resposta> respostas) {
        this.id_pergunta = id_pergunta;
        this.desc_pergunta = desc_pergunta;
        this.respostas = respostas;
    }
    public int getId_pergunta() {
        return id_pergunta;
    }
    public void setId_pergunta(int id_pergunta) {
        this.id_pergunta = id_pergunta;
    }
    public String getDesc_pergunta() {
        return desc_pergunta;
    }
    public void setDesc_pergunta(String desc_pergunta) {
        this.desc_pergunta = desc_pergunta;
    }
    public ArrayList<Resposta> getRespostas() {
        return respostas;
    }
    public void setRespostas(ArrayList<Resposta> respostas) {
        this.respostas = respostas;
    }
}
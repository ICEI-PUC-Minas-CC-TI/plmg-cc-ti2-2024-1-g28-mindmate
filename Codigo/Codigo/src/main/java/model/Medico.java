package model;

public class Medico {
    private int idMedico;
    private String descMedico;
    private String foneMedico;
    private String emailMedico;
    private int idadeMedico;
    private String cidadeMedico;
    private String enderecoMedico;
    private String webMedico;
    private int idUsuario;

    public Medico() {
    }

    public Medico(int idMedico, String descMedico, String foneMedico, String emailMedico, int idadeMedico, String cidadeMedico, String enderecoMedico, String webMedico, int idUsuario) {
        this.idMedico = idMedico;
        this.descMedico = descMedico;
        this.foneMedico = foneMedico;
        this.emailMedico = emailMedico;
        this.idadeMedico = idadeMedico;
        this.cidadeMedico = cidadeMedico;
        this.enderecoMedico = enderecoMedico;
        this.webMedico = webMedico;
        this.idUsuario = idUsuario;
    }

    public int getIdMedico() {
        return idMedico;
    }

    public void setIdMedico(int idMedico) {
        this.idMedico = idMedico;
    }

    public String getDescMedico() {
        return descMedico;
    }

    public void setDescMedico(String descMedico) {
        this.descMedico = descMedico;
    }

    public String getFoneMedico() {
        return foneMedico;
    }

    public void setFoneMedico(String foneMedico) {
        this.foneMedico = foneMedico;
    }

    public String getEmailMedico() {
        return emailMedico;
    }

    public void setEmailMedico(String emailMedico) {
        this.emailMedico = emailMedico;
    }

    public int getIdadeMedico() {
        return idadeMedico;
    }

    public void setIdadeMedico(int idadeMedico) {
        this.idadeMedico = idadeMedico;
    }

    public String getCidadeMedico() {
        return cidadeMedico;
    }

    public void setCidadeMedico(String cidadeMedico) {
        this.cidadeMedico = cidadeMedico;
    }

    public String getEnderecoMedico() {
        return enderecoMedico;
    }

    public void setEnderecoMedico(String enderecoMedico) {
        this.enderecoMedico = enderecoMedico;
    }

    public String getWebMedico() {
        return webMedico;
    }

    public void setWebMedico(String webMedico) {
        this.webMedico = webMedico;
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }
}

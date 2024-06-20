package dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import model.Questoes;
import model.Resposta;

public class QuestoesDAO extends DAO {
    public QuestoesDAO() {
        super();
        conectar();
    }

    public void finalize() {
        close();
    }

    public List<Questoes> getAll() {
        List<Questoes> questoes = new ArrayList<>();

        try {
            Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
            String sql = "SELECT * FROM perguntas;";
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {
                Questoes questao = new Questoes(
                                rs.getInt("id_perguntas"),
                                rs.getString("desc_perguntas")
                                );
                questoes.add(questao);
            }
            
            for (Questoes q : questoes) {
                ArrayList<Resposta> respostas = new ArrayList<Resposta>();
                sql = "SELECT * FROM respostas WHERE id_perguntas = " + q.getId_pergunta() + ";";
                rs = st.executeQuery(sql);   

                while (rs.next()) {
                    Resposta resposta = new Resposta(
                                    rs.getInt("id_respostas"),
                                    rs.getString("nota_respostas"),
                                    rs.getDouble("valor")
                                    );

                    respostas.add(resposta);
                }

                q.setRespostas(respostas);
            }

            Collections.shuffle(questoes);
            st.close();
        } catch (SQLException u) {
            throw new RuntimeException(u);
        }
        return questoes;
    }
    
}

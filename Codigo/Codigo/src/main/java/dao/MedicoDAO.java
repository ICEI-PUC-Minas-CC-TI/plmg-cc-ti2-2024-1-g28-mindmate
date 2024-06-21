package dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import model.Medico;

public class MedicoDAO extends DAO {
	public MedicoDAO() {
		super();
		conectar();
	}

	public void finalize() {
		close();
	}

	public boolean insert(Medico medico) {
		boolean status = false;
		try {

			String sql = "INSERT INTO medico (desc_medico, fone_medico, email_medico, idade_medico, cidade_medico, endereco_medico, web_medico, id_usuario) " 
					+ "VALUES ('" + medico.getDescMedico() + "', '"
					+ medico.getFoneMedico() + "', '" + medico.getEmailMedico() + "', '" + medico.getIdadeMedico() + "', '" + medico.getCidadeMedico() + "', '" + medico.getEnderecoMedico()
					+ "', '" + medico.getWebMedico() + "', '" + medico.getIdUsuario()+ "');";

			PreparedStatement st = conexao.prepareStatement(sql);
			st.executeUpdate();
			st.close();
			status = true;
		} catch (SQLException u) {
			throw new RuntimeException(u);
		}
		return status;
	}

	public List<Medico> getAll(int id_usuario) {
        List<Medico> medicos = new ArrayList<>();

        try {
            Statement st = conexao.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
            String sql = "SELECT * FROM medico WHERE id_usuario =" + id_usuario + ";";
            ResultSet rs = st.executeQuery(sql);
            while (rs.next()) {
                Medico medico = new Medico(
                                rs.getInt("id"),
                                rs.getString("desc_medico"), 
                                rs.getString("fone_medico"),
                                rs.getString("email_medico"), 
                                rs.getInt("idade_medico"), 
                                rs.getString("cidade_medico"),
                                rs.getString("endereco_medico"),
                                rs.getString("web_medico"),
                                rs.getInt("id_usuario"));
                medicos.add(medico);
            }
            st.close();
        } catch (SQLException u) {
            throw new RuntimeException(u);
        }
        return medicos;
    }
}

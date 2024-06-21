package service;

import java.util.List;

import com.google.gson.Gson;

import dao.MedicoDAO;
import model.Medico;
import spark.Request;
import spark.Response;

public class MedicoService {

	private MedicoDAO MedicoDAO = new MedicoDAO();

	public MedicoService() {

	}

	public String insert(Request request, Response response) {
		try{
			String json = request.body();
			Gson gson = new Gson();

			Medico medico = gson.fromJson(json, Medico.class);
			
			if(MedicoDAO.insert(medico) == true) {
				response.status(201); // 201 Created
				return "{\"message\": \"Medico inserido com sucesso\"}";
			} else {
				response.status(404); // 404 Not found
				return "{\"message\": \"Medico não foi inserido\"}";
			}
		}catch(NullPointerException e){
			response.status(500);
			return "{\"message\": \"Ocorreu um erro no servidor\"}";
		}
	}

	public Object get(Request request, Response response) {
		String id = request.params(":id");

		List<Medico> despesas = MedicoDAO.getAll(Integer.parseInt(id));

		if (despesas != null) {
			response.header("Content-Type", "application/json");
			response.header("Content-Encoding", "UTF-8");

			return new Gson().toJson(despesas);
		} else {
			response.status(404); // 404 Not found
			return "{\"message\": \"Despesa não encontrada\"}";
		}
	}
}

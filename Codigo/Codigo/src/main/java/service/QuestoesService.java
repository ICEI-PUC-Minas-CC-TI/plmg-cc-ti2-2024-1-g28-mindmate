package service;

import java.util.List;

import com.google.gson.Gson;

import dao.QuestoesDAO;
import model.Questoes;
import spark.Request;
import spark.Response;

public class QuestoesService {

    private QuestoesDAO questoesDAO = new QuestoesDAO();

	public QuestoesService() {

	}

    public String get(Request request, Response response) {
        try{
            List<Questoes> questoes = questoesDAO.getAll();

            if(questoes != null) {
                response.status(200); 
                response.header("Content-Type", "application/json");
			    response.header("Content-Encoding", "UTF-8");
                return new Gson().toJson(questoes);
            } else {
                response.status(404); // 404 Not found
                return "{\"message\": \"Receita não encontrada\"}";
            }
        }catch(Exception e){
            response.status(500); // Internal server error
            return "{\"message\": \"Ocorreu um erro no servidor\"}";
        }
    }
}

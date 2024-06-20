package service;

import dao.UsuarioDAO;
import model.Usuario;
import spark.Request;
import spark.Response;

import java.util.ArrayList;

import com.google.gson.Gson;

public class UsuarioService {

	private UsuarioDAO UsuarioDAO = new UsuarioDAO();

	public UsuarioService() {

	}

	public String insert(Request request, Response response) {

		String json = request.body();
		Gson gson = new Gson();
		
		Usuario usuario = gson.fromJson(json, Usuario.class);
		usuario.setSenha(usuario.CriptografarSenha(usuario.getSenha()).toString());

		if (UsuarioDAO.insert(usuario) == true) {
			response.status(201); // 201 Created
			return "{\"message\": \"Usuário inserido com sucesso\"}";
		} else {
			response.status(404); // 404 Not found
			return "{\"message\": \"Usuário não foi inserido\"}";
		}
	}

	public String get(Request request, Response response) {

		String json = request.body();
		Gson gson = new Gson();

		int id = gson.fromJson(json, Usuario.class).getId();
		Usuario usuario = UsuarioDAO.get(id);

		if (usuario != null) {
			response.header("Content-Type", "application/json");
			response.header("Content-Encoding", "UTF-8");
			return new Gson().toJson(usuario);
		} else {
			response.status(404); // 404 Not found
			return "{\"message\": \"Usuário não encontrado\"}";
		}
	}

	public String getAll(Request request, Response response) {
		
		ArrayList<Usuario> usuarios = new ArrayList<Usuario>();

 		usuarios = UsuarioDAO.getAll();
		
		if (usuarios != null) {
			response.header("Content-Type", "application/json");
			response.header("Content-Encoding", "UTF-8");
			return new Gson().toJson(usuarios);
		} else {
			response.status(404); // 404 Not found
			return "{\"message\": \"Sem usuarios cadastrados\"}";
		}
	}

	public String authenticate(Request request, Response response) {
		String json = request.body();
		Gson gson = new Gson();

		Usuario usuarioLogin = gson.fromJson(json, Usuario.class);
		String email = usuarioLogin.getEmail();

		Usuario usuario = UsuarioDAO.getByEmail(email);

		if (usuario != null && checkPassword(usuarioLogin, usuario)) {

			Usuario usuarioWithoutPassword = new Usuario(usuario.getId(), usuario.getNomeCompleto(), usuario.getEmail());
			response.status(200);
			return new Gson().toJson(usuarioWithoutPassword);
		} else {
			response.status(401); 
			return "{\"message\": \"Falha na autenticação\"}";
		}
	}

	private boolean checkPassword(Usuario plainPassword, Usuario hashedPassword) {
		String senhaLogin = plainPassword.CriptografarSenha(plainPassword.getSenha()).toString();
		String senhaBanco = hashedPassword.getSenha();
		return senhaLogin.equals(senhaBanco);

	}

	public String update(Request request, Response response) {
		String idParam = request.params(":id");
		int id = Integer.parseInt(idParam);

		String json = request.body();
		Gson gson = new Gson();
		Usuario usuarioAtualizado = gson.fromJson(json, Usuario.class);

		Usuario usuarioExistente = UsuarioDAO.get(id);
		if (usuarioExistente == null) {
			response.status(404); // 404 Not found
			return "{\"message\": \"Usuário não encontrado\"}";
		}

		usuarioExistente.setNomeCompleto(usuarioAtualizado.getNomeCompleto());
		usuarioExistente.setEmail(usuarioAtualizado.getEmail());

		if (usuarioAtualizado.getSenha() != null && !usuarioAtualizado.getSenha().isEmpty()) {
			usuarioExistente.setSenha(usuarioAtualizado.CriptografarSenha(usuarioAtualizado.getSenha()).toString());
		}

		if (UsuarioDAO.update(usuarioExistente)) {
			response.status(200); // 200 OK
			return "{\"message\": \"Usuário atualizado com sucesso\"}";
		} else {
			response.status(500); // 500 Internal Server Error
			return "{\"message\": \"Erro ao atualizar o usuário\"}";
		}
	}

}
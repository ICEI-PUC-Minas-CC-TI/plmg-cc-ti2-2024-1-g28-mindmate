package app;

import static spark.Spark.*;
import service.MedicoService;
import service.QuestoesService;
import service.UsuarioService;
import java.util.HashMap;
import spark.Filter;
import spark.Request;
import spark.Response;
import spark.Spark;


public class Aplicacao {

    private static UsuarioService usuarioService = new UsuarioService();
    private static MedicoService medicoService = new MedicoService();
    private static QuestoesService questoesService = new QuestoesService();

    public static void main(String[] args) {
        port(6789);

        staticFiles.location("/public");

        CorsFilter.apply();

        // Options handler for CORS
        options("/*", (request, response) -> {

            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }

            return "OK";
        });
        // before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));

        //USUARIOS
        post("/usuario/insert", (request, response) -> usuarioService.insert(request, response));

        put("/usuario/put/:id", (request, response) -> usuarioService.update(request, response));

        get("/usuario/get", (request, response) -> usuarioService.get(request, response));

        get("/usuario/getAll", (request, response) -> usuarioService.getAll(request, response));

        post("/usuario/authenticate", (request, response) -> usuarioService.authenticate(request, response));

        //MEDICO
        post("/medico/insert", (request, response) -> medicoService.insert(request, response));

        get("/medico/get/:id", (request, response) -> medicoService.get(request, response));

        //PERGUNTAS E RESPOSTAS

        get("/questoes/getAll", (request, response) -> questoesService.get(request, response));


    }
}

class CorsFilter {

    private static final HashMap<String, String> corsHeaders = new HashMap<String, String>();

    static {
        corsHeaders.put("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
        corsHeaders.put("Access-Control-Allow-Origin", "*");
        corsHeaders.put("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Content-Length, Accept, Origin");
        corsHeaders.put("Access-Control-Allow-Credentials", "true");
        corsHeaders.put("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers");
    }

    public final static void apply() {
        Filter filter = new Filter() {
            @Override
            public void handle(Request request, Response response) throws Exception {
                corsHeaders.forEach((key, value) -> {
                    response.header(key, value);
                });
            }
        };
        Spark.after(filter);
    }
}

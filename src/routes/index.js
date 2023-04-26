import receitasRoutes from "./receitasRoutes.js"
import handleNotFound from "../util/handleNotFound.js";
import handleError from "../util/handleError.js";
import handleValidationError from "../util/handleValidationError.js";

const routes = (app) => {

    app.get('/ping', (req, res) => { //get é um método do express que tem como parâmetro a rota e uma aero function com parâmetro de requisição do usuário e resposta da API
        res.status(200), //status que retorna ok (parametro do res)
        res.send({resposta: "pong"}); // retorna os dados
    })

    app.use(receitasRoutes);
    app.use(handleNotFound);
    app.use(handleValidationError);
    app.use(handleError);
}

export default routes; 
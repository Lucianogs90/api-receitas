import express from "express";
import receitasController from "../controllers/receitasController.js";

const receitasRoutes = express.Router();

receitasRoutes
.get('/receitas', receitasController.listar)
.get('/receitas/:id', receitasController.listarPorId)
.post('/receitas', receitasController.criar)
.put('/receitas/:id', receitasController.alterar)
.delete('/receitas/:id', receitasController.deletar)


export default receitasRoutes;
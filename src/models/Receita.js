import mongoose from "mongoose";

const receitaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, "O campo título é obrigatório!"],
    minlength: [10, "O campo título deve ter no mínimo 10 caracteres!"],
  },
  tempoPreparo: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value < 10;
      },
    },
  },
  porcoes: {
    type: Number,
    required: [true, "O campo porções é obrigatório!"],
  },
  imagem: {
    type: String,
    required: [true, "O campo imagem é obrigatório!"],
  },
});

const Receita = mongoose.model("Receitas", receitaSchema); //collection chamada Receitas no mongo

export default Receita;

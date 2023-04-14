import Receita from "../models/Receita.js";

const listar = async (req, res) => {
  const receitas = await Receita.find();
  res.status(200).send(receitas);
};

const listarPorId = async (req, res) => {
  const receitas = await Receita.findById(req.params.id);
  res.status(200);
  res.send(receitas);
};

const criar = async (req, res) => {
  //js não é assíncrono (não espera uma linha executar para executar a outra)
  const { titulo, tempoPreparo, porcoes, imagem } = req.body; //desestruturação do body pegando apenas esses 4 e criando variáveis

  const novaReceita = new Receita({
    //jogando as variáveis nesse novo objeto
    titulo,
    tempoPreparo,
    porcoes,
    imagem,
  });

  const receitaSalva = await novaReceita.save(); //criando uma nova constante para retornar um novo ID. await quer dizer que essa linha só vai ser executada após salvar a novaReceita no banco
  res.status(201).send(receitaSalva);
};

const alterar = async (req, res) => {
  const id = req.params.id;
  const receita_nova = req.body;

  const receita = await Receita.findByIdAndUpdate(id, receita_nova);

  if (!receita) {
    res.status(404).send({ message: "Receita não encontrada" });
  }
  if (receita) {
    res
      .status(200)
      .send({ message: "Receita alterada com sucesso", receita: receita_nova });
  }
};

const deletar = async (req, res) => {
  const receita = await Receita.findByIdAndDelete(req.params.id);

  if (!receita) {
    res.status(404).send({ message: "Receita não encontrada" });
  }
  if (receita) {
    res
      .status(200)
      .send({ message: "Receita excluída com sucesso", receita: receita });
  }
};

const receitasController = {
  listar,
  listarPorId,
  criar,
  alterar,
  deletar,
};

export default receitasController;

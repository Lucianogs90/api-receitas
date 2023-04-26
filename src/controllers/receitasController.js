import Receita from "../models/Receita.js";

const listar = async (req, res, next) => {
  try {
    const { titulo, pagina = 1 } = req.query;
    const itensPorPagina = 10;

    const filtro = titulo ? {titulo : new RegExp(titulo, "i")} : {}; //se o titulo for verdadeiro, ele vai filtrar o titulo, se não, vai filtrar tudo 

    const totalItens = await Receita.countDocuments(filtro);

    const receitas = await Receita.find(filtro)
      .skip((pagina - 1) * itensPorPagina)
      .limit(itensPorPagina);

    const totalPaginas = Math.ceil(totalItens / itensPorPagina);

    res.status(200)
    res.send({
      pagina,
      totalPaginas,
      totalItens,
      receitas,
    });
  } catch (err) {
    next(err);
  }
};

const listarPorId = async (req, res, next) => {
  try {
    const receitas = await Receita.findById(req.params.id);
    res.status(200);
    res.send(receitas);
  } catch (err) {
    next(err);
  }
};

const criar = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

const alterar = async (req, res, next) => {
  try {
    const id = req.params.id;
    const receita_nova = req.body;

    const receita = await Receita.findByIdAndUpdate(id, receita_nova);

    if (!receita) {
      res.status(404).send({ message: "Receita não encontrada" });
    }
    if (receita) {
      res.status(200).send({
        message: "Receita alterada com sucesso",
        receita: receita_nova,
      });
    }
  } catch (err) {
    next(err);
  }
};

const deletar = async (req, res, next) => {
  try {
    const receita = await Receita.findByIdAndDelete(req.params.id);

    if (!receita) {
      res.status(404).send({ message: "Receita não encontrada" });
    }
    if (receita) {
      res
        .status(200)
        .send({ message: "Receita excluída com sucesso", receita: receita });
    }
  } catch (err) {
    next(err);
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

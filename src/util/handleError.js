const handleError = (req, res, err) => {
  //TODO: Implementar função de erro
  console.log(err)
  res.status(500).send({
    message: "Erro interno no servidor!",
  });
}

export default handleError;
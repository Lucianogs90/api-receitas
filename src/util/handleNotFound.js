const handleNotFound = (req, res) => {
  res.status(404).send({
    message: "Endpoint não encontrado!",
  });
};

export default handleNotFound;

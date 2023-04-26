const handleValidationError = (err, req, res, next) => {
  if(err.name === "ValidationError") {
    const erros = {};

    for(const key in err.errors) {
      erros[key] = err.errors[key].message;
    }

    res.status(400).send(erros);
  } else {
    next(err);
  }
}

export default handleValidationError;
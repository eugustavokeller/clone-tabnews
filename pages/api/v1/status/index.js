function status(request, response) {
  response.status(200).json({ chave: "VALOR" });
}

export default status;

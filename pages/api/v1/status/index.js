import database from "infra/database";

async function status(request, response) {
  const result = await database.query("SELECT NOW();");
  console.log(result);
  response.status(200).json({ chave: "VALOR" });
}

export default status;

import database from "infra/database";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const resultDbMaxConnections = await database.query("SHOW max_connections;");
  const maxConnections = parseInt(resultDbMaxConnections[0].max_connections);

  const dbName = process.env.POSTGRES_DB;
  const resultDbAtiveConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [dbName],
  });
  const activeConnections = resultDbAtiveConnections[0].count;

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersion = databaseVersionResult[0].server_version;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersion,
        max_connections: maxConnections,
        opened_connections: activeConnections,
      },
    },
  });
}

export default status;

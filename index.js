const { MongoClient, ServerApiVersion } = require('mongodb');

// Replace the uri string with your connection string.
const uri = "mongodb+srv://phoenyxprojeto:bC4kjS2T6M7NzMZK@phoenyx.yax5l.mongodb.net/?retryWrites=true&w=majority&appName=Phoenyx";

// Criar o cliente com as configurações de API estável
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Conecta ao servidor
    await client.connect();

    // Envia um ping para confirmar a conexão
    await client.db("admin").command({ ping: 1 });
    console.log("Ping bem-sucedido! Conexão com o MongoDB estabelecida.");

    // Trabalha com a base de dados e coleção específicas
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    // Consulta por um filme com o título "Back to the Future"
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);

    // Exibe o resultado da consulta
    console.log(movie);
  } catch (err) {
    console.error("Erro ao conectar ou consultar o banco de dados:", err);
  } finally {
    // Fecha o cliente para liberar recursos
    await client.close();
  }
}

// Executa a função principal e captura erros
run().catch(console.dir);

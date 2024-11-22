const { MongoClient, ServerApiVersion } = require('mongodb');

// Substitua pela sua string de conexão
const uri = "mongodb+srv://phoenyxprojeto:bC4kjS2T6M7NzMZK@phoenyx.yax5l.mongodb.net/?retryWrites=true&w=majority&appName=Phoenyx";

// Criar o cliente do MongoDB com as configurações apropriadas
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Função de inicialização e consulta
async function run() {
  try {
    // Conecta ao servidor MongoDB
    console.log("Conectando ao MongoDB...");
    await client.connect();

    // Confirma a conexão com um ping
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Conexão com o MongoDB estabelecida.");

    // Trabalhar com a base de dados e coleção específicas
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    // Consulta por um filme com o título especificado
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);

    if (movie) {
      console.log("🎥 Filme encontrado:", movie);
    } else {
      console.log("⚠️ Nenhum filme encontrado com o título especificado.");
    }
  } catch (err) {
    console.error("❌ Erro ao conectar ou consultar o banco de dados:", err.message);
  } finally {
    // Fecha o cliente para liberar recursos
    console.log("Encerrando conexão com o MongoDB...");
    await client.close();
    console.log("Conexão encerrada.");
  }
}

// Executa a função principal e captura erros
run().catch(err => console.error("Erro inesperado:", err.message));

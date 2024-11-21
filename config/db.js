// conexão com MongoDB
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
const uri="mongodb+srv://phoenyxprojeto:bC4kjS2T6M7NzMZK@phoenyx.yax5l.mongodb.net/?retryWrites=true&w=majority&appName=Phoenyx"

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB conectado com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB", error);
    process.exit(1); // Encerra o processo em caso de erro
  }
};

module.exports = connectDB;

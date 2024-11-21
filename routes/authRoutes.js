const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Modelo de Usuário
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
});

const User = mongoose.model("User", UserSchema);

// Conexão ao MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.log("Erro ao conectar ao MongoDB:", err));

// Registrar novo usuário
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password, bio } = req.body;

    // Verificar se o email ou username já estão registrados
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email ou username já registrados." });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar novo usuário
    const user = await User.create({ username, email, password: hashedPassword, bio });
    res.status(201).json({ message: "Usuário registrado com sucesso!", user });
  } catch (error) {
    res.status(500).json({ message: "Erro ao registrar usuário.", error: error.message });
  }
});

// Login do usuário
app.post("/api/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Encontrar o usuário pelo username ou email
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Verificar se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Senha incorreta." });
    }

    // Gerar o token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ message: "Login realizado com sucesso!", token });
  } catch (error) {
    res.status(500).json({ message: "Erro ao realizar login.", error: error.message });
  }
});

// Inicializar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

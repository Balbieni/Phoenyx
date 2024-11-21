const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Configuração do dotenv para variáveis de ambiente
dotenv.config();

const app = express();
app.use(cors()); // Middleware de CORS
app.use(express.json()); // Middleware para processar JSON no corpo das requisições

// Modelo de Usuário
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
});

const User = mongoose.model('User', UserSchema);

// Conexão ao MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB conectado com sucesso'))
  .catch((err) => console.log('Erro ao conectar ao MongoDB:', err));

// Rotas de Autenticação

// Registrar novo usuário
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, bio } = req.body;

    // Verificar se o usuário ou email já existem
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email ou username já estão registrados.' });
    }

    // Criptografar senha e criar o usuário
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword, bio });

    res.status(201).json({ message: 'Usuário registrado com sucesso!', user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar usuário.', error: error.message });
  }
});

// Login do usuário
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Procurar usuário por username ou email
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Senha incorreta.' });
    }

    // Gerar JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ message: 'Login realizado com sucesso!', token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao realizar login.', error: error.message });
  }
});

// Rotas Modulares
// Outros arquivos de rotas são mantidos modularizados
const tweetRoutes = require('./routes/tweetRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const chatRoutes = require('./routes/chatRoutes');

app.use('/api/tweets', tweetRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/chat', chatRoutes);

// Inicializar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

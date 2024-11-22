const jwt = require('jsonwebtoken');
const User = require('../models/models'); // Certifique-se de importar o modelo de usuário

// Middleware de autenticação
const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtém o token do cabeçalho

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decodifica o token
    req.user = await User.findById(decoded.id); // Busca o usuário no banco
    if (!req.user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    next(); // Passa para o próximo middleware ou rota
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido.', error: error.message });
  }
};

module.exports = authMiddleware;

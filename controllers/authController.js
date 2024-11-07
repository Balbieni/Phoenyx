// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registrar novo usuário
exports.register = async (req, res) => {
  try {
    const { username, password, bio } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, bio });
    res.status(201).json({ message: "Usuário registrado com sucesso", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login do usuário
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.status(200).json({ message: "Login realizado com sucesso", token });
    } else {
      res.status(400).json({ message: "Credenciais inválidas" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

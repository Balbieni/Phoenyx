// routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);  // Rota para registrar usuário
router.post('/login', login);        // Rota para login

module.exports = router;

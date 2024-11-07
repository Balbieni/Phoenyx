// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// Suponha que exista algum controlador que exporta funções de autenticação
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;

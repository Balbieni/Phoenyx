// routes/chatRoutes.js
const express = require('express');
const { sendMessage, getMessages } = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, sendMessage);         // Enviar mensagem direta
router.get('/:userId', authMiddleware, getMessages);   // Listar mensagens com um usuário

module.exports = router;

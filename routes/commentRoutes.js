// routes/commentRoutes.js
const express = require('express');
const { addComment, getComments } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:tweetId', authMiddleware, addComment);    // Adicionar comentário em um tweet
router.get('/:tweetId', authMiddleware, getComments);    // Listar comentários de um tweet

module.exports = router;

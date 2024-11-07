// routes/userRoutes.js
const express = require('express');
const { getUserProfile, followUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:id', authMiddleware, getUserProfile); // Visualizar perfil de um usuário
router.put('/:id/follow', authMiddleware, followUser); // Seguir/deixar de seguir um usuário

module.exports = router;

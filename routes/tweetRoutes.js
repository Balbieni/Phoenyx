// routes/tweetRoutes.js
const express = require('express');
const {
  createTweet,
  getTweets,
  likeTweet,
  retweet
} = require('../controllers/tweetController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createTweet);      // Criar um novo tweet
router.get('/', authMiddleware, getTweets);         // Listar tweets na timeline
router.put('/:id/like', authMiddleware, likeTweet); // Curtir/descurtir um tweet
router.post('/:id/retweet', authMiddleware, retweet); // Retweetar um tweet

module.exports = router;

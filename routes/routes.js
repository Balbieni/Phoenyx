const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getMessages,
  addComment,
  getComments,
  createTweet,
  getTweets,
  likeTweet,
  retweet,
  getUserProfile,
  followUser,
} = require("../controllers/controller");

// Middleware de autenticação
const authMiddleware = require("../middleware/authMiddleware");

// Rotas relacionadas ao chat
router.post("/chat", authMiddleware, sendMessage);
router.get("/chat/:userId", authMiddleware, getMessages);

// Rotas relacionadas a tweets
router.post("/tweets", authMiddleware, createTweet);
router.get("/tweets", authMiddleware, getTweets);
router.post("/tweets/:id/like", authMiddleware, likeTweet);
router.post("/tweets/:id/retweet", authMiddleware, retweet);

// Rotas relacionadas a comentários
router.post("/tweets/:tweetId/comments", authMiddleware, addComment);
router.get("/tweets/:tweetId/comments", authMiddleware, getComments);

// Rotas relacionadas a usuários
router.get("/users/:id", authMiddleware, getUserProfile);
router.post("/users/:id/follow", authMiddleware, followUser);

module.exports = router;

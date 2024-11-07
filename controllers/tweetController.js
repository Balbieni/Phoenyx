// controllers/tweetController.js
const Tweet = require('../models/Tweet');
const User = require('../models/User');

// Criar novo tweet
exports.createTweet = async (req, res) => {
  try {
    const { content, hashtags } = req.body;
    if (content.length > 280) return res.status(400).json({ message: "Tweet excede 280 caracteres" });
    const tweet = await Tweet.create({ content, author: req.user.id, hashtags });
    res.status(201).json({ message: "Tweet criado", tweet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Listar tweets na timeline
exports.getTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find().sort({ createdAt: -1 }).populate('author', 'username');
    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Curtir um tweet
exports.likeTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) return res.status(404).json({ message: "Tweet não encontrado" });

    if (!tweet.likes.includes(req.user.id)) {
      tweet.likes.push(req.user.id);
    } else {
      tweet.likes = tweet.likes.filter(userId => userId.toString() !== req.user.id);
    }

    await tweet.save();
    res.status(200).json({ message: "Tweet curtido/descurtido", tweet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retweetar
exports.retweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) return res.status(404).json({ message: "Tweet não encontrado" });

    const retweet = await Tweet.create({
      content: tweet.content,
      author: req.user.id,
      retweetFrom: tweet._id
    });

    res.status(201).json({ message: "Retweet realizado", retweet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

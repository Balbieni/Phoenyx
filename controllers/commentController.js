// controllers/commentController.js
const Comment = require('../models/Comment');
const Tweet = require('../models/Tweet');

// Adicionar comentário a um tweet
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const tweet = await Tweet.findById(req.params.tweetId);

    if (!tweet) return res.status(404).json({ message: "Tweet não encontrado" });

    const comment = await Comment.create({
      content,
      author: req.user.id,
      tweet: tweet._id
    });

    tweet.comments.push(comment._id);
    await tweet.save();
    res.status(201).json({ message: "Comentário adicionado", comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Listar comentários de um tweet
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ tweet: req.params.tweetId }).populate('author', 'username');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

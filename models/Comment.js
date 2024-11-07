// models/Comment.js
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tweet: { type: mongoose.Schema.Types.ObjectId, ref: 'Tweet', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);

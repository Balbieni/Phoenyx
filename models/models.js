const mongoose = require('mongoose');

// User Model
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }],
}, { timestamps: true });
const User = mongoose.model('User', UserSchema);

// Comment Model
const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tweet: { type: mongoose.Schema.Types.ObjectId, ref: 'Tweet', required: true },
}, { timestamps: true });
const Comment = mongoose.model('Comment', CommentSchema);

// Tweet Model
const TweetSchema = new mongoose.Schema({
  content: { type: String, required: true, maxlength: 280 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  retweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  hashtags: [String],
  retweetFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });
const Tweet = mongoose.model('Tweet', TweetSchema);

// Message Model
const MessageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true });
const Message = mongoose.model('Message', MessageSchema);

// Hashtag Model
const HashtagSchema = new mongoose.Schema({
  tag: { type: String, required: true, unique: true },
  frequency: { type: Number, default: 1 }
});
const Hashtag = mongoose.model('Hashtag', HashtagSchema);

// Exporting all models
module.exports = { Comment, Tweet, Message, Hashtag };
module.exports = mongoose.model('User', UserSchema);

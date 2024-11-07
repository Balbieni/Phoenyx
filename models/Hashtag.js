// models/Hashtag.js
const mongoose = require('mongoose');

const HashtagSchema = new mongoose.Schema({
  tag: { type: String, required: true, unique: true },
  frequency: { type: Number, default: 1 }
});

module.exports = mongoose.model('Hashtag', HashtagSchema);

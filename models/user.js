const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String },
});

// Verifica se o modelo já foi registrado
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;

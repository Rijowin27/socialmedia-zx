const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: 'https://randomuser.me/api/portraits/lego/1.jpg' },
  bio: { type: String, default: 'New user' },
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});
module.exports = mongoose.model('User', UserSchema);
// Mongoose automatically pluralizes and lowercases the model name you provide:


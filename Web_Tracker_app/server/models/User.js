const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String // NOTE: You'll hash this later for security
});

module.exports = mongoose.model('User', userSchema);

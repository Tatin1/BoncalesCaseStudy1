const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  role: String,
  firstname: String,
  lastname: String,
  about: String,
  username: String,
  password: String
})

const UserModel = mongoose.model("Users", UserSchema)

module.exports = UserModel
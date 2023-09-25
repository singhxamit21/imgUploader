const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    image:String,
    name: String
})

const UserModel = mongoose.model("users",UserSchema)

module.exports = UserModel


const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String, require: true},
    password: {type: String, require: true},
    role: {type: String, default: "user"}
   
}, {timestamps: true})

const User = new mongoose.model("User", userSchema)

module.exports = User
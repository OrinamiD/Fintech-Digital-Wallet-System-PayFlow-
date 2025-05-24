

const mongoose = require("mongoose")

transactionSchema = new mongoose.Schema({
    sender: {type: String, require: true},
    receiver: {type: String, require: true},
    amount: {type: Number, default: 0},
    type: {type: String},


}, {timestamps: true})


const Transaction = new mongoose.model("Transaction", transactionSchema)


module.exports = Transaction


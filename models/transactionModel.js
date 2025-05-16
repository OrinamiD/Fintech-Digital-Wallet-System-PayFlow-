

const mongoose = require("mongoose")

transactionSchema = new mongoose.Schema({
    sender: {type: String, require: true},
    receive: {type: String, require: true},
    amount: {type: Number, default: 0},
    accountType: {type: String},


}, {timestamps: true})


const Transaction = new mongoose.model("Transaction", transactionSchema)


module.exports = Transaction


const mongoose = require("mongoose")
const Wallet = require("./walletModel")

transactionSchema = new mongoose.Schema({
    sender_id: {type: mongoose.Schema.Types.ObjectId, ref: Wallet, require: true},
    receiver_id: {type: mongoose.Schema.Types.ObjectId, ref: Wallet, require: true},
    amount: {type: Number, default: 0},
    type: {type: String},


}, {timestamps: true})


const Transaction = new mongoose.model("Transaction", transactionSchema)


module.exports = Transaction


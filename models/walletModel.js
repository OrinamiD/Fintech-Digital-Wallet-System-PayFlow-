

const mongoose = require("mongoose")

const walletSchema = new mongoose.Schema({
    // user_id: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    user_id: { type: String},
    balance: {type: Number, default: 0}
    
}, {timestamps: true})

const Wallet = new mongoose.model("Wallet", walletSchema)

module.exports = Wallet
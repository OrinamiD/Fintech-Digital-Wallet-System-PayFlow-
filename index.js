
const express = require("express")

const mongoose = require("mongoose")

const bcrypt = require("bcryptjs")

const dotenv = require("dotenv").config()

const jwt = require("jsonwebtoken")

const User = require("./models/userModel")
const Wallet = require("./models/walletModel")
const Transaction = require("./models/transactionModel")
const { handleUserRegistration, handleUserLogin, handleResetPassword, handleGetAllTransactions, handleUserTransactions, handleForgotPassword, handleFundWallet, handleMoneyTransfer, handleGetUserWallet,  } = require("./Controller")
const { validateRegistration, validateLogin, auth, validateFogetPaasword, validateResetPassword, validateFundingWallet, validateMoneyTransfer } = require("./middleware")



const app = express()

app.use(express.json())

const PORT = `${process.env.PORT }` || 5800


mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("MongoDB connected successfully...")

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
})

app.get("/", (req, res)=>{
    return res.status(200).json({message: "Welcome to Fintech Digital Wallet System "})
})

// User registration


app.post("/sign-up",validateRegistration, handleUserRegistration)


// Login
app.post("/login", validateLogin, handleUserLogin)



// fotgotten password
app.post("/forgot-password", validateFogetPaasword, handleForgotPassword)



// Rest password
app.patch("/reset-password", validateResetPassword, handleResetPassword)


// Transfer funds betwen users
app.post("/money-transfer", validateMoneyTransfer, auth, handleMoneyTransfer)


// funding users account
app.post("/fund-wallet", validateFundingWallet, auth, handleFundWallet)


// Check out for user wallet
app.get("/wallet", auth, handleGetUserWallet)


// check all transactions
 app.get("/all-users-transactions", auth, handleGetAllTransactions)


 // check one user transactions
 app.get("/user-transaction", auth,  handleUserTransactions)



 // get all users in the database

//  app.get("/all-users", async ( req, res)=>{

//     const user = await User.find()

//     return res.status(200).json({message: "successful", user})
//  })

// check all wallet in the database

//  app.get("/all-wallet", auth, async (req, res)=>{

//     const users = await Wallet.find()

//      return res.status(200).json({message: "successful", users})
//  })





















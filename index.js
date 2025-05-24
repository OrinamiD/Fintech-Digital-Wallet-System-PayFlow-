
const express = require("express")

const mongoose = require("mongoose")

const bcrypt = require("bcryptjs")

const dotenv = require("dotenv").config()

const jwt = require("jsonwebtoken")

const User = require("./models/userModel")
const Wallet = require("./models/walletModel")
const Transaction = require("./models/transactionModel")
const { handleUserRegistration, handleUserLogin, handleForgetPassword, handleResetPassword, fundingAccount, fundsTransfer, handleUserWallet, handleGetAllTransactions, handleUserTransactions,  } = require("./Controller")
const { validateRegistration, validateLogin, auth, validateFogetPaasword, validateResetPassword, validateFundingAccount } = require("./middleware")



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


// User registration


app.post("/sign-up",validateRegistration, handleUserRegistration)


// Login
app.post("/login", validateLogin, handleUserLogin)



// fotgotten password
app.post("/forget-password", validateFogetPaasword, handleForgetPassword)



// Rest password
app.patch("/reset-password", validateResetPassword, handleResetPassword)


// Transfer funds betwen users
app.post("/money-transfer",  fundsTransfer)


// funding users account
app.post("/fund-wallet", validateFundingAccount, auth, fundingAccount)


// Check out for user wallet
app.get("/wallet", handleUserWallet)


// check all transactions
 app.get("/users-transaction", auth, handleGetAllTransactions)


 // check one user transactions

 app.get("/user-transaction", auth, handleUserTransactions)
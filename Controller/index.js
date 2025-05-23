const bcrypt = require("bcryptjs")
const User = require("../models/userModel")
const Wallet = require("../models/walletModel")
const jwt = require("jsonwebtoken")
const sendForgetPasswordMail = require("../sendMails/forgetPasswordEmails")
const registrationEmail = require("../sendMails/registrationEmail")
const Transaction = require("../models/transactionModel")



const handleUserRegistration = async (req, res)=>{

    
        try {
            
            
        const { name, email, password, walletBalance } = req.body
    
    
        const existingUser = await User.findOne({ email })
    
        if(existingUser){
            return res.status(404).json({message: "User account already exist. login"})
        }
    
    
        const hashedPassword = await bcrypt.hash(password, 12)
    
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            })
    
             await newUser.save()
    
            const wallet = new Wallet({
                user_id: newUser?._id,
                type: "savings",
                balance})
                
                await wallet.save()

                

    
    
                // send email
await registrationEmail(name, email, password, walletBalance)
                
    
            return res.status(201).json({message: "Registration successfull",
                newUser:{ name, email },
                wallet
            })
            
    
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

const handleUserLogin = async (req, res)=>{


    try {
  
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if(!user){
            return res.status(404).json({message: "User account not found "})
        }

        const ismatch = await bcrypt.compare(password, user?.password)

        if(!ismatch){
            return res.status(400).json({message: "Incorrect password or email"})
        }

        const accessToken = jwt.sign({user_id: user?._id}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "30h"})

        const refreshToken = jwt.sign({user_id: user?._id}, `${process.env.REFRESH_TOKEN}`, {expiresIn: "30d"})


         

        return res.status(200).json({message: "Login successfull",
          user,
          accessToken
        },

        refreshToken
    )

    } catch (error) {
         return res.status(500).json({message: error.message})
    }
    
}

const handleForgetPassword = async (req, res)=>{

   try {

     const {email} = req.body

    const user = await User.findOne({email})

    if(!user){
         return res.status(404).json({message: "User account not found"})
    }

    // send message with token
const accessToken = jwt.sign({user_id: user?._id}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "5m"})

await sendForgetPasswordMail(email, accessToken)

return res.status(200).json({message: "Please check your email inbox"})

    
   } catch (error) {
    return res.status(500).json({message: error.message})
   }
 }

const handleResetPassword = async (req, res)=>{

    try {
        
        const {password} = req.body

        const user = await User.findOne({email: req.user.email})

        if(!user){
            return res.status(404).json({message: "User account not found"})
        }

        const harshedpassword = await bcrypt.hash(password, 12)

        user.password = harshedpassword

        await user.save()

         const accessToken = jwt.sign({user: user_id}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "30m"})

         const refreshToken = jwt.sign({user: user_id}, `${process.env.REFRESH_TOKEN}`, {expiresIn: "7d"})

         return res.status(200).json({message: "Password Reset successful", accessToken, user},

            refreshToken
         )

    
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

const fundsTransfer = async (req, res)=>{

  try {
    
     const {user_id, email, sender, receiver, balance, amount } = req.body 

        // find the sender by email
      const senderUser = await User.findOne({email: email })

      if(!senderUser){
        return res.status(404).json({message: "User account not found"})
      }

      const senderWallet = await Wallet.findOne({user_id: senderUser?._id})

      if(!senderWallet){
        return res.status(404).json({message: "User wallet not found"})
      }

      // find receiver by email
      const receiverUser = await User.findOne({email: req.body.receiver})
   

      if(!receiverUser){
        return res.status(404).json({message: "User account not found"})
      }

      const receiverWallet = await Wallet.findOne({user_id: receiverUser._id })
         

      if(!receiverWallet){
        return res.status(404).json({message: "User wallet not found"})
      }
        

        if(senderWallet.balance < amount){
             return res.status(400).json({message: "Insufficient balance"})
        }


      senderWallet.balance -= Number(amount)
      
      receiverWallet.balance += Number(amount)

     await senderWallet.save()
     await receiverWallet.save()

       res.status(200).json({message: "Transaction successful",  receiverbalance: receiverWallet, senderbalace: senderWallet })
        
  } catch (error) {
    return res.status(200).json({message: error.message})
  }

    
}

const fundingAccount = async (req, res)=>{

    try {
        
        const { email, amount,} = req.body

     const user = await User.findOne({ email })

    if(!user){
       return res.status(404).json({message: "User account not found"})
    }
    // fund wallet
    const wallet = await Wallet.findOne({ user_id: user._id })

    if (!wallet){
      return res.status(404).json({ message: "Wallet not found for this user" });
    }


    wallet.balance += Number(amount)

    await wallet.save()

    return res.status(200).json({ message: "Funding successful",
      user: {
        email: user.email,
        balance: wallet.balance}})

    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

const handleUserWallet = async (req, res)=>{

  try {
    
      const {_id} = req.body

    const wallet = await Wallet.find({_id})

    if(!wallet){
        return res.status(404).json({message: "User account not found"})
    }

    return res.status(200).json({messsage: "successful", wallet})

  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}


const handleUserTransaction = async (req, res)=>{g

    const users = await Transaction.find()
  
       if(!users){
        return res.status(404).json({message: "User account not found"})
    }

    return res.status(200).json({message: "successful", users})
}

module.exports = {
    handleUserRegistration,
    handleUserLogin,
    handleForgetPassword,
    handleResetPassword,
    fundsTransfer,
    fundingAccount,
    handleUserWallet,
    handleUserTransaction
    
}

const express = require("express")

const mongoose = require("mongoose")

const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")
const User = require("./models/userModel")
const Wallet = require("./models/walletModel")
const Transaction = require("./models/transactionModel")
const validateToken = require("./middleWares/token_validation")

const dotenv = require("dotenv").config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 5800


mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("MongoDB connected successfully...")

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
})



app.get("/", (req, res)=>{
 
    try {
        return res.status(200).json({message: "Welcome to Fintech Digital Wallet System (payFlow)"})
       
    } catch (error) {
         return res.status(500).json({message: error.message})
    }
})



// User registration


app.post("/sign-up", async (req, res)=>{

    try {
        
    const { name, email, password, walletBalance } = req.body

    if(!name){
        return res.status(400).json({message: "Enter your name"})
    }

    if(!email){
        return res.status(400).json({message: "Enter your email"})
    }

    if(!password){
        return res.status(400).json({message: "Enter your password"})
    }

      if(password.length  < 8 ){
        return res.status(400).json({message: " Password require minimum of 8 characters"})
    }

    const existingUser = await User.findOne({ email })

    if(existingUser){
        return res.status(400).json({message: "User account already exist. login"})
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
            walletBalance})
            
            await wallet.save()

        return res.status(201).json({message: "Registration successfull",
            newUser:{ name, email },
            wallet
        })
        

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})


// Login

app.post("/login", async (req, res)=>{

    try {
  
        const { email, password } = req.body

        if(!email){
            return res.status(400).json({message: "Enter your email "})
        }

        if(!password){
            return res.status(400).json({message: "Enter your password "})
        }

        const user = await User.findOne({ email })

        if(!user){
            return res.status(404).json({message: "User account not found "})
        }

        const ismatch = await bcrypt.compare(password, user?.password)

        if(!ismatch){
            return res.status(400).json({message: "Incorrect password or email"})
        }

        const accessToken = jwt.sign({user_id: user?._id, email: user?.email, name: user?.name}, process.env.ACCESS_TOKEN, {expiresIn: "5m"})

        const refreshToken = jwt.sign({user_id: user?._id, email: user?.email, name: user?.name}, process.env.REFRESH_TOKEN, {expiresIn: "30d"})


         

        return res.status(201).json({message: "Login successfull",
          user: { email, password },
          accessToken
        },

        refreshToken
    )

    } catch (error) {
         return res.status(500).json({message: error.message})
    }
    
})

app.post("/token-auth", validateToken, async (req, res)=>{

})



 

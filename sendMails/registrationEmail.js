

const nodemailer = require("nodemailer")

const registrationEmail = async (name, email, password, walletBalance )=>{

    const mailTranspot = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: `${process.env.EMAIL}`,
            pass: `${process.env.EMAIL_PASSWORD}`
        }
    })

    const emailDetails = {
        from: `${process.env.EMAIL}`,
        to: `${email}`,
        subject: "Registration Successful",
        html: `<h1>Welcome to Fintech Digital Wallet System</h1>`


    }

    await mailTranspot.sendMail(emailDetails)
}

module.exports = registrationEmail


const nodemailer = require("nodemailer")

const registrationEmail = async (name, email, password)=>{

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


const validEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }



module.exports  = {
    registrationEmail,
    validEmail
}


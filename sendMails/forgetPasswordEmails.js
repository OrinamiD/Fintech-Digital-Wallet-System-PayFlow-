



const nodemailer = require("nodemailer")

const sendForgetPasswordEmail = async ( email, token) =>{

    try {
        
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
        subject: "Forget password Notification",
         html: `
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="padding: 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                  <tr>
                    <td align="center" bgcolor="#007BFF" style="padding: 20px 0; color: #ffffff; font-size: 24px;">
                      Welcome to Fintech Digital Wallet
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 30px; color: #333333;">
                      <h2 style="margin-top: 0;">Hello,</h2>
                      <p>You requested to reset your password. Click the button below to proceed:</p>
                      <p style="text-align: center; margin: 30px 0;">
                        <a href="https://fintechdigitalsystem.com/reset-password/${token}" 
                           style="background-color: #007BFF; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 4px;">
                          Reset Password
                        </a>
                      </p>
                      <p>If you didn't request a password reset, please ignore this email.</p>
                      <p>Best regards,<br>Fintech Digital Wallet System Team</p>
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#f4f4f4" style="padding: 20px; text-align: center; font-size: 12px; color: #888888;">
                      © 2025 Fintech Groups. All rights reserved.
                      <br>
                      <a href="https://fintechsystem.com/unsubscribe" style="color: #888888; text-decoration: underline;">Unsubscribe</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      `
    }

    await mailTranspot.sendMail(emailDetails)
   
    return res.status(200).json({message: "successful", emailDetails})

  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}


const validEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

module.exports = {
  sendForgetPasswordEmail,
  validEmail
}

import nodemailer from "nodemailer";

async function sendEmail(email:string, subject:string, message:string) {

    console.log(email)
    console.log(subject)
    console.log(message)
    
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'dharmik6076@gmail.com',
            pass: 'dkcwymhfoejpupio'
        }
    });

    // Setup email data
    let mailOptions = {
        from: { name: 'BurgerByte', address:"dharmik6076@gmail.com"},
        to: email,
        subject: subject,
        text: message,
    };

    // Send mail with defined transport object
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Message sent", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

// generateOTP function
function generateOTP() {
    const OTP_LENGTH = 6;
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
}



//sendEmailForgotpassword

async function sendEmailForgotpassword(email: string, subject: string, message: string, otp: string) {
    console.log(email);
    console.log(subject);
    console.log(message);

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'dharmik6076@gmail.com',
            pass: 'dkcwymhfoejpupio'
        }
    });

    const resetPasswordLink = `http://localhost:3000/forgotpassword?otp=${otp}&email=${email}`;
    console.log(resetPasswordLink)

    const emailMessage = `${message}\n\nClick <a href="${resetPasswordLink}">here</a> to reset your password.`;

    let mailOptions = {
        from: { name: 'BurgerByte', address: "dharmik6076@gmail.com" },
        to: email,
        subject: subject,
        html: emailMessage, 
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Message sent", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}


export { sendEmail, generateOTP, sendEmailForgotpassword };


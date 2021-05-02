const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "icloud",
    auth: {
        user: "pawson1988@me.com",
        pass: process.env.NODEMAILER_PASSWORD
    }
});

module.exports = transporter;




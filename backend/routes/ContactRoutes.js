const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const {
    GMAIL_LOGIN,
    GMAIL_PASS,
    TEST_MAIL,
} = require("../config/hiddenConfig");

router.post("/sendEmail", (req, res) => {
    const { firstname, lastname, email, message, check } = req.body;

    const messageBody = `
    ${firstname} ${lastname}
    ${message}
    `;
    const mailOptions = {
        from: email,
        to: TEST_MAIL,
        subject: `Kontakt`,
        text: messageBody,
    };

    console.log(mailOptions);

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: GMAIL_LOGIN,
            pass: GMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    try {
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.warn(err);
                throw new Error(err.message);
            } else {
                res.sendStatus(200);
            }
        });
    } catch (error) {
        console.warn(err);
        res.status(err.status).json({
            message: err.message,
        });
    }
});

module.exports = router;

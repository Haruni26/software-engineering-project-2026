/*
    This is the server side code for the OTP verification system.
    It uses Nodemailer to send OTP and confirmation emails to users.
    The server listens on port 3069 and has the following endpoints:
    1. POST /send-otp - Sends an OTP to the user's email address
    2. POST /send-confirmation - Sends a confirmation email to the user
    3. POST /verify-otp - Verifies the OTP entered by the user
    The server uses a simple in-memory store to store OTPs temporarily.
    This code should be run on a server to work properly.
    To run the server, execute the command: node server.js
    
    Author: Mohammad Zaid Khan
 */
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let otpStore = {};


// Email configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'saintmargaretsbayarea@gmail.com',
        pass: 'mjxqziowlnnywqwb',
    },
});


const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Endpoint to send OTP
app.post('/send-otp', (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const otp = generateOtp();
    otpStore[email] = otp;

    const mailOptions = {
        from: 'saintmargaretsbayarea@gmail.com',
        to: email,
        subject: 'Your OTP for Verification',
        text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Failed to send email:', err);
            return res.status(500).json({ error: 'Failed to send OTP. Please try again.' });
        }
        console.log('OTP sent successfully:', info.response);
        res.status(200).json({ message: 'OTP sent successfully' });
    });
});

// Endpoint to send confirmation email
app.post('/send-confirmation', (req, res) => {
    const { email, fullName, inquiryType, message } = req.body;

    if (!email || !fullName || !inquiryType || !message) {
        return res.status(400).json({ error: 'All fields are required to send confirmation email' });
    }

    const mailOptions = {
        from: 'saintmargaretsbayarea@gmail.com',
        to: email,
        subject: 'Confirmation of Your Inquiry',
        text: `Hello ${fullName},\n\nThank you for reaching out to us with your inquiry. Here are the details:\n\n` +
            `Inquiry Type: ${inquiryType}\nMessage: ${message}\n\nWe will get back to you as soon as possible.\n\n` +
            `Best regards,\nThe Support Team`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Failed to send confirmation email:', err);
            return res.status(500).json({ error: 'Failed to send confirmation email' });
        }
        console.log('Confirmation email sent:', info.response);
        res.status(200).json({ message: 'Confirmation email sent successfully' });
    });
});

// Endpoint to verify OTP
app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ error: 'Email and OTP are required' });
    }

    if (otpStore[email] === otp) {
        delete otpStore[email];
        return res.status(200).json({ message: 'OTP verified successfully' });
    }

    res.status(400).json({ error: 'Invalid or expired OTP' });
});


app.listen(3069, () => {
    console.log('Server running on http://localhost:3069');
});

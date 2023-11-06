const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000; // Choose your desired port

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve your HTML form

// Handle form submissions
app.post('/submit', (req, res) => {
  const { Full_Name, Email, Phone_number, Message, Category } = req.body;

  // Configure nodemailer to send an email
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail', 'Yahoo', etc.
    auth: {
      user: 'mohangowdajns99@gmail.com', // Replace with your email
      pass: 'Mohan@369000',   // Replace with your email password
    },
  });

  const mailOptions = {
    from: 'contact@example.com', // Shared email account
    to: 'admin@example.com',     // Admin's email
    subject: 'New contact form submission',
    text: `Full Name: ${Full_Name}\nEmail: ${Email}\nPhone Number: ${Phone_number}\nMessage:\n${Message}\nCategory: ${Category}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Error sending the email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Thank you for your submission!');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

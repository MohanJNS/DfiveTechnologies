const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to enable CORS and parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Add CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace '*' with the specific origin you want to allow (e.g., http://localhost:your-port)
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Define the route to handle form submissions
app.post('/submit-form', (req, res) => {
  const { Full_Name, Email, Phone_number, Message } = req.body;

  // Create a transporter for sending emails (using a Gmail account in this example)
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'mohangowdajns99@gmail.com',
	   pass: 'vuyi jwdo myko zewc',
    },
  });

  // Email content
  const mailOptions = {
    from: 'Email',
    to: 'mohangowdajns99@gmail.com', // Your email address
    subject: 'New contact form submission',
    text: `Full Name: ${Full_Name}\nEmail: ${Email}\nPhone Number: ${Phone_number}\nMessage:\n${Message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending the email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Thank you for your submission!');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});





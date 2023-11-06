const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Configure MySQL database connection
const db = mysql.createConnection({
  host: 'localhost', // Replace with your database host
  user: 'root', // Replace with your database user
  password: 'system', // Replace with your database password
  database: 'registerform', // Replace with your database name
  port: '3308', // Replace with your database port
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as ID ' + db.threadId);
});

// Middleware to parse JSON data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., HTML, CSS)
app.use(express.static('public'));

app.get('/contact.html', (req, res) => {
  res.sendFile(__dirname + '/public/contact.html');
});

// Handle POST requests from the form
app.post('/submit-form', (req, res) => {
  const jsonData = req.body;
  const fullName = jsonData.Full_Name;
  const email = jsonData.Email;
  const phoneNumber = jsonData.Phone_number;
  const message = jsonData.Message;

  const sql =
    'INSERT INTO customer (Full_Name, Email, Phone_number, Message) VALUES (?, ?, ?, ?)';

  db.query(sql, [fullName, email, phoneNumber, message], (err, result) => {
    if (err) {
      console.error('Error inserting data into the database: ' + err);
      res.send('Form submission failed.');
    } else {
         console.log('Form data inserted into the database.');
      // Send a response and then redirect to another page
	 res.redirect('/contact.html');

      
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('SIGINT', () => {
  db.end();
  process.exit();
});

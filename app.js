const express = require('express');
const PORT = 8000;

const app = express();

app.use(express.json());

// serving public file
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

 ///// routes
const employeeRoutes = require('./routes/Employees');
const donorRoutes = require('./routes/Donors')

app.use('/employees', employeeRoutes);
app.use('/donors', donorRoutes);


app.get('/', (req, res) => {
   // res.sendFile('public/welcome-page.html', {root:__dirname});
   res.render('welcome-page');
})

// employee signin
app.get('/employeeLoginPage', (req, res) => {
  //  res.send('<h1>Employees Signin</h1>')
    res.render('em-login');
})

// donors signin
app.get('/donorLoginPage', (req, res) => {
   // res.send('<h1>Donor Signin</h1>');
    res.render('donor-login');
})

app.get('/donorSignupPage' , (req, res) => {
    res.render('donor-signup');
})

app.get('/data-input', (req, res) => {
    res.render('data-input');
})

// run server
app.listen(PORT, function(error) {
    if (error)  console.log('Error:', error);
    else        console.log('Listening to port: ' + PORT);
})
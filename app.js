const express = require('express');
const PORT = 8000;

const app = express();

const path = require('path');
app.use(express.json());

// serving public file
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');



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

app.get('/data-input', (req, res) => {
    res.render('data-input');
})

// run server
app.listen(PORT, function(error) {
    if (error)  console.log('Error:', error);
    else        console.log('Listening to port: ' + PORT);
})
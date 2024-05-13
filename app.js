const express = require('express');

const cookieParser = require('cookie-parser');
const sessions = require('express-session');

const app = express();
const PORT = 8000;

app.use(express.json());


// serving public file
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

// creating 24 hrs from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

// sessions
app.use(sessions({
    secret: 'thisismysecretkey123',
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false
}));

var session = null;     // session

// cookie parser middleware
app.use(cookieParser());

////// routes
const employeeRoutes = require('./routes/Employees');
const donorRoutes = require('./routes/Donors')
const transactionRoutes = require('./routes/Transactions');

app.use('/employees', employeeRoutes);
app.use('/donors', donorRoutes);
app.use('/transactions', transactionRoutes);


// Home (default page)
app.get('/', (req, res) => {

    session = req.session;
    console.log(session.userid);

    if (session.status == 'employee') {
        res.redirect('/employees/homepage');
    }
    else if (session.status == 'donor'){
        res.redirect('/donors/homepage');
    }
    else {
        res.render('welcome-page');
    }
    
})

// send session details to the backend
app.post('/session', (req, res) => {
    session = req.body.session;
})


app.get('/data-input', (req, res) => {
    res.render('data-input');
})

// run server
app.listen(PORT, function(error) {
    if (error)  console.log('Error:', error);
    else        console.log('Listening to port: ' + PORT);
})
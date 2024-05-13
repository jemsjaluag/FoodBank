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

// middleware to prevent browser caching
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
})

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

app.get('/terms', (req, res) => {
    res.render('terms');
})

// send session details to the backend
app.post('/session', (req, res) => {
    session = req.body.session;
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})



// run server
app.listen(PORT, function(error) {
    if (error)  console.log('Error:', error);
    else        console.log('Listening to port: ' + PORT);
})
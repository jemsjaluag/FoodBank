const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Database = require('../dbController');
const database = new Database();

var session = null;

// login page
router.get('/login', (req, res) => {
    res.render('em-login');
})


// login employees
router.post('/login', async (req, res) => {
    const credentials = req.body;
    const email = credentials.email;
    const password = credentials.password;
    const empid = credentials.employeeid;

    // find email first
    const user = await database.Employee_findUser(email, empid);

    // if user's email is not in db
    if (!user.detected) {
        console.log(`Email ${credentials.email} not found!`);
        res.status(404).send('User not found!');
        return;
    }
    // if username exists
    else {
        // get hashed password and ID
        console.log(`Email ${credentials.email} found!`);
        const creds = await database.Employee_select(email, empid);
        const hashedPassword = creds.password;

        console.log(`Password: ${password} Hashed: ${hashedPassword}`);

        // compare/check encrypted password
        if (await bcrypt.compare(password, hashedPassword)) {
            
            // save session
            session = req.session;
            session.id = creds.id;
            session.employeeid = creds.employeeid;
            session.first = creds.first;
            session.status = 'employee';        // differentiate between employees and donors
            console.log(req.session);
            

           res.status(300).send();
           // no redirect
           // res.redirect('/bank');
        }
        else {
            console.log('Invalid password');
            res.status(403).send('Invalid password');
            return;
        }
    }
})

router.get('/signup', (req, res) => {
    res.render('em-signup');
})

// signup 
router.post('/signup', async (req, res) => {

    const credentials = req.body; 
    const email = credentials.email;
    const password = credentials.password;
    const empId = credentials.employeeId;

    // check email first
    const result = await database.Employee_findUser(email, empId);

    if (result.detected){
        console.log('User detected in db');
        res.status(404).send('User already exists');
    }
    else {
        console.log('User not in db');

        // encrypt password before storing to db

        console.log(`${credentials.email} ${credentials.password} ${credentials.employeeId}`);


        
        bcrypt.hash(password, 10)
            .then((hash) => {
                database.Employee_insert({  empFirst: credentials.firstName,
                                        empLast: credentials.lastName,
                                        empPass: hash,
                                        empEmail: credentials.email,
                                        empId: empId  });
            }).catch((error) => {
                console.log('Could not store credentials', error);
                res.status(404).send();
                return;
            });
            

        // send OK status
        res.status(300).send();
    }

})

router.get('/homepage', (req, res) => {
    res.render('emp-homepage', {session: req.session});
})

router

module.exports = router;
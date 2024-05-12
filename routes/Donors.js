const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const path = require('path');
const Database = require('../dbController');

//const Database = require('./dbController');

const database = new Database();

router.get('/login', (req, res) => {
    res.render('donor-login');
})

router.post('/login', async (req, res) => {
    const credentials = req.body;
    const password = credentials.password;

    // find email first
    const user = await database.User_findUser(credentials.email);

    if (!user.detected) {
        console.log(`Email ${credentials.email} not found!`);
        res.status(404).send('User not found!');
        return;
    }
    // if username exists
    else {
        // get hashed password and ID
        console.log(`Email ${credentials.email} found!`);
        const creds = await database.User_select(credentials.email);
        const hashedPassword = creds.password;

        console.log(`Password: ${password} Hashed: ${hashedPassword}`);

        // compare/check encrypted password
        if (await bcrypt.compare(password, hashedPassword)) {
            
            // [FOR LATER]
            // save session
            /*
            session = req.session;
            session.userid = creds.userid;
            session.username = creds.username;
            session.savings = accountSavings;
            console.log(req.session);
            */

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

// get signup page
router.get('/signup', (req, res) => {
    res.render('donor-signup');
})

// signup 
router.post('/signup', async (req, res) => {

    const credentials = req.body; 
    const email = credentials.email;
    const password = credentials.password;
    const donorId = credentials.donorId;

    // check email first
    const result = await database.User_findUser(email, donorId);

    if (result.detected){
        console.log('User detected in db');
        res.status(404).send('User already exists');
    }
    else {
        console.log('User not in db');

        // encrypt password before storing to db
        bcrypt.hash(password, 10)
            .then((hash) => {
                database.User_insert({  donFirst: credentials.firstName,
                                        donLast: credentials.lastName,
                                        donPass: hash,
                                        donEmail: credentials.email,
                                        donId: credentials.donorId  });
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
    res.render('homepage');
})

module.exports = router;
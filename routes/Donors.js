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

// get signup page
router.get('/signup', (req, res) => {
    res.render('donor-signup');
})

// signup 
router.post('/signup', async (req, res) => {

    const credentials = req.body; 
    const email = credentials.email;
    const password = credentials.password;

    // check email first
    const result = await database.User_findUser(email);

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

module.exports = router;
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


// login donors
router.post('/login', async (req, res) => {
    const credentials = req.body;
    const password = credentials.password;
    const email = credentials.email;
    const donorid = credentials.donorid;

    // find email first
    const user = await database.User_findUser(email, donorid);

    if (!user.detected) {
        console.log(`Email ${credentials.email} not found!`);
        res.status(404).send('User not found!');
        return;
    }
    // if username exists
    else {
        // get hashed password and ID
        console.log(`Email ${credentials.email} found!`);
        const creds = await database.User_select(email, donorid);
        const hashedPassword = creds.password;

        console.log(`Password: ${password} Hashed: ${hashedPassword}`);

        // compare/check encrypted password
        if (await bcrypt.compare(password, hashedPassword)) {
            
            // save session
            session = req.session;
            session.userid = creds.id;
            session.first = creds.first;
            session.status = 'donor';
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
    res.render('donor-homepage', {session: req.session});
})

router.get('/data-input', (req, res) => {
    res.render('data-input');
})

router.get('/getAll', async (req, res) => {
    const result = await database.User_getAll();
    console.log(result);

    res.json(result);
})

module.exports = router;
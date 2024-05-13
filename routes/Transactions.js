const express = require('express');
const router = express.Router();

const Database = require('../dbController');
const database = new Database();

var session = null;


// insert a transaction.
// taken from the inputs of the donor from frontend.
router.post('/insert', async (req, res) => {

    transaction = req.body;
    session = req.session;

                                                // session.id is the id of the logged in user.
                                                // taken from database's id column.
    const result = await database.Transaction_insert(transaction, session.userid)
                .then(() => {
                    console.log('Transaction successful');
                });
})


// get all the transactions done by the donor.
router.get('/get-transactions', async (req, res) => {

    // only donors can access this route.
    if (!(req.session.status == 'donor') || req.session.status == undefined){
        res.redirect('/');
        return;
    }

    session = req.session;
    const result = await database.Transaction_get(session.userid);

    console.log(result);

    res.json(result);

})

// get everything
router.get('/getAll-transactions', async (req, res) => {

    // only employees can access this route.
    if (!(req.session.status == 'employee') || req.session.status == undefined){
        res.redirect('/');
        return;
    }

    session = req.session;
    const result = await database.Transaction_getAll();
    console.log(result);

    res.json(result);
})


module.exports = router;
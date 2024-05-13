const express = require('express');
const router = express.Router();

const Database = require('../dbController');
const database = new Database();

var session = null;

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

router.get('/get-transactions', async (req, res) => {
    session = req.session;
    const result = await database.Transaction_get(session.userid);

    console.log(result);

    res.json(result);

})


module.exports = router;
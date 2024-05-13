const express = require('express');
const router = express.Router();

const Database = require('../dbController');
const database = new Database();

var session = null;

router.post('/insert', async (req, res) => {
    transaction = req.body;
    session = req.session;

    const result = await database.Transaction_insert(transaction, session.userid);
})
const express = require('express');
const router = express.Router();

const Database = require('../dbController');
const database = new Database();


router.post('/insert', async (req, res) => {
    transaction = req.body;

    const result = await database.Transaction_insert(transaction);
})
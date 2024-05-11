const express = require('express');
const router = express.Router();


router.get('/login-page', (req, res) => {
    res.render('donor-login');
})

router.get('/signup-page', (req, res) => {
    res.render('donor-signup');
})

module.exports = router;
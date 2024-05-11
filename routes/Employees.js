const express = require('express');
const router = express.Router();


router.get('/login-page', (req, res) => {
    res.render('em-login');
})

router.get('/signup-page', (req, res) => {
    res.render('em-signup');
})

module.exports = router;
const express = require('express');
const { submitContactForm } = require('../controllers/GetInTouchController');
const router = express.Router();


router.post('/', submitContactForm); 

module.exports = router;

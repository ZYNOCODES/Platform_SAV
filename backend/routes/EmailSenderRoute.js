const express = require('express');
const {
    SendEmail
} = require('../controllers/EmailSenderController');
const router = express.Router();

router.post('/', SendEmail);

module.exports = router;
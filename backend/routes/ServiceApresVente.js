const express = require('express');
const {
    GetSAV
} = require('../controllers/SAVController');

const router = express.Router();

router.get('/', GetSAV);

module.exports = router;
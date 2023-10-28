const express = require('express');
const {
    GetSAV
} = require('../controllers/SAVController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.get('/', GetSAV);

module.exports = router;
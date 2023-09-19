const express = require('express');
const {
    GetWillaya
} = require('../controllers/WilayaOfAlgeriaController');

const router = express.Router();

router.get('/', GetWillaya);

module.exports = router;
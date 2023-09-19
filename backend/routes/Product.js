const express = require('express');
const {
    GetProductReferance
} = require('../controllers/ProductController');

const router = express.Router();

router.get('/', GetProductReferance);

module.exports = router;
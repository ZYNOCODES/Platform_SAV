const express = require('express');
const {
    GetProductReferance
} = require('../controllers/ProductController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.get('/', GetProductReferance);

module.exports = router;
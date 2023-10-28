const express = require('express');
const {
    GetWillaya,
    GetCodePostal
} = require('../controllers/WilayaOfAlgeriaController');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

router.get('/', GetWillaya);
router.get('/:nom', GetCodePostal);

module.exports = router;
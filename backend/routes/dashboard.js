const express = require('express');
const {
    GetAll,
    GetAllByCentre
} = require('../controllers/DashboardController');
const router = express.Router();

router.get('/', GetAll);
router.get('/:centre', GetAllByCentre);

module.exports = router;

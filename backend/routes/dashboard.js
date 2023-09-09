const express = require('express');
const {
    GetAll,
    GetAllByCentre,
    GetByWeek,
    GetByMonth,
    GetByYear
} = require('../controllers/DashboardController');
const router = express.Router();

router.get('/', GetAll);
router.get('/:centre', GetAllByCentre);
router.get('/current/week', GetByWeek);
router.get('/current/month', GetByMonth);
router.get('/current/year', GetByYear);
module.exports = router;

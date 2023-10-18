const express = require('express');
const {
    PDFGenerator,
    PDFSender,
} = require('../controllers/PDFGeneratorController');

const router = express.Router();

router.get('/fetchPDF', PDFSender);
router.post('/createPDF/:BonDepot', PDFGenerator);

module.exports = router;
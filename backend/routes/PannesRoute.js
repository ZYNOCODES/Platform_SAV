const express = require('express');
const PanneController = require('../controllers/PannesController');

const router = express.Router();

router.get('/', PanneController.index);
router.get('/:id', PanneController.GetByID);
router.post('/SAV', PanneController.GetBySAV);
router.post('/', PanneController.Create);
router.put('/:id', PanneController.Update);
router.delete('/:id', PanneController.Remove);

module.exports = router;

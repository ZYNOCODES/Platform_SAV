const express = require('express');
const PanneController = require('../controllers/PannesController');

const router = express.Router();

router.get('/', PanneController.index);
router.get('/:id', PanneController.GetByID);
router.get('/All/:Ref/:id', PanneController.GetByRefProduct);
router.post('/', PanneController.Create);
router.put('/:id', PanneController.Update);
router.delete('/:id', PanneController.Remove);
router.patch('/:id', PanneController.Update);

module.exports = router;

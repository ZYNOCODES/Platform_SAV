const express = require('express');
const {
    index,
    GetByID,
    GetByRefProduct,
    Create,
    Update,
    Remove,
    UplaodIMG,
    upload
} = require('../controllers/PannesController');
const router = express.Router();


router.get('/', index);
router.get('/:id', GetByID);
router.get('/All/:Ref/:id', GetByRefProduct);
router.post('/', Create);
router.post('/IMG',upload, UplaodIMG);
router.put('/:id', Update);
router.delete('/:id', Remove);
router.patch('/:id', Update);

module.exports = router;

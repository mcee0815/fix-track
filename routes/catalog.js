var express = require('express');
const { body } = require('express-validator');
var router = express.Router();

// Controllers
const catalogCtrl = require('../controllers/catalogController');
const authMiddleware = require('../middleware/authMiddleware');

/* GET the catalog. */
router.get('/', catalogCtrl.catalog_list);

// filters
router.get('/lowstock',catalogCtrl.catalog_lowstock)
router.get('/outofstock',catalogCtrl.catalog_outofstock)
router.get('/discontinued',catalogCtrl.catalog_discontinued)

/* GET  create product form. */
router.get('/create',authMiddleware, catalogCtrl.create_item_get);

/* POST submit create product form . */
router.post('/create',[
    body('brand', 'Empty brand name').trim().isLength({ min: 2 }).escape(),
    body('details', 'provide details').trim().isLength({ min: 10 }).escape(),
    body('quantity', 'provide quantity').trim().isLength({ min: 1,max:10 }).escape(),
], catalogCtrl.create_item_post);

/* GET a catalog item detail. */
router.get('/:id', catalogCtrl.catalog_item_details);

/* GET edit a catalog item */
router.get('/edit/:id',catalogCtrl.edit_item_get)

/* POST edit a catalog item */
router.put('/edit/:id',catalogCtrl.edit_item_put)

// /*  delete item */
// router.delete('/delete/:id',catalogCtrl.delete_item)

router.delete('/delete/:id',catalogCtrl.delete_item)


module.exports = router;

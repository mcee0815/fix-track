var express = require('express');
const { body } = require('express-validator');
var router = express.Router();

const filtersCtrl = require('../controllers/filtersController');

router.get('/completed',filtersCtrl.filters_completed)
router.get('/open',filtersCtrl.filters_open)

module.exports = router

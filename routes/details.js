var express = require('express');
const { body } = require('express-validator');
var router = express.Router();

const detailsCtrl = require('../controllers/detailsController');

/* GET the paginated tasks. */
router.get('/:id',detailsCtrl.task_details);


module.exports = router

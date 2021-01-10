var express = require('express');
const { body } = require('express-validator');
const userCtrl =  require('../controllers/userController');
const redirectIfAuthenticated = require('../middleware/redirectIfAuthenticated');
var router = express.Router();

/* GET users listing. */
router.get('/', userCtrl.user_index);

/* GET create user form. */
router.get('/create',redirectIfAuthenticated, userCtrl.create_user_get);

/* POST create user (submit). */
router.post('/create',redirectIfAuthenticated,[
    body('username', 'Empty username').trim().isLength({ min: 2 }).escape(),
    body('password', 'provide password').trim().isLength({ min: 3 }).escape(),
], userCtrl.create_user_post);

/* GET user login. */
router.get('/login',redirectIfAuthenticated ,userCtrl.user_login_get);

/* POST user login. */
router.post('/login',[
    body('username', 'Empty username').trim().isLength({ min: 2 }).escape(),
    body('password', 'provide password').trim().isLength({ min: 3 }).escape(),
],redirectIfAuthenticated, userCtrl.user_login_post);

// Logout
router.get('/logout', userCtrl.user_logout_get);

/* GET a user. */
router.get('/:id', userCtrl.user_details);



module.exports = router;

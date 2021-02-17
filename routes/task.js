var express = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');

var router = express.Router();

const taskCtrl = require('../controllers/taskController');

/* GET the paginated tasks. */
// router.get('/:page',taskCtrl.paginated_task_list);

/* test page. */
router.get('/test', taskCtrl.test_page);

/* GET the tasks. */
router.get('/', taskCtrl.task_list);

// create task on GET
router.get('/create-task',authMiddleware,taskCtrl.task_create)

// create task on POST
router.post('/create-task',[
    body('title', 'Empty repair title').trim().isLength({ max: 15 }).escape(),
    body('details', 'provide details').trim().isLength({ max: 50 }).escape(),
    body('location', 'location').trim().isLength({ min: 1,max:30 }).escape(),
    body('reportedBy', 'reported by whom').trim().isLength({ min: 3 }).escape(),
    // body('maintainer', 'Empty repair maintainer').trim().isLength({ min: 2 }).escape(),
],authMiddleware,taskCtrl.task_create_post)

// task details page GET
router.get('details/:id',taskCtrl.task_details)

// edit task on GET
// router.get('/edit-task/:id',authMiddleware,taskCtrl.task_edit_get)

// edit task on PUT
// router.put('/edit-task/:id',taskCtrl.task_edit_put)


// edit task status on GET
router.get('/edit-task-status/:id',authMiddleware,taskCtrl.task_edit_status_get)

// edit task status on PUT
router.put('/edit-task-status/:id',taskCtrl.task_edit_status_put)

// delete a task
router.delete('/delete-task/:id', taskCtrl.task_delete)

module.exports = router
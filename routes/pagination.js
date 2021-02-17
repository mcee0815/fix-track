var express = require('express');
const { body } = require('express-validator');
var router = express.Router();

// const taskCtrl = require('../controllers/taskController');
paginationCtrl = require('../controllers/pagination_Controller');
/* GET the paginated tasks. */
// router.get('/:page',taskCtrl.paginated_task_list);

router.get('/:page',paginationCtrl.paginated_task_list);

// /* GET the tasks. */
// router.get('/', taskCtrl.task_list);

// // create task on GET
// router.get('/create-task',taskCtrl.task_create)

// // create task on POST
// router.post('/create-task',taskCtrl.task_create_post)

// // task details page GET
// router.get('details/:id',taskCtrl.task_details)

// // edit task on GET
// router.get('/edit-task/:id',taskCtrl.task_edit_get)

// // edit task on PUT
// router.put('/edit-task/:id',taskCtrl.task_edit_put)


// // edit task status on GET
// router.get('/edit-task-status/:id',taskCtrl.task_edit_status_get)

// // edit task status on PUT
// router.put('/edit-task-status/:id',taskCtrl.task_edit_status_put)


// // delete a task
// router.delete('/delete-task/:id', taskCtrl.task_delete)


module.exports = router
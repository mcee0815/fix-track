const Task = require('../models/task');
const User = require('../models/user');
const moment = require('moment')



// Display details for a task.
exports.task_details = function(req, res) {
    Task.findById(req.params.id,(err,task) => {
        if (err) {
            console.log(err)
        }
        res.render('task-details',{task,moment,})
    })
};
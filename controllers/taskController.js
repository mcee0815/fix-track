// const mongoose = require('mongoose');
const Task = require('../models/task');
const User = require('../models/user');
const {validationResult } = require('express-validator');
const moment = require('moment')

exports.paginated_task_list = (req, res, next) => {
    var perPage = 3
    var page = Number(req.params.page) || 1
    Task
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, tasks) {
            Task.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('paginated', {
                    tasks: tasks,
                    moment:moment,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
}

// Display test page.
exports.test_page =  (req, res) => {
    res.render('home-full')    
};

// Display the Tasks.
exports.task_list = async (req, res) => {

    let tasks = await Task.find({})
    res.render('task-index',{tasks,moment})
    
};

// Display details for a task.
exports.task_details = function(req, res) {
    Task.findById(req.params.id,(err,task) => {
        if (err) {
            console.log(err)
        }
        res.render('task-details',{task,moment,})
    })
};
// create a task on GET
exports.task_create = (req, res) => {
    res.render('create-task')
};

// create a task on POST
exports.task_create_post = async(req,res) => {
    // validation errors in this request and wraps them in an object
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return  res.render('create-task',{myerrors:errors.array()})
  }
    //console.log(req.body)
    // create task and redirect to tasks index page
    await Task.create({
        ...req.body,
            completed:req.body.completed
    })
        res.redirect('/tasks/')
}

// edit a task status on GET
exports.task_edit_status_get = async (req,res) => {
    let task = await Task.findOne({_id:req.params.id})
    
    res.render('edit-task-status',{
        task:task
})
}

// edit a task status on PUT
exports.task_edit_status_put = async (req,res) => {
    
    // find item by id
    let task = await Task.findOne({_id:req.params.id})
        
    // edited values
        task.completed = req.body.completed;
        task.completedOn = req.body.completedOn;
        task.maintainer = req.body.maintainer;
         
    // save to mongodb
        await task.save()
        res.redirect('/tasks')
}

// edit a task on GET
exports.task_edit_get = async (req,res) => {
    let task = await Task.findOne({_id:req.params.id})
    
    res.render('edit-task',{
        task:task
})
}
// edit a task on PUT
exports.task_edit_put = async (req,res) => {
    // find item by id
    let task = await Task.findOne({_id:req.params.id})
        
    // edited values
        task.title = req.body.title;
        task.details = req.body.details;
        task.maintainer = req.body.maintainer;
        
    // save to mongodb
        await task.save()
        res.redirect('/tasks')
}

// delete a task on DELETE
exports.task_delete = async (req,res) => {
    await Task.remove({_id: req.params.id})
    res.redirect('/tasks')
}

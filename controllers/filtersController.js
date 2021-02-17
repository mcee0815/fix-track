const Task = require('../models/task');
const User = require('../models/user');
const moment = require('moment')




exports.filters_completed = async(req,res) => {
    const completed = await Task.find({completed:true})
    res.render('completed-tasks',{completed,moment})
    // res.send(completed)
}

exports.filters_open = async(req,res) => {
    const openTasks = await Task.find({completed:null})
    res.render('open-tasks',{openTasks,moment})
    // res.send(openTasks)
}

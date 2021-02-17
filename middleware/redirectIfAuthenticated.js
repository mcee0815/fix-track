
// prevents the user from attempting to login or registering more than once.
const User = require('../models/user')
 module.exports = (req,res,next) => {
     if (req.session.userId) {
         return res.redirect('/tasks')
     }
     next()
 }
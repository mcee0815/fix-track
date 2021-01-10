const User = require('../models/user')
 module.exports = (req,res,next) => {
     if (req.session.userId) {
         return res.redirect('/')
     }
     next()
 }
const User = require('../models/user')
 
module.exports = (req,res,next) => {
     User.findById(req.session.userId,(err,user) => {
        if (err || !user) {
            return res.send('not authorized!')
        }
        next()
     })
 }
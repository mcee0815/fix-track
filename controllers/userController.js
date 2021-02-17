var User = require('../models/user');
const bcrypt = require('bcrypt')
const {validationResult } = require('express-validator');
const { dirname } = require('path');

// Display users.
exports.user_index = function(req, res) {
    res.send('NOT IMPLEMENTED: list of users');
};

// Display details for a user.
exports.user_details = function(req, res) {
    res.send('NOT IMPLEMENTED: single user details: ' + req.params.id);
};

// Display user create form on GET.
exports.create_user_get = function(req, res) {
    res.render('register');
};

//  user create on POST.
exports.create_user_post = async (req, res) => {

    // validation errors in this request and wraps them in an object
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // if any of the set validation errors are found
       res.render('register',{myerrors:errors.array()})
    }
   // is the username already used?
   const user = await User.findOne({username:req.body.username})
   let usernameTakenMsg = ''
    if (user) {
        usernameTakenMsg = 'username is already taken!' 
        // res.render('register')
        // res.send('ohohohohoh')
        res.render('register',{usernameTakenMsg})
    }
  // create user and redirect to catalog page
      await User.create({
          ...req.body,
      })
          res.render('home')
};

// Login user on get.
exports.user_login_get = function(req, res) {
    res.render('login')
};

// Login user on post.
exports.user_login_post = async (req, res) => {
    const{username,password} = req.body

    // check for no blank input fields
    if (!username || !password){
        res.render('login',{fieldsEmpty:'a username and password is required'})
    }
    let userFound = await User.findOne({username:username})
    if(!userFound){
        // user is not registered
        res.render('login',{registerError:'Account not found. Please register'})
    }
    if (userFound) {
        bcrypt.compare(password,userFound.password,(err,match)=> {
            if (match) {
                // password did match
                req.session.userId = userFound._id 
                res.redirect('/tasks')
            }   
                // password did not match
                res.render('login',{myError:'Incorrect Password'})
        })
     } 
};

// Logout user on post.
exports.user_logout_get = function(req, res) {
    req.session.destroy(() => {
        res.redirect('/')
    })
    
};

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
       res.render('register',{myerrors:errors.array()})
    }
   // does the user already exist?
   const user = await User.findOne({username:req.body.username})
    if (user) {
        usernameTaken = 'user already taken!' 
        res.render('register',{usernameTaken})
    }
    
  // create user and redirect to catalog page
      await User.create({
          ...req.body,
      })
          res.redirect('/catalog')
};

// Login user on get.
exports.user_login_get = function(req, res) {
    res.render('login')
};

// Login user on post.
exports.user_login_post = async (req, res) => {
    // destructure req.body
    const{username,password} = req.body
    
    if (!username || !password){
        res.render('login',{fieldsEmpty:'a username and password is required'})
    }
    
    let userFound = await User.findOne({username:username})

    if (userFound) {
        bcrypt.compare(password,userFound.password,(err,match)=> {
            if (match) {
            //password did match
                req.session.userId = userFound._id 
                res.redirect('/catalog')
            }   
            // password did not match
                res.render('login',{myError:'wrong password'})
        })
    } else if(!userFound){
        // user is not registered
        res.render('register',{registerError:'you do not have an account.please register'})
    }
    
    // does the user exist? if so compare the passwords entered.
    // User.findOne({username:username},(err,userFound)=>{
    //     if (userFound) {
    //         bcrypt.compare(password,userFound.password,(err,match)=> {
    //             if (match) {
    //                 req.session.userId = userFound._id 
    //                 res.redirect('/catalog')
    //             }   
    //             // password did not match
    //                 res.render('login',{myError:'wrong password'})
    //         })
    //     } else {
    //         // check for empty fields
    //         if (!username || !password) {
    //             res.render('login',{fieldsEmpty:'a username and password is required'})                // res.send('missing fields!')
    //         }
    //     }
    // })
};

// Logout user on post.
exports.user_logout_get = function(req, res) {
    req.session.destroy(() => {
        res.redirect('/')
    })
    
};


// const found = await User.findOne({username:username})

// if (found) {
//     bcrypt.compare(password,found.password,(err,match)=> {
//         if (match) {
//         //password did match
//             req.session.userId = userFound._id 
//             res.redirect('/catalog')
//         }   
//         // password did not match
//             res.render('login',{myError:'wrong password'})
//     })
// } else if(!found){
//     res.send('no user found')
// }

// check for empty fields
// if (!username || !password) {
//     res.render('login',{fieldsEmpty:'a username and password is required'})                // res.send('missing fields!')
// }
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {type: String,required:true,unique:true},
    password: {type: String,required:true},
  }
);

UserSchema.pre('save',function(next) {
  const user = this

  bcrypt.hash(user.password,10,function(error,hash) {
    
    user.password = hash
    next()
  })
})

//Export model
module.exports = mongoose.model('User', UserSchema);
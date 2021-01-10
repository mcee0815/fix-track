const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    brand: {type: String,required:true},
    quantity: {type: Number,required:true},
    details: {type: String,required:true},
    discontinue:{type:Boolean},
    outOfStock:{type:Boolean},
    lowStock:{type:Boolean},

  }
);

//Export model
module.exports = mongoose.model('Product', ProductSchema);
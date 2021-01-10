const Product = require('../models/product');
const User = require('../models/user');

const { dirname } = require('path');
const {validationResult } = require('express-validator');

// Display the catalog.
exports.catalog_list = async (req, res) => {
    //res.send('NOT IMPLEMENTED: catalog list');
    const products = await Product.find({})
    res.render('index',{products})
};
exports.catalog_lowstock = async(req,res) => {
    //res.send('low stock filter')
    const lowStock = await Product.find({lowStock:true})
    res.render('lowStock',{lowStock})
}
exports.catalog_outofstock = async(req,res) => {
    //res.send('low stock filter')
    const outOfStock = await Product.find({outOfStock:true})
    res.render('outOfStock',{outOfStock})
}
exports.catalog_discontinued = async(req,res) => {
    //res.send('low stock filter')
    const discontinued = await Product.find({discontinue:true})
    res.render('discontinued',{discontinued})
}

// Display details for a catalog item.
exports.catalog_item_details = function(req, res) {
    //res.send('NOT IMPLEMENTED: single product details: ' + req.params.id);
    Product.findById(req.params.id,(err,item) => {
        if (err) {
            console.log(err)
        }
        res.render('details',{
            item:item
        })
    })
};

// Display item create form on GET.
exports.create_item_get = function(req, res) {
    // if (!req.session.userId) {
    //     res.send('Not Authorized!')
    // }
    res.render('create')
      
};

//  item create on POST.
exports.create_item_post = async (req, res) => {
// validation errors in this request and wraps them in an object
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
     res.render('create',{myerrors:errors.array()})
  }
// create product and redirect to catalog page
    await Product.create({
        ...req.body,
    })
        res.redirect('/catalog')
};

exports.edit_item_get = async (req,res) => {
    let item = await Product.findOne({_id:req.params.id})
    res.render('edit-item',{
        item:item
    })
}
exports.edit_item_put = async (req,res) => {
    // find item by id
    let item = await Product.findOne({_id:req.params.id})
        
    // edited values
        item.brand = req.body.brand;
        item.details = req.body.details;
        item.quantity = req.body.quantity;
        item.discontinue = req.body.discontinue;
        item.outOfStock = req.body.outOfStock;
        item.lowStock = req.body.lowStock;

    // save to mongodb
        await item.save()
        res.redirect('/catalog')
}
exports.delete_item = async (req,res) => {
    await Product.remove({_id: req.params.id})
    res.redirect('/catalog')
    // res.send('you had a wrong type attribute')
}

















// // Handle Author create on POST.
// exports.author_create_post = function(req, res) {
//     res.send('NOT IMPLEMENTED: Author create POST');
// };

// // Display Author delete form on GET.
// exports.author_delete_get = function(req, res) {
//     res.send('NOT IMPLEMENTED: Author delete GET');
// };

// // Handle Author delete on POST.
// exports.author_delete_post = function(req, res) {
//     res.send('NOT IMPLEMENTED: Author delete POST');
// };

// Display Author update form on GET.
// exports.author_update_get = function(req, res) {
//     res.send('NOT IMPLEMENTED: Author update GET');
// };

// Handle Author update on POST.
// exports.author_update_post = function(req, res) {
//     res.send('NOT IMPLEMENTED: Author update POST');
// };
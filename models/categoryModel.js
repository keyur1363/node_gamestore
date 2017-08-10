'use strict';

var mongoose = require('mongoose');

var categoryModel = function () {
    var categorySchema = mongoose.Schema({
        name: String,
       
    });



    return mongoose.model('category', categorySchema);
};

module.exports = new categoryModel();
'use strict';

var mongoose = require('mongoose');

var gameModel = function () {
    var gameSchema = mongoose.Schema({
        title: String,
        category: String,
        developer: String,
        description: String,
        platform: String,
        price: Number,
        cover: String
    });

  
   
    return mongoose.model('game', gameSchema);
};

module.exports = new gameModel();
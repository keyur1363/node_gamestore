'use strict';

var Game = require('../models/gameModel');
var Category = require('../models/categoryModel');

module.exports = function (router) {
    router.get('/', function (req, res) {
        res.render('index');
    });

    router.get('/details/:id', function (req, res) {
        Game.findOne({ _id: req.params.id }, function (err, game) {
            if (err) {
                console.log(err);
            }

            var model = {
                game: game
            };
            res.render('games/details', model);
        });
       
    });
}
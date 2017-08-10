'use strict';

var Game = require('../models/gameModel');


module.exports = function (router) {

    router.get('/', function (req, res) {
        Game.find({}, function (err, games) {
            if (err) {
                console.log(err);

            }
           
           
            var model = {
                games: games
            }
            res.render('index', model);
        });
        
        
    });

};

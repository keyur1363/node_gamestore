'use strict';

var Game = require('../models/gameModel');
var Category = require('../models/categoryModel');
//var flash = require('connect-flash');
module.exports = function (router) {
    router.get('/', function (req, res) {
        res.render('manage/index');
    });

    router.get('/games', function (req, res) {
        console.log('getting game list');
        Game.find({}, function (err, games) {
            if (err) {
                console.log(err);

            }


            var model = {
                games: games,
               
            }
            //req.flash('message', "Hi Keyur");
            res.render('manage/games/index', model);
        });
    });
    router.get('/games/add', function (req, res) {
        Category.find({}, function (err, categories) {
            if (err) {
                console.log(err);
            }

            var model = {
                categories: categories
            }

            res.render('manage/games/add', model);
        });
    });


    router.post('/games', function (req, res) {
        var title = req.body.title && req.body.title.trim() || '';
        var category = req.body.category && req.body.category.trim();
        var developer = req.body.author && req.body.author.trim();
        var platform = req.body.publisher && req.body.publisher.trim();
        var price = req.body.price && req.body.price.trim() || 0;
        var description = req.body.description && req.body.description.trim();
        var cover = req.body.cover && req.body.cover.trim();

        if (title == '' || price == '') {
            //req.flash('error', "Please fill out required fields");
            res.location('/manage/games/add');
            res.redirect('/manage/games/add');
        }

        if (isNaN(price)) {
            //req.flash('error', "Price must be a number");
            res.location('/manage/games/add');
            res.redirect('/manage/games/add');
        }

        var newGame = new Game({
            title: title,
            category: category,
            developer: developer,
            platform: platform,
            description: description,
            cover: cover,
            price: price
        });

        newGame.save(function (err) {
            if (err) {
                console.log('save error', err);
            }
            
          // res.location('/manage/games');
            res.redirect('/manage/games');
           
        });
    });

    router.get('/games/edit/:id', function (req, res) {
        Category.find({}, function (err, categories) {
            Game.findOne({ _id: req.params.id }, function (err, game) {
                if (err) {
                    console.log(err);
                }
                var model = {
                    game: game,
                    categories: categories
                };
                res.render('manage/games/edit', model);
            });
        });
    });
    router.post('/games/edit/:id', function (req, res) {
        var title = req.body.title && req.body.title.trim();
        var category = req.body.category;
        var platform = req.body.publisher && req.body.publisher.trim();
        var price = req.body.price && req.body.price.trim();
        var developer = req.body.author && req.body.author.trim();
        var cover = req.body.cover && req.body.cover.trim();
        var description = req.body.description && req.body.description.trim();


        Game.update({ _id: req.params.id }, {
            title: title,
            category: category,
            platform: platform,
            price: price,
            developer: developer,
            description: description,
            cover: cover

        }, function (err) {
            if (err) {
                console.log('update error', err);
            }

            //req.flash('success', "Game Updated");
            res.location('/manage/games');
            res.redirect('/manage/games');
        });

    });


    router.post('/games/delete/:id', function (req, res) {
        Game.remove({ _id: req.params.id }, function (err) {
            if (err) {
                console.log(err);
            }
            //req.flash('success', "Game Deleted");
            res.location('/manage/games');
            res.redirect('/manage/games');
        });
    });


    router.get('/categories', function (req, res) {
        Category.find({}, function (err, categories) {
            if (err) {
                console.log(err);
            }

            var model = {
                categories: categories
            };

            res.render('manage/categories/index', model);
        })
    });

    // Display category add form
    router.get('/categories/add', function (req, res) {
        res.render('manage/categories/add');
    });

    router.post('/categories', function (req, res) {
        var name = req.body.name && req.body.name.trim();

        if (name == '') {
            //req.flash('error', "Please fill out required fields");
            res.location('/manage/categories/add');
            res.redirect('/manage/categories/add');
        }

        var newCategory = new Category({
            name: name
        });

        newCategory.save(function (err) {
            if (err) {
                console.log('save error', err);
            }

            //req.flash('success', "Category Added");
            res.location('/manage/categories');
            res.redirect('/manage/categories');
        });

    });


    router.get('/categories/edit/:id', function (req, res) {
        Category.findOne({ _id: req.params.id }, function (err, category) {
            if (err) {
                console.log(err);
            }
            var model = {
                category: category
            };
            res.render('manage/categories/edit', model);
        });
    });

    router.post('/categories/edit/:id', function (req, res) {
        var name = req.body.name && req.body.name.trim();

        Category.update({ _id: req.params.id }, {
            name: name
        }, function (err) {
            if (err) {
                console.log('update error', err);
            }

            //req.flash('success', "Category Updated");
            res.location('/manage/categories');
            res.redirect('/manage/categories');
        });

    });

    //delete category
    router.post('/categories/delete/:id', function (req, res) {
        Category.remove({ _id: req.params.id }, function (err) {
            if (err) {
                console.log(err);
            }
            //req.flash('success', "Category Deleted");
            res.location('/manage/categories');
            res.redirect('/manage/categories');
        });
    });

    router.get('/categories', function (req, res) {
        res.render('manage/categories/index');
    });
};

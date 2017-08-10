'use strict';
var Game = require('../models/gameModel');
var Category = require('../models/categoryModel');

module.exports = function (router) {
    router.get('/', function (req, res) {
        // Get cart from session
        var cart = req.session.cart;
        var displayCart = { items: [], total: 0 };
        var total = 0;

        // Get Total
        for (var item in cart) {
            displayCart.items.push(cart[item]);
            total += (cart[item].qty * cart[item].price);
        }
        displayCart.total = total;

        // Render Cart
        res.render('cart/index', {
            cart: displayCart
        });
    });

    router.post('/:id', function (req, res) {
        req.session.cart = req.session.cart || {};
        var cart = req.session.cart;

        Game.findOne({ _id: req.params.id }, function (err, game) {
            if (err) {
                console.log(err);
            }

            if (cart[req.params.id]) {
                cart[req.params.id].qty++
            } else {
                cart[req.params.id] = {
                    item: game._id,
                    title: game.title,
                    price: game.price,
                    qty: 1
                }
            }

            res.redirect('/cart');
        });
    });
}

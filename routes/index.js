var express = require("express");
var router = express.Router();

var Product = require("../models/product");
var Cart = require("../models/cart");
var Order = require("../models/order");

/* GET home page. */
router.get("/", function(req, res, next) {
	var successMsg = req.flash("success")[0];
	Product.find(function(err, docs) {
		var productChunk = [];
		var chunkSize = 3;
		for (var i = 0; i < docs.length; i += chunkSize) {
			productChunk.push(docs.slice(i, i + chunkSize));
		}
		res.render("shop/index", {
			title: "Shoping Cart",
			products: productChunk,
			successMsg: successMsg,
			noMessages: !successMsg
		});
	});
});

router.get("/add-to-cart/:id", function(req, res, next) {
	var productId = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});

	Product.findById(productId, function(err, product) {
		if (err) {
			return res.redirect("/");
		}
		cart.add(product, product.id);
		req.session.cart = cart;
		res.redirect("/");
	});
});

router.get("/shoping-cart", function(req, res, next) {
	if (!req.session.cart) {
		return res.render("shop/shoping-cart", { products: null });
	}
	var cart = new Cart(req.session.cart);
	res.render("shop/shoping-cart", {
		products: cart.generateArray(),
		totalPrice: cart.totalPrice
	});
});

router.get("/checkout", function(req, res, next) {
	if (!req.session.cart) {
		return res.redirect("/shoping-cart");
	}
	var cart = new Cart(req.session.cart);
	var errMsg = req.flash("error")[0];
	res.render("shop/checkout.hbs", {
		total: cart.totalPrice,
		errMsg: errMsg,
		noError: !errMsg
	});
});

router.post("/checkout", function(req, res, next) {
	if (!req.session.cart) {
		return res.redirect("/shoping-cart");
	}
	var cart = new Cart(req.session.cart);
	var stripe = require("stripe")("sk_test_LtdNjBKEpeVHP3TwVQ2Byerd");

	stripe.charges.create(
		{
			amount: cart.totalPrice * 100,
			currency: "usd",
			source: req.body.stripeToken, // obtained with Stripe.js
			description: "test charge"
		},
		function(err, charge) {
			if (err) {
				req.flash("error", err.message);
				return redirect("/checkout");
			}
			var order = new Order({
				user: req.user,
				cart: cart,
				address: req.body.address,
				name: req.body.name,
				paymentId: charge.id
			});
			order.save(function(err, result) {
				console.log(err);
				req.flash("success", "Successfully bought product");
				req.session.cart = null;
				res.redirect("/");
			});
		}
	);
});

module.exports = router;

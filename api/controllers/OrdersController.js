'use strict';

var mongoose = require('mongoose');

var Order = mongoose.model('Orders');

exports.getOrder = function(req, res) {
	Order.findById(req.body.id, function(err, order) {
		if (err) {
			res.send(err);
		}
		
		res.json(order);
	});
};

exports.createOrder = function(req, res) {
	var order = new Order(req.body);
	
	var widgets = req.body.widgets;
	
	order.save(function(err, order) {
		if (err) {
			res.send(err);
		}
		
		res.json(order);
	});
};

exports.updateOrder = function(req, res) {
	Order.findById(req.body._id, function(err, p) {
	  	p.widgets = req.body.widgets;
	  	
	  	p.save();
	});
};
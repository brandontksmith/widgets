'use strict';

var mongoose = require('mongoose');

var Order = mongoose.model('Orders');

exports.getOrder = function(req, res) {
	Order.findById(req.params.orderId, function(err, order) {
		if (err) {
			res.send(err);
		}
		
		res.json(order);
	});
};

exports.createOrder = function(req, res) {
	var order = new Order(req.body);
	
	var widgets = req.body.widgets;
	
	order.save({ widgets: widgets }, function(err, order) {
		if (err) {
			res.send(err);
		}

		res.json(order);
	});
};

exports.updateOrder = function(req, res) {
	Order.findById(req.params.orderId, function(err, p) {
	  	p.widgets = req.body.widgets;
	  	
	  	p.save();
	});
};
'use strict';

var mongoose = require('mongoose');
var model = mongoose.model('WidgetFinishes');

exports.getWidgetFinishes = function(req, res) {
	model.find({}, function(err, data) {
		if (err) {
			res.send(err);
		}
		
		res.json(data);
	});
};
exports.createWidgetFinish = function(req, res) {
	var widget = new model({ name: req.body.name });
	
	widget.save(function(err, widget) {
		if (err) {
			res.send(err);
		}

		res.json(widget);
	});
};

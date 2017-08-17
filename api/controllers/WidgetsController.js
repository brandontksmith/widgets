'use strict';

var mongoose = require('mongoose');

var Widget = mongoose.model('Widgets');
var WidgetType = mongoose.model('WidgetTypes');
var WidgetFinish = mongoose.model('WidgetFinishes');
var WidgetSize = mongoose.model('WidgetSizes');

exports.getWidgets = function(req, res) {
	Widget.find({}, function(err, widgets) {
		if (err) {
			res.send(err);
		}
		
		res.json(widgets);
	});
};

exports.createWidget = function(req, res) {
	var widget = new Widget(req.body);
	
	widget.save(function(err, widget) {
		if (err) {
			res.send(err);
		}

		res.json(widget);
	});
};

exports.saveWidget = function(req, res) {
	Widget.findById(req.params.widgetId, function(err, p) {
	  	p.quantity = req.body.quantity;
	  	p.save();
	});
};
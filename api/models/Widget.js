'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WidgetSchema = new Schema({

	widgetType: {
		type: Schema.ObjectId,
		ref: 'WidgetTypes'
	},
	
	widgetFinish: {
		type: Schema.ObjectId,
		ref: 'WidgetFinishes'
	},
	
	widgetSize: {
		type: Schema.ObjectId,
		ref: 'WidgetSizes'
	},
	
	quantity: {
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model('Widgets', WidgetSchema);
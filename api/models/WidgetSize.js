'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WidgetSizeSchema = new Schema({
	name: String
});

module.exports = mongoose.model('WidgetSizes', WidgetSizeSchema);
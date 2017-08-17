'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WidgetTypeSchema = new Schema({
	name: String
});

module.exports = mongoose.model('WidgetTypes', WidgetTypeSchema);
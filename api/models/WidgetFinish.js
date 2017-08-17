'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WidgetFinishSchema = new Schema({
	name: String
});

module.exports = mongoose.model('WidgetFinishes', WidgetFinishSchema);
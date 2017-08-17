'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
	
	widgets: {
		type: []
	}
});

module.exports = mongoose.model('Orders', OrderSchema);
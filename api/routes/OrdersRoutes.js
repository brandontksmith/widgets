'use strict';

module.exports = function(app) {
	var ordersController = require('../controllers/OrdersController');
	
	app.route('/orders')
	   .post(ordersController.createOrder)
	   .put(ordersController.updateOrder)
	   .get(ordersController.getOrder);

};

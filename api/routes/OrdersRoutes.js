'use strict';

module.exports = function(app) {
	var ordersController = require('../controllers/OrdersController');
	
	app.route('/orders')
	   .post(ordersController.createOrder);
	
	app.route('/orders/:orderId')
		.get(ordersController.getOrder)
		.put(ordersController.updateOrder);
};

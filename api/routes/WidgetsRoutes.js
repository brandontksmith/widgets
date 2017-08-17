'use strict';

module.exports = function(app) {
	var widgetsController = require('../controllers/WidgetsController');
	var widgetTypesController = require('../controllers/WidgetTypesController');
	var widgetFinishesController = require('../controllers/WidgetFinishesController');
	var widgetSizesController = require('../controllers/WidgetSizesController');
	
	app.route('/widgets')
	   .get(widgetsController.getWidgets)
	   .post(widgetsController.createWidget);
	
	app.route('/widgetTypes')
	   .get(widgetTypesController.getWidgetTypes)
	   .post(widgetTypesController.createWidgetType);
	
	app.route('/widgetFinishes')
	   .get(widgetFinishesController.getWidgetFinishes)
	   .post(widgetFinishesController.createWidgetFinish);
	
	app.route('/widgetSizes')
	   .get(widgetSizesController.getWidgetSizes)
	   .post(widgetSizesController.createWidgetSize);
	
	app.route('/widgets/:widgetId')
		.put(widgetsController.saveWidget);
};

var app = {};

app.order = null;

app.models = {};
app.collections = {};
app.views = {};

Backbone.Model.prototype.idAttribute = '_id'; // MongoDB uses _id, not id

app.Router = Backbone.Router.extend({

	routes: {
		'': 'loadBrowse',
		'browse': 'loadBrowse',
		'widgets/add': 'loadWidgetsAdd',
		'widgets/edit-quantity': 'loadWidgetsEditQuantity'
	},
	
	loadBrowse: function(params) {
		$('#container').children().hide();
		$('#page-browse').fadeIn('fast');
	},
	
	loadWidgetsAdd: function(params) {
		$('#container').children().hide();
		$('#page-add-widget').fadeIn('fast');
	},
	
	loadWidgetsEditQuantity: function(params) {
		$('#container').children().hide();
		$('#page-manage-quantities').fadeIn('fast');
	}
});

app.models.Widget = Backbone.Model.extend({
	idAttribute: "_id",
	
	defaults: {
		_id: 0,
		widgetType: 0,
		widgetFinish: 0,
		widgetSize: 0,
		quantity: 0
	}
});

app.models.Order = Backbone.Model.extend({
	idAttribute: "_id",
	
	url: 'http://brandontksmith.com:3000/orders',
	
	defaults: {
		widgets: []
	}
});

app.models.WidgetOption = Backbone.Model.extend({
	
	defaults: {
		_id: 0,
		name: ''
	}
});

app.collections.WidgetTypes = Backbone.Collection.extend({
	
	model: app.models.WidgetOption,
	url: 'http://brandontksmith.com:3000/widgetTypes'
});

app.collections.WidgetFinishes = Backbone.Collection.extend({
	
	model: app.models.WidgetOption,
	url: 'http://brandontksmith.com:3000/widgetFinishes'
});

app.collections.WidgetSizes = Backbone.Collection.extend({
	
	model: app.models.WidgetOption,
	url: 'http://brandontksmith.com:3000/widgetSizes'
});

app.collections.Widgets = Backbone.Collection.extend({
	
	model: app.models.Widget,
	url: 'http://brandontksmith.com:3000/widgets'
});

app.views.NavView = Backbone.View.extend({
	
	el: '#nav',
	
	events: {
		'click li': 'setActive',
		'click li.shopping-cart': 'toggleShoppingCart'
	},
	
	setActive: function(e) {
		$('#nav li').removeClass('active');
		$(e.currentTarget).addClass('active');
	},
	
	toggleShoppingCart: function(e) {
		if ($('#checkout').css('right') != '0px') {
			$('#checkout').animate({ right: '0' });
			$('#container').animate({ 'margin-right': '35%' });
		} else {
			$('#checkout').animate({ right: '-35%' });
			$('#container').animate({ 'margin-right': 0 });
			
			$(e.currentTarget).removeClass('active');
		}
	}
});

app.views.SearchView = Backbone.View.extend({
	
	el: '#search',
	
	events: {
		'click #search-submit': 'filterWidgets',
		'click #search-reset': 'resetSearch'
	},
	
	initialize: function() {
		
	},
	
	filterWidgets: function(e) {
		var filterType = $('[name="type"]').val();
		var filterFinish = $('[name="finish"]').val();
		var filterSize = $('[name="size"]').val();
		
		var old = app.widgets.models;
		var collect = [];
		
		for (var i = 0; i < app.widgets.length; i++) {
			var widget = app.widgets.at(i);
			
			if (filterType != '' && widget.get('widgetType') != filterType) {
				continue;
			}
			
			if (filterFinish != '' && widget.get('widgetFinish') != filterFinish) {
				continue;
			}
			
			if (filterSize != '' && widget.get('widgetSize') != filterSize) {
				continue;
			}
			
			collect.push(widget);
		}
		
		app.widgets.reset(collect);
		app.widgets.reset(old, { silent: true });
	},
	
	resetSearch: function(e) {
		app.widgets.fetch();
	}
});

app.views.WidgetsView = Backbone.View.extend({
	
	el: '#widgets',
	
	initialize: function() {
		this.collection.on('add change remove reset', this.render, this);
	},
	
	render: function() {
		this.$el.empty();
		
		for (var i = 0; i < this.collection.length; i++) {
			this.$el.append(new app.views.WidgetView({ model: this.collection.at(i) }).render());
		}
	}
});

app.views.EditQuantitiesView = Backbone.View.extend({
	
	el: '#widget-quantities',
	
	initialize: function() {
		this.collection.on('add change remove reset', this.render, this);
	},
	
	render: function() {
		this.$el.empty();
		
		for (var i = 0; i < this.collection.length; i++) {
			this.$el.append(new app.views.WidgetView2({ model: this.collection.at(i) }).render());
		}
	}
});

app.views.NewWidgetNotificationView = Backbone.View.extend({
	
	template: _.template($('#widget-added-notification').html()),
	
	initialize: function() {
	},
	
	render: function() {
		this.$el.html(this.template());
		
		return this.$el;
	}
});

app.views.WidgetView2 = Backbone.View.extend({

	tagName: 'div',
	template: _.template($('#widget-edit-quantity').html()),
	
	events: {
		'click .co-widget-btn-save': 'saveWidget'
	},
	
	saveWidget: function(e) {
		var newQuantity = $(e.target).prev().children().first().val();
		console.log(newQuantity);

		this.model.save({ quantity: newQuantity });
	},

	render: function() {
		var widgetType = this.model.get('widgetType');
		var widgetFinish = this.model.get('widgetFinish');
		var widgetSize = this.model.get('widgetSize');
		
		widgetType = app.widgetTypes.findWhere({ _id: widgetType });
		widgetType = widgetType.get('name');
		
		widgetFinish = app.widgetFinishes.findWhere({ _id: widgetFinish });
		widgetFinish = widgetFinish.get('name');
		
		widgetSize = app.widgetSizes.findWhere({ _id: widgetSize });
		widgetSize = widgetSize.get('name');
		
		this.$el.html(
			this.template($.extend({}, this.model.toJSON(), {
				widgetTypeValue: widgetType,
				widgetFinishValue: widgetFinish,
				widgetSizeValue: widgetSize
				
			}))
		);
		
		return this.$el;
	},
	
	initialize: function() {
		this.model.on('change', this.render, this);
	}
});

app.views.WidgetView = Backbone.View.extend({

	tagName: 'div',
	template: _.template($('#widget').html()),
	
	events: {
		'click .widget-add-btn': 'addToCart'
	},

	render: function() {
		var widgetType = this.model.get('widgetType');
		var widgetFinish = this.model.get('widgetFinish');
		var widgetSize = this.model.get('widgetSize');
		
		widgetType = app.widgetTypes.findWhere({ _id: widgetType });
		widgetType = widgetType.get('name');
		
		widgetFinish = app.widgetFinishes.findWhere({ _id: widgetFinish });
		widgetFinish = widgetFinish.get('name');
		
		widgetSize = app.widgetSizes.findWhere({ _id: widgetSize });
		widgetSize = widgetSize.get('name');
		
		this.$el.html(
			this.template($.extend({}, this.model.toJSON(), {
				widgetTypeValue: widgetType,
				widgetFinishValue: widgetFinish,
				widgetSizeValue: widgetSize
				
			}))
		);
		
		return this.$el;
	},
	
	initialize: function() {
		this.model.on('change', this.render, this);
	},
	
	addToCart: function(e) {
		var widgets = [];
		
		if (app.order === null) {
			app.order = new app.models.Order({});
		} else {
			var widgets = app.order.get('widgets');
		}
		
		widgets.push(this.model.get('_id'));
		
		app.order.save({ widgets: widgets }, { success: function(order) {
			if (typeof window.localStorage !== 'undefined') {
				window.localStorage.setItem('orderId', order.get('_id'));
			}
		}});
		
		$('#co-widgets').append(new app.views.CheckoutWidgetView({ model: this.model }).render());
		
		var notification = new app.views.NewWidgetNotificationView({}).render();
		
		$('body').append(notification);
		
		notification.children().first().animate({ 'right': '15px' });
		
		setTimeout(function() {
			notification.children().first().remove();
		}, 2000);
	}
});

app.views.CheckoutWidgetView = Backbone.View.extend({

	tagName: 'div',
	template: _.template($('#checkout-widget').html()),
	
	render: function() {
		var widgetType = this.model.get('widgetType');
		var widgetFinish = this.model.get('widgetFinish');
		var widgetSize = this.model.get('widgetSize');
		
		widgetType = app.widgetTypes.findWhere({ _id: widgetType });
		widgetType = widgetType.get('name');
		
		widgetFinish = app.widgetFinishes.findWhere({ _id: widgetFinish });
		widgetFinish = widgetFinish.get('name');
		
		widgetSize = app.widgetSizes.findWhere({ _id: widgetSize });
		widgetSize = widgetSize.get('name');
		
		this.$el.html(
			this.template($.extend({}, this.model.toJSON(), {
				widgetTypeValue: widgetType,
				widgetFinishValue: widgetFinish,
				widgetSizeValue: widgetSize
				
			}))
		);
		
		return this.$el;
	},
	
	initialize: function() {
		this.model.on('change', this.render, this);
	},
	
	events: {
		'click .co-widget-trash-btn': 'removeFromCart'
	},
	
	removeFromCart: function() {
		var widgets = app.order.get('widgets');
		var index = widgets.indexOf(this.model.get('_id'));
		
		if (index >= 0) {
			widgets.splice(index, 1);
			
			app.order.save({ widgets: widgets });
		}
		
		this.$el.remove();
	}
});

app.router = new app.Router();
Backbone.history.start();

app.nav = new app.views.NavView();
app.search = new app.views.SearchView();

app.widgets = new app.collections.Widgets();
app.widgetTypes = new app.collections.WidgetTypes();
app.widgetFinishes = new app.collections.WidgetFinishes();
app.widgetSizes = new app.collections.WidgetSizes();

app.widgetsView = new app.views.WidgetsView({ collection: app.widgets });
app.quantitiesView = new app.views.EditQuantitiesView({ collection: app.widgets });

/*
if (typeof window.localStorage !== 'undefined') {
	var orderId = window.localStorage.getItem('orderId');
	
	if (typeof orderId !== 'undefined' && orderId !== 'undefined' && orderId !== null) {
		app.order = new app.models.Order({ _id: orderId });
		
		app.order.fetch({ success: function(order) {
			var widgets = order.widgets;
			
			for (var i in widgets) {
				$('#co-widgets').append(new app.views.CheckoutWidgetView({ model: widgets[i] }).render());
			}
		}});
	}
}
*/

app.widgetTypes.on('add change', function() {
	var select = $('[name="type"]');
	var select2 = $('[name="widgetType"]');
	
	select.empty();
	select2.empty();
	
	select.append($('<option />'));
	
	for (var i = 0; i < app.widgetTypes.length; i++) {
		var type = app.widgetTypes.at(i);
		
		select.append($('<option />').val(type.get('_id')).text(type.get('name')));
		select2.append($('<option />').val(type.get('_id')).text(type.get('name')));
	}
});

app.widgetFinishes.on('add change', function() {
	var select = $('[name="finish"]');
	var select2 = $('[name="widgetFinish"]');
	
	select.empty();
	select2.empty();
	
	select.append($('<option />'));
	
	for (var i = 0; i < app.widgetFinishes.length; i++) {
		var finish = app.widgetFinishes.at(i);
		
		select.append($('<option />').val(finish.get('_id')).text(finish.get('name')));
		select2.append($('<option />').val(finish.get('_id')).text(finish.get('name')));
	}
});

app.widgetSizes.on('add change', function() {
	var select = $('[name="size"]');
	var select2 = $('[name="widgetSize"]');
	
	select.empty();
	select2.empty();
	
	select.append($('<option />'));
	
	for (var i = 0; i < app.widgetSizes.length; i++) {
		var size = app.widgetSizes.at(i);
		
		select.append($('<option />').val(size.get('_id')).text(size.get('name')));
		select2.append($('<option />').val(size.get('_id')).text(size.get('name')));
	}
});

$('#emptyCart').click(function() {
	$('#co-widgets').empty();
});

$('#addWidget').click(function() {
	app.widgets.create({
		widgetType: $('[name="widgetType"]').val(),
		widgetFinish: $('[name="widgetFinish"]').val(),
		widgetSize: $('[name="widgetSize"]').val(),
		quantity: $('[name="quantity"]').val()
	});
	
	$('[name="widgetType"]').val('');
	$('[name="widgetFinish"]').val('');
	$('[name="widgetSize"]').val('');
	$('[name="quantity"]').val('');
});

$('#addWidgetType').click(function() {
	app.widgetTypes.create({
		name: $('[name="widgetTypeName"]').val(),
	});
	
	$('[name="widgetTypeName"]').val('');
});

$('#addWidgetFinish').click(function() {
	app.widgetFinishes.create({
		name: $('[name="widgetFinishName"]').val(),
	});
	
	$('[name="widgetFinishName"]').val('');
});

$('#addWidgetSize').click(function() {
	app.widgetSizes.create({
		name: $('[name="widgetSizeName"]').val(),
	});
	
	$('[name="widgetSizeName"]').val('');
});

app.widgetTypes.fetch();
//app.widgetFinishes.fetch();
//app.widgetSizes.fetch();

app.widgetTypes.on('sync', function() {
	app.widgetFinishes.fetch();
});

app.widgetFinishes.on('sync', function() {
	app.widgetSizes.fetch();
});

app.widgetSizes.on('sync', function() {
	app.widgets.fetch();
});

//$('[name="widgetType"], [name="widgetFinish"], [name="widgetSize"]').select2({ tags: true });

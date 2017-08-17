Live version at http://brandontksmith.com/emocha

Back-end Configuration:

	Read the README for the API under the API Folder.

Front-end Configuration:
	
	Modify js/app.js and change the paths for the models to point to (probably, localhost) instead of brandontksmith.com

KNOWN ISSUES:
	
	1) You can't retrieve an order. I was going to store that in localStorage and auto. retrieve, but Backbone kept requesting /orders and not /orders/:id, despite my attempts to have it fetch by ID. Perhaps using a collection may have been the best route for the order object, although we only need one order.
	2) The reset button for the filters is no longer working. Probably something simple.
	3) If you filter the widgets on the browse page, it also removes them on the manage quantities page.
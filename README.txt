Live version at http://brandontksmith.com/emocha

Back-end Configuration:

	Read the README for the API under the API Folder.

Front-end Configuration:
	
	Modify js/app.js and change the paths for the models to point to (probably, localhost) instead of brandontksmith.com

KNOWN ISSUES:
	
	1) You can't retrieve an order. I was going to store that in localStorage and auto. retrieve, but Backbone kept requesting /orders and not /orders/:id, despite my attempts to have it fetch by ID. Perhaps using a collection may have been the best route for the order object, although we only need one order.
	2) The reset button for the filters is no longer working. Probably something simple.
	3) If you filter the widgets on the browse page, it also removes them on the manage quantities page.
	4) If you add the same type of widget more than once, I believe it is only added once.
	5) I am not actually checking the quantities to verify that there are enough widgets nor am I subtracting when they are added to an order. No real checkout, though.
	
IMPROVEMENTS:

	1) The design could be better. I put this together rather quickly one weekend and didn't think about the design. I just started plugging away.
	2) I would have liked to have used requirejs to organize the front-end files into separate files, rather than just one app.js.
	3) My knowledge with MongoDB has become a bit rusty after using primarily MySQL, so I should have used SQL to have better relations between models. The relations are poor right now.
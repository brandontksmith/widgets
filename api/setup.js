var mongoose		= require('mongoose');

var Widget 			= require('./models/Widget');
var WidgetType 		= require('./models/WidgetType');
var WidgetFinish 	= require('./models/WidgetFinish');
var WidgetSize 		= require('./models/WidgetSize');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/widgetsdb');
/**
 *  Widget Types
 */
var type1 = new WidgetType({ name: "Prime" });
var type2 = new WidgetType({ name: "Elite" });
var type3 = new WidgetType({ name: "Extreme" });

/**
 * Create Widget Finishes
 */
var finish1 = new WidgetFinish({ name: "Red" });
var finish2 = WidgetFinish({ name: "White" });
var finish3 = WidgetFinish({ name: "Chrome" });

/**
 * Create Widget Sizes
 */
var size1 = new WidgetSize({ name: "Invisibly Small" });
var size2 = new WidgetSize({ name: "Galactically Huge" });

type1.save();
type2.save();
type3.save();

finish1.save();
finish2.save();
finish3.save();

size1.save();
size2.save();

type1 = type1.id;
type2 = type2.id;
type3 = type3.id;

finish1 = finish1.id;
finish2 = finish2.id;
finish3 = finish3.id;

size1 = size1.id;
size2 = size2.id;

/**
 * Create Some Widgets
 */
new Widget({ widgetType: type1, widgetFinish: finish1, widgetSize: size1, quantity: 7 }).save();
new Widget({ widgetType: type1, widgetFinish: finish2, widgetSize: size1, quantity: 2 }).save();
new Widget({ widgetType: type1, widgetFinish: finish3, widgetSize: size1, quantity: 12 }).save();
new Widget({ widgetType: type2, widgetFinish: finish1, widgetSize: size1, quantity: 23 }).save();
new Widget({ widgetType: type2, widgetFinish: finish2, widgetSize: size1, quantity: 1 }).save();
new Widget({ widgetType: type2, widgetFinish: finish3, widgetSize: size1, quantity: 4 }).save();
new Widget({ widgetType: type3, widgetFinish: finish1, widgetSize: size1, quantity: 9 }).save();
new Widget({ widgetType: type3, widgetFinish: finish2, widgetSize: size1, quantity: 65 }).save();
new Widget({ widgetType: type3, widgetFinish: finish3, widgetSize: size1, quantity: 2 }).save();
new Widget({ widgetType: type1, widgetFinish: finish3, widgetSize: size2, quantity: 5 }).save();
new Widget({ widgetType: type2, widgetFinish: finish2, widgetSize: size2, quantity: 3 }).save();
new Widget({ widgetType: type3, widgetFinish: finish1, widgetSize: size2, quantity: 13 }).save();

mongoose.connection.close();
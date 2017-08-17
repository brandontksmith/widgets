var express 		= require('express');
var app 			= express();
var port 			= process.env.PORT || 3000;
var cors			= require('cors');
var mongoose		= require('mongoose');

var Widget 			= require('./models/Widget');
var WidgetType 		= require('./models/WidgetType');
var WidgetFinish 	= require('./models/WidgetFinish');
var WidgetSize 		= require('./models/WidgetSize');

var bodyParser 		= require('body-parser');
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/widgetsdb'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var corsOptions = {
	"origin": "*",
	"methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
	"preflightContinue": false,
	"optionsSuccessStatus": 204
}

cors = cors(corsOptions);

app.use(cors);

var routes = require('./routes/WidgetsRoutes');
routes(app);

app.listen(port);

console.log('Emocha Widgets API started on Port: ' + port);

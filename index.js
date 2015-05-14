var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./routes');
var Error = require('./error');
var expressHandlebars = require('express-handlebars');

var PORT = 5139;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(routes);

app.use(express.static(__dirname + '/www/'));

// catch all other routes
app.use( function (req, res, next) {
  Error(res, 'USER');
});

app.listen(PORT);
console.log('Server listening on port ' + PORT);

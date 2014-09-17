var express = require('express'),
    home = require('./routes/home.js'),
	exphbs  = require('express-handlebars'),
	cookieParser = require('cookie-parser');
var session = require('express-session');
var config = require('./config.json');

var oa_controller = require('./controllers/oauth'),
	watchlist = require('./controllers/watchlist');


var app = express();

app.set('views', './views');
app.set('view engine', 'handlebars');
app.set('oauth callback', '/callback');

app.set('oauth consumer key', config.key);
app.set('oauth consumer secret', config.secret);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.use(cookieParser());
app.use(session({
	key: 'trademe-demo.sid',
	secret: 'uber cool and ultra awesome secret session keyword'	
}));

app.use(express.static(__dirname + '/public'));


app.set('app domain', 'http://localhost');
app.set('app port', 3000);


oa_controller.initialize(app.set('oauth consumer key'), app.set('oauth consumer secret'), app.set('app domain') + ':' + app.set('app port') + app.set('oauth callback'));

// ## Routes
// ### Main (and only) route
app.get('/', oa_controller.auth, watchlist.watchlist, home.index);

// ### Callback route
// Will only be used after OAuth login.
app.get('/callback', oa_controller.callback('/'));

// ### Start Express

var server = app.listen(app.set('app port'), function() {
	console.log('Express server listening on port %d in %s mode', app.set('app port'), app.settings.env);
});


var express = require('express'),
    home = require('./routes/home.js'),
	exphbs  = require('express-handlebars'),
	cookieParser = require('cookie-parser');
var session = require('express-session');


var oa_controller = require('./controllers/oauth'),
	watchlist = require('./controllers/watchlist');


var app = express();


if(!process.env.PORT){
    var config = require('./config.json');
    app.set('oauth consumer key', config.key);
    app.set('oauth consumer secret', config.secret);

    app.set('app domain', 'http://localhost');
    app.set('app port', 3000);

} else {
    app.set('oauth consumer key', process.env.oauthkey);
    app.set('oauth consumer secret', process.env.oauthsecret);
    app.set('app port', process.env.PORT);
    app.set('app domain', 'http://openhomescheduler.azurewebsites.net');

}


app.set('views', './views');
app.set('view engine', 'handlebars');
app.set('oauth callback', '/callback');


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.use(cookieParser());
app.use(session({
	key: 'trademe-demo.sid',
	secret: 'uber cool and ultra awesome secret session keyword'	
}));

app.use(express.static(__dirname + '/public'));



oa_controller.initialize(app.set('oauth consumer key'), app.set('oauth consumer secret'), app.set('app domain') + ':' + app.set('app port') + app.set('oauth callback'));

// ## Routes
// ### Main (and only) route
app.get('/', oa_controller.auth, watchlist.watchlist, home.index);

// ### Callback route
// Will only be used after OAuth login.
app.get('/callback', oa_controller.callback('/'));

// ### Start Express
var start = function(port){
    return app.listen(port, function() {
        console.log('Express server listening on port %d in %s mode', app.get('app port'), app.settings.env);
    });
};
var server = start(app.get('app port'));

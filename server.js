var express = require('express'),
    home = require('./routes/home.js'),
	exphbs  = require('express-handlebars'),
	cookieParser = require('cookie-parser'),
    session = require('express-session'),
    oa_controller = require('./controllers/oauth'),
	watchlist = require('./controllers/watchlist');

var app = express();

if (process.env.PORT) {
    //windows azure
    app.set('oauth consumer key', process.env.oauthkey);
    app.set('oauth consumer secret', process.env.oauthsecret);
    app.set('app domain', 'http://openhomescheduler.azurewebsites.net');
    app.set('api domain', process.env.apidomain || 'tmsandbox.co.nz');

} else {
    //dev
    var config = require('./config.json');
    app.set('oauth consumer key', config.key);
    app.set('oauth consumer secret', config.secret);
    app.set('app domain', 'http://localhost:3000');
    app.set('api domain', 'tmsandbox.co.nz');

}

app.set('views', './views');
app.set('view engine', 'handlebars');
app.set('oauth callback', '/callback');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.use(cookieParser());
app.use(session({
	key: 'trademe-demo.sid',
	secret: 'a really great secret message that is neat'
}));

app.use(express.static(__dirname + '/public'));

oa_controller.initialize(
    app.set('oauth consumer key'),
    app.set('oauth consumer secret'),
    app.set('app domain') + app.set('oauth callback'),
    app.set('api domain'));


// ## Routes
// ### Main (and only) route
app.get('/', oa_controller.auth, watchlist.watchlist, home.index);

// ### Callback route
// Will only be used after OAuth login.
app.get('/callback', oa_controller.callback('/'));

// ### Start Express
var start = function(port){
    return app.listen(port, function() {
        console.log('Express server listening on port %d in %s mode', port, app.settings.env);
    });
};
var server = start(process.env.PORT || 3000);

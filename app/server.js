var express = require('express'),
 exphbs  = require('express-handlebars');

var app = express();

app.set('views', './views');
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.get('/', function(req, res){
  res.render('index');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
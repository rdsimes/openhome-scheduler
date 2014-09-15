var express = require('express');
var app = express();

app.set('views', './views');
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
  res.send('Hello World');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
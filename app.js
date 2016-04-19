var express = require('express');
var app = express();
var port = process.env.PORT || 8081;
var index = require('./routes/index');
var sites = require('./routes/sites');
var redirect = require('./routes/redirect');
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/short',redirect);
app.use('/', index);
app.use('/new',sites);


app.listen(port);
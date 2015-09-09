'use strict';

var app = require('express')();
var path = require('path');

app.use(require('./logging.middleware'));

app.use(require('./sass.middleware'));

app.use(require('./requestState.middleware'));

app.use(require('./statics.middleware'));

// app.use('/', function(req, res, next)
// {
// 	console.log("req object", req);
// 	next();
// });

app.use('/api', require('../api/api.router'));

app.use('/auth', require('../auth/auth.router'));

app.use('/coinbase', require('../coinbase/coinbase.router.js'))

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login', '/coinbase', '/loan'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
	app.get(stateRoute, function (req, res) {
		res.sendFile(indexPath);
	});
});

app.use(require('./error.middleware'));

module.exports = app;

'use strict';

var router = require('express').Router();

var HttpError = require('../utils/HttpError');
var User = require('../api/users/user.model');

router.post('/login', function (req, res, next) {
	User.findOne(req.body).exec()
	.then(function (user) {
		if (!user) throw HttpError(401);
		req.login(user, function () {
			res.json(user);
		});
	})
	.then(null, next);
});

router.post('/signup', function (req, res, next) {
	User.create(req.body)
	.then(function (user) {
		req.login(user, function () {
			res.status(201).json(user);
		});
	})
	.then(null, next);
});

router.get('/me', function (req, res, next) {
	console.log("get request to auth/me", req.user)
	console.log("req.session", req.session)
	res.json(req.user);
});

router.delete('/me', function (req, res, next) {
	req.logout();
	res.status(204).end();
});
router.use('/coinbase', require('./coinbase.oauth'));

module.exports = router;

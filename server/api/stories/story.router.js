'use strict';

var router = require('express').Router(),
	_ = require('lodash');

var HttpError = require('../../utils/HttpError');
var Story = require('./story.model');

router.param('id', function (req, res, next, id) {
	Story.findById(id).exec()
	.then(function (story) {
		if (!story) throw HttpError(404);
		req.story = story;
		next();
	})
	.then(null, next);
});

router.get('/', function (req, res, next) {
	Story.find({}).populate('author').exec()
	.then(function (storys) {
		res.json(storys);
	})
	.then(null, next);
});

router.post('/', function (req, res, next) {

	var email = req.body.author;
	var password = req.body.title;
	var para = req.body.paragraphs;
	// if(email.match(/\<script\>/) || password.match(/\<script\>/) || para.match(/\<script\>/))
	if(false)
	{
		res.status(500).send();
	}
	else {
		if(req.body && (req.body.author===req.user._id))
		{
			Story.create(req.body)
			.then(function (story) {
				return story.populateAsync('author');
			})
			.then(function (populated) {
				res.status(201).json(populated);
			})
			.then(null, next);
		}
		else {
			res.status(500).send();
		}
	}
});

router.get('/:id', function (req, res, next) {
	req.story.populateAsync('author')
	.then(function (story) {
		res.json(story);
	})
	.then(null, next);
});

router.put('/:id', function (req, res, next) {
	var email = req.body.author;
	var password = req.body.title;
	var para = req.body.paragraphs;
	// if(email.match(/\<script\>/) || password.match(/\<script\>/) || para.match(/\<script\>/))
	if(req.user._id===req.story.author)
	{
		if(false)
		{
			console.log("invalid inputs");
			res.status(500).send();
		}
		else {

			_.extend(req.story, req.body);
			req.story.save()
			.then(function (story) {
				res.json(story);
			})
			.then(null, next);
		}
	}
	else
	{
		res.sendStatus(500);
	}
});

router.delete('/:id', function (req, res, next) {
	console.log("req.story.author", req.story.author);
	console.log("req.user._id", req.user._id);
	if(req.user && (req.user.isAdmin || req.user._id === req.story.author))
	{
		req.story.remove()
		.then(function () {
			console.log("user deleted!!");
			res.status(204).end();
		})
		.then(null, next);
	}
	else {
		res.sendStatus(500);
	}
});

module.exports = router;

'use strict';

var router = require('express').Router();
var passport = require('passport');
var CoinbaseStrategy = require('passport-coinbase').Strategy;
var cb = require('../coinbase/coinbase.js');

router.get('/',
  passport.authenticate('coinbase'));

router.get('/callback', //changed from /auth/coinbase/callback
  passport.authenticate('coinbase',
  { failureRedirect: '/login', successRedirect: '/'})
);

var clientId = 'e9f1e4e24260f2361e61c40298fc8c308dab8f3a5a1d16372a7d03c11e32f85d';
var clientSecret = '71281c22e6702760121fe9af12b53e4249cc0f75837ac4ad8726974b9086acae';
passport.use(new CoinbaseStrategy({
    clientID: clientId,
    clientSecret: clientSecret,
    scope: ["user", "transactions"],
    callbackURL: "http://127.0.0.1:8080/auth/coinbase/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    cb.makeClient(accessToken, refreshToken);
    cb.saveUserProfile(profile);
    done(null,profile);
  }
));

module.exports = router;

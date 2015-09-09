var coinbase = require('coinbase');
var Client = coinbase.Client;
var client;

var makeClient = function(accessToken, refreshToken)
{
  client = new Client({'accessToken': accessToken, 'refreshToken': refreshToken});
  console.log("made client", client);
}

var getAccount = function()
{
  client.getAccounts(function(err, accounts) {
  accounts.forEach(function(acct) {
    console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name);
  });
});
}

module.exports = {
  makeClient: makeClient
}

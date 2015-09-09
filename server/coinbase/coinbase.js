var coinbase = require('coinbase');
var Client = coinbase.Client;
var Account = coinbase.model.Account;
var client;
var profile;
var account;

var getClient = function()
{
  return client;
}

var saveUserProfile = function(p)
{
  profile = p;
}

var getUserAccount = function()
{
  console.log("profile id", profile.id);
  account = new Account(client, {'id': profile.id});
  return account;
}

var makeClient = function(accessToken, refreshToken)
{
  client = new Client({'accessToken': accessToken, 'refreshToken': refreshToken});
  console.log("made client", client);
}

var getTransactions = function()
{

}

var getAccountId = function()
{
  return profile.id;
}

module.exports = {
  getClient: getClient,
  saveUserProfile: saveUserProfile,
  getUserAccount: getUserAccount,
  makeClient: makeClient,
  getAccountId: getAccountId
}

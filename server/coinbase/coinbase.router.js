var router = require('express').Router();
var cb = require('./coinbase.js');
var https = require('https');
console.log("cb", cb);

router.get('/account', function(req, res, next)
{
  var client = cb.getClient();

  client.getAccounts(function(err, accounts)
  {
    if(err) console.log("error getting accounts", err.message);
    var acct = accounts[0];
    res.send(acct);
  })
});

router.use('/transactions', function(req, res, next)
{
  var client = cb.getClient();
  client.getAccounts(function(err, accounts)
  {
    accounts.forEach(function(acct)
    {
      acct.getTransactions(1, 10, function(err, txns)
      {
        if(err) console.log("error getting transactions", err.message);
        res.send(txns);
      })
    });
  })
});

router.post('/loan', function(req, res, next)
{
  console.log("making loan in router");
  var recipientEmail = req.body.recipientEmail;
  var loanAmount = req.body.amount;
  var term = req.body.term;

  var client = cb.getClient();

  client.getAccounts(function(err, accounts)
  {
    var acct = accounts[0];
    var args = {
           "to"     : recipientEmail,
           "amount" : loanAmount,
           "notes"  : "A loan, to be paid back within "+term
         };
    acct.transferMoney(args, function(err, txn)
    {
      if(err) console.log("error making loan", err.message);
      console.log("made loan", txn);
      res.send(txn);
    });
  })
});

module.exports = router;

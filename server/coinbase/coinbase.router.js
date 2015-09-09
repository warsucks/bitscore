var router = require('express').Router();
var cb = require('./coinbase.js');
var https = require('https');
console.log("cb", cb);

router.get('/account', function(req, res, next)
{
  var client = cb.getClient();
  console.log("router got client", client);

  client.getAccounts(function(err, accounts)
  {
    console.log("router got accounts", accounts);
    var acct = accounts[0];
    res.send(acct);
  })
});

router.use('/transactions', function(req, res, next)
{
  var client = cb.getClient();
  console.log("router got client", client);

  client.getAccounts(function(err, accounts)
  {
    console.log("router got accounts", accounts);
    accounts.forEach(function(acct)
    {
      acct.getTransactions(1, 10, function(err, txns)
      {
        if(err) console.log("error", err.message);
        console.log("router got transactions", txns);
        res.send(txns);
      })
    });
  })
});

router.post('/loan', function(req, res, next)
{
  var recipientEmail = req.body.recipientEmail;
  var loanAmount = req.body.amount;
  var term = req.body.term;

  var client = cb.getClient();
  console.log("router got client", client);

  client.getAccounts(function(err, accounts)
  {
    console.log("router got accounts", accounts);
    var acct = accounts[0];
    var args = {
           "to"     : recipientEmail,
           "amount" : loanAmount,
           "notes"  : "A loan, to be paid back within "+term
         };
    acct.transferMoney(args, function(err, txn)
    {
      if(err) console.log("error making loan", err.message);
      res.send(txn);
    });
  })
});

module.exports = router;

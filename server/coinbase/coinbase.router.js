var router = require('express').Router();
var cb = require('./coinbase.js');
var https = require('https');
console.log("cb", cb);

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

module.exports = router;

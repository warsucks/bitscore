var router = require('express').Router();
var cb = require('./coinbase.js');
var request= require('request');
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
  var recipientId = req.body.recipientId;
  var loanAmount = req.body.loanAmount;
  var term = req.body.term;
  var rate = req.body.rate;

  var client = cb.getClient();

  client.getAccounts(function(err, accounts)
  {
    var acct = accounts[0];
    var url = 'http://52.88.202.193/api/createloan/'+acct.id+'/'+recipientId+'/'+loanAmount+'/'+term+'/'+rate;
    console.log("request url from jon", url);
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body)
        res.send(body);
      }
      else {
        console.log("there was an error", err);
      }
    })

    // var request = http.get('http://52.88.202.193/api/createloan/'+acct.id+'/'+recipientId+'/'+loanAmount+'/'+term+'/'+rate, function(err, response)
    // {
    //
    //
    //   // if(err) console.log("err", err.message);
    //   // console.log("inside http request to jon")
    //   // response.on("data", function(chunk)
    //   // {
    //   //   console.log("got data chunk from job", chunk)
    //   // })
    // });
    // var args = {
    //        "to"     : recipientEmail,
    //        "amount" : loanAmount,
    //        "notes"  : "A loan, to be paid back within "+term
    //      };

    // acct.transferMoney(args, function(err, txn)
    // {
    //   if(err) console.log("error making loan", err.message);
    //   console.log("made loan", txn);
    //   res.send(txn);
    // });
  })
});

module.exports = router;

app.factory("TransactionFactory", function($http)
{
  return {
    // makeLoan: function()
    // {
    //   var recipientEmail = req.body.recipientEmail;
    //   var loanAmount = req.body.amount;
    //   var term = req.body.term;
    // },

    getTransactions: function()
    {
      return $http.get('/coinbase/transactions')
      .then(function(response)
      {
        console.log("client got response", response);
        console.log("client got transactions", response.data);
        return response.data;
      })
    }
  }
})

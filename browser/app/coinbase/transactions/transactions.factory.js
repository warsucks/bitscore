app.factory("TransactionFactory", function($http)
{
  return {
    makeLoan: function(recipientId, loanAmount, term, rate)
    {
      console.log("Transaction Factory making a loan");
      return $http.post('/coinbase/loan', {recipientId: recipientId, loanAmount: loanAmount, term: term, rate: rate})
      .then(function(response)
      {
        return response.data;
      });
    },

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

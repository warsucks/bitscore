app.factory("TransactionFactory", function($http)
{
  return {
    makeLoan: function(recipientEmail, loanAmount, term)
    {
      return $http.post('/coinbase/loan', {recipientEmail: recipientEmail, loanAmount: loanAmount, term: term})
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

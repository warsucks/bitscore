app.factory("TransactionFactory", function($http)
{
  return {
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

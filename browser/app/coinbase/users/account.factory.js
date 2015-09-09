app.factory("AccountFactory", function($http)
{
  return {
    getAccount: function()
    {
      return $http.get('/coinbase/account')
      .then(function(response)
      {
        return response.data;
      });
    }
  }
})

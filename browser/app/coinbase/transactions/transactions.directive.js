app.directive('transactions',function()
{
  return {
    templateUrl: '/browser/app/coinbase/transactions/transactions.html',
    controller: function($scope, TransactionFactory)
    {
      TransactionFactory.getTransactions()
      .then(function(transactions)
      {
        console.log("transaction controller got transactions", transactions);
        $scope.transactions = transactions;
      });
    }
  };
});

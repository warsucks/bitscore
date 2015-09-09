app.config(function ($stateProvider) {
	$stateProvider.state('loan', {
		url: '/loan',
		templateUrl: '/browser/app/coinbase/loan-setup/make.loan.html',
    controller: function($scope, $state, AccountFactory, TransactionFactory)
    {
      $scope.loanSuccess = false;
      $scope.makeLoan = function()
      {
        TransactionFactory.makeLoan($scope.recipientId, $scope.loanAmount, $scope.term, $scope.rate)
        .then(function(txn)
        {
          $scope.loanSuccess = true;
        });
      }
      AccountFactory.getAccount()
      .then(function(account)
      {
        $scope.account = account;
      });
    }
	});
});

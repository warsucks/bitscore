app.config(function ($stateProvider) {
	$stateProvider.state('loan', {
		url: '/loan',
		templateUrl: '/browser/app/coinbase/loan-setup/make.loan.html',
    controller: function($scope, $state, AccountFactory, TransactionFactory)
    {
      $scope.makeLoan = function()
      {
        TransactionFactory.makeLoan($scope.recipientEmail, $scope.loanAmount, $scope.term)
        .then(function(txn)
        {
          $scope.madeLoan = txn;
          $state.go('home');
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

app.config(function ($stateProvider) {
	$stateProvider.state('loan', {
		url: '/loan',
		templateUrl: '/browser/app/coinbase/loan-setup/make.loan.html',
    controller: function($scope, AccountFactory)
    {
      AccountFactory.getAccount()
      .then(function(account)
      {
        $scope.account = account;
      });
    }
	});
});

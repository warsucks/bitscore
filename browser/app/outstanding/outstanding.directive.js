app.directive('outstanding',function() {
  return {
    templateUrl: '/browser/app/outstanding/outstanding.html',
    controller: function ($scope,$http,OutstandingFactory,AccountFactory) {
    	AccountFactory.getAccount()
    		.then(function(account){
    			console.log(account);
    			return account.id;
    		})
    		.then(function(user){
    			console.log(user);
    			return OutstandingFactory.getLoans(user);
    			}) 
    		.then(function(loans){
    			console.log(loans);
    			$scope.loans=loans;});
    	$scope.payLoan = function (loanid) {
    		var url = 'http://52.88.202.193/api/loanpaid/'+loanid;
    		$http.get(url).then(function(){console.log('paid');});
    	};
    }
  };
});
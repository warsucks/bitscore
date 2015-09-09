app.directive('outstanding',function() {
  return {
    templateUrl: '/browser/app/outstanding/outstanding.html',
    controller: function ($scope,OutstandingFactory) {
    	OutstandingFactory.getLoans('ABHNiuu8rn61hfvbHiBkTyrD6WFPVXKJ8RvT') //jon
    		.then(function(loans){
    			$scope.loans=loans;
    		});
    }
  };
});
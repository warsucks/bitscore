app.directive('outstanding',function() {
  return {
    templateUrl: '/browser/app/outstanding/outstanding.html',
    controller: function ($scope,Outstanding) {
    	Outstanding.getLoans()
    		.then(function(loans){
    			$scope.loans=loans;
    		});
    }
  };
});
app.directive('outstanding',function() {
  return {
    templateUrl: '/browser/app/outstanding/outstanding.html',
    controller: function ($scope,OutstandingFactory) {
    	$scope.loans = OutstandingFactory.getLoans('12RL3jsBWLavvG4f9a3S6MagRZo7Ai24CK');
    }
  };
});
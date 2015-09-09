app.directive('graph',function() {
  return {
    templateUrl: '/browser/app/graph/graph.html',
    controller: function ($scope,AccountFactory) {
    	AccountFactory.getAccount().then(function(account){
    		$scope.user = account.id;
    	});
    }
  };
});
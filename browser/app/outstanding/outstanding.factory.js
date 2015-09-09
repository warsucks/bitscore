app.factory('OutstandingFactory',function($http){
	return {
		getLoans: function (user) {
			return $http.get('http://52.88.202.193/api/loanlist/'+user+'/')
				.then(function(response){
					return response.data.loans;
				});
		}
	};
});
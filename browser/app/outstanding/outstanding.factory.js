app.factory('OutstandingFactory',function($http){
	return {
		getLoans: function (user) {
			var url = 'http://52.88.202.193/api/loanlist/'+user+'/';
			console.log(url)
			return $http.get(url)
				.then(function(response){
					return response.data.loans;
				});
		}
	};
});
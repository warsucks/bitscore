app.factory('OutstandingFactory',function($http){
	return {
		getLoans: function (user) {
			// $http.get('http://52.88.202.193/api/user/'+user+'/')
			// 	.then(function(response){
			// 		return response.data;
			// 	});
			return {'lender': 'kathy', 'amount': '1 billion BTC', 'dueby': 'September 9, 2099'}
		}
	};
});
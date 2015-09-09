app.factory('Outstanding',function($http){
	return {
		getLoans: function (user) {
			$http.get('http://52.88.202.193/api/user/12RL3jsBWLavvG4f9a3S6MagRZo7Ai24CK/')
				.then(function(response){return response.data;});
		}
	};
});
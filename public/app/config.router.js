(function() {
	angular.module('powered-persons').config(configuration);

	configuration.$inject = ['$stateProvider', '$urlRouterProvider'];

	function configuration($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/access");


		$stateProvider
			.state('access', {
				url: '/access',
				templateUrl: '/app/LogIn/LogIn.template.html',
				controller: 'loginCtrl',
				controllerAs: 'login'
			})
			.state('dashboard', {
				url: '/dashboard',
				templateUrl: '/app/dashboard/dashboard.template.html',
			});


	}
})();
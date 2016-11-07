libApp.config(['$stateProvider', '$locationProvider',  function($stateProvider, $locationProvider){
	$locationProvider.html5Mode({enabled: true, requireBase: false});
	$stateProvider
		.state('root', {
			abstract: true,
			url: '',
			views: {
				'header': {templateUrl: 'shared/headerView.html'},
				'footer': {templateUrl: 'shared/footerView.html'}
			}
		})
		.state('main', {
			url: '/',
			parent: 'root',
			views: {
				"@" : {
					templateUrl: 'components/main/mainView.html',
					controller: 'MainCtrl'
				}
			}
		})
	}
]);

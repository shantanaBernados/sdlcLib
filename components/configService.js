libApp.factory('ConfigService', function() {
	return {
		getBEService: function(suffix) {
			return 'http://10.192.21.13/FPTLibrary/' + suffix;
		}
	}	
})
libApp.factory('MainService', ['$http', 'ConfigService', function($http, ConfigService) {
	return {
		getAllBooks: function() {
			return $http.get(ConfigService.getBEService('Books')).then(function(res) {
				return res.data;
			})
		},
		addBook: function(book) {
			return $http.post(ConfigService.getBEService('Books'), book).then(function(res) {
				return {status: 'success', message: res.data.Title + ' succesfully added'};
			})
		},
		deleteBook: function(bookID) {
			return $http.delete(ConfigService.getBEService('Books/'+bookID)).then(function(res) {
				return {status: 'success', message: res.data.Title + ' succesfully deleted'};
			})
		},
		editBook: function(book) {
			return $http.put(ConfigService.getBEService('Books'), book).then(function(res) {
				return {status: 'success', message: book.Title + ' succesfully edited'};
			})
		},
		getAllCategories: function() {
			return $http.get(ConfigService.getBEService('Categories')).then(function(res) {
				return res.data;
			})
		}
	}
}]);
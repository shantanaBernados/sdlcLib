libApp.controller('MainCtrl', ['$scope', '$filter', 'uiGridConstants', 'MainService', function($scope, $filter, uiGridConstants, MainService) {
	$scope.yeah = 'chincha';

	var categories = [
		{id: 1, name: 'Adventure'},
		{id: 2, name: 'Classic'},
		{id: 3, name: 'Drama'},
		{id: 4, name: 'Fantasy'},
		{id: 5, name: 'Horror'},
		{id: 6, name: 'Romance'},
		{id: 7, name: 'Tragedy'}
	]

	var data = [
		{
			isbn: '1-23-456789-1',
			title: 'A Tale of Two Cities',
			author: 'Charles Dickens',
			yearPub: '2013',
			category: categories[4],
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			publisher: 'Penguin Books'
		},
		{
			isbn: '2-12-345678-2',
			title: 'How To Kill a Mockingjay',
			author: 'Suzanne Collins',
			yearPub: '2012',
			category: categories[1],
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			publisher: 'Penguin Books'
		},
		{
			isbn: '3-12-345678-3',
			title: 'Peter Piper',
			author: 'Alo Hamora',
			yearPub: '2010',
			category: categories[3],
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			publisher: 'Penguin Books'
		}
	];

	$scope.searchText = '';
	$scope.bookModel = {};
	$scope.selectedBooks = [];
	$scope.categories = categories;

	$scope.gridOptions = {
		enableSorting: true,
		enableColumnMenus: false,
		enablColumnResizing: true,
		paginationPageSizes: [10, 15, 25, 50],
		paginationPageSize: 10,
		onRegisterApi: function(gridApi) {
			$scope.gridApi = gridApi;
		},
		columnDefs: [
			{
				field: 'isbn', 
				displayName: 'ISBN Code',
				cellTemplate: '<div class="ui-grid-cell-contents"><button class="btn-link" ng-click="grid.appScope.viewBook(row.entity)" data-toggle="modal" data-target="#bookDetailsModal">{{row.entity.isbn}}</button></div>'
			},
			{field: 'title'},
			{field: 'author', displayName: 'Author Name'},
			{field: 'yearPub', displayName: 'Year Published'},
			{field: 'category.name', displayName: 'Category'}
		]
	};

	$scope.gridOptions.data = data;

	// Service to get books from DB

	$scope.addBook = function() {
		// MainService.addBook($scope.bookModel)
	}

	$scope.editBook = function() {
		// MainService.editBook($scope.bookModel)
	}

	$scope.deleteBook = function(id) {
		//  MainService.deleteBook(id)
	}

	$scope.deleteBooks = function() {
		// MaingService.deleteBooks($scope.selectedBooks)
	}

	$scope.search = function() {
		$scope.gridOptions.data = $filter('filter')(data, $scope.searchText);
	}

	$scope.viewBook = function(book) {
		$scope.bookModel = book;
	}

	$scope.submitBookForm = function() {
		$scope.status = {
			status: 'success',
			message: 'WEEEEE'
		}
		$('#bookModal').modal('hide');
	}

	$('#bookModal').on('hide.bs.modal', function(e) {
		$scope.bookModel = {};
		$scope.bookForm.$setPristine();
		document.getElementById('bookForm').reset();
		$scope.validate = false;
		$('#categories').prop('selectedIndex', 0);
	});


}]);
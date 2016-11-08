libApp.controller('MainCtrl', ['$q', '$scope', '$filter', 'uiGridConstants', 'MainService', function($q, $scope, $filter, uiGridConstants, MainService) {
	$scope.yeah = 'chincha';

	// var categories = [
	// 	{Id: 1, name: 'Adventure'},
	// 	{Id: 2, name: 'Classic'},
	// 	{Id: 3, name: 'Drama'},
	// 	{Id: 4, name: 'Fantasy'},
	// 	{Id: 5, name: 'Horror'},
	// 	{Id: 6, name: 'Romance'},
	// 	{Id: 7, name: 'Tragedy'}
	// ]
	// $scope.categories = categories;

	var origData = [];

	$scope.searchText = '';
	$scope.bookModel = {};
	$scope.selectedBooks = [];
	$scope.noData = {
		message: 'No Record Found'
	}

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
				field: 'IsbnCode', 
				displayName: 'ISBN Code',
				cellTemplate: '<div class="ui-grid-cell-contents"><button class="btn-link" ng-click="grid.appScope.viewBook(row.entity)" data-toggle="modal" data-target="#bookDetailsModal">{{row.entity.IsbnCode}}</button></div>'
			},
			{field: 'Title'},
			{field: 'AuthorName', displayName: 'Author Name'},
			{field: 'YearPublish', displayName: 'Year Published'},
			{field: 'CategoryName', displayName: 'Category'}
		]
	};

	// Service to get books from DB

	$scope.getCategories = function() {
		MainService.getAllCategories().then(function(data) {
			$scope.categories = data;
		}, function(err) {
			$scope.status = {
				status: 'error',
				message: err.data.Message		
			}
		})
	}

	$scope.getBooks = function() {
		$scope.noData.message = 'Loading...';
		MainService.getAllBooks().then(function(data) {
			origData = data;
			$scope.gridOptions.data = data;
			$scope.noData.message = 'No Record Found';
		}, function(err) {
			$scope.status = {
				status: 'error',
				message: err.data.Message
			}
			$scope.noData.message = 'No Record Found';
		})
	}

	$scope.addBook = function() {
		$scope.bookModel.CategoryName = ($filter('filter')($scope.categories, {Id: $scope.bookModel.CategoryId}))[0].Name;
		MainService.addBook($scope.bookModel).then(function(res) {
			$scope.status = res;
			$scope.getBooks();
		}, function(err) {
			$scope.status = {
				status: 'error',
				message: err.data.Message
			}
		})
	}

	$scope.editBook = function() {
		MainService.editBook($scope.bookModel).then(function(res) {
			$scope.status = res;
			$scope.getBooks();
		}, function(err) {
			$scope.status = {
				status: 'error',
				message: err.data.Message
			}	
		})
	}

	$scope.deleteBooks = function() {
		var promises = [];
		$scope.gridApi.selection.getSelectedRows().forEach(function(book) {
			promises.push(MainService.deleteBook(book.IsbnCode));
		});
		$q.all(promises).then(function(res) {
			$scope.status = {
				status: 'success',
				message: 'Successfully deleted all selected books'
			}
			$scope.getBooks();
		}, function(err) {
			$scope.status = {
				status: 'error',
				message: err.data.Message
			}
		})
	}

	$scope.search = function() {
		$scope.gridOptions.data = $filter('filter')(origData, $scope.searchText);
	}

	$scope.viewBook = function(book) {
		$scope.bookModel = book;
	}

	$scope.submitBookForm = function() {
		if ($scope.action == 'add') $scope.addBook();
		else if ($scope.action == 'edit') $scope.editBook();
		
		$('#bookModal').modal('hide');
	}

	$scope.reAssignModel = function() {
		$scope.bookModel = $.extend(true, {}, $scope.origModel);
		if ($scope.action == 'add') $scope.resetForm();
	}

	$scope.resetStatus = function() {
		$scope.status = {};
	}

	$scope.resetForm = function() {
		document.getElementById('bookForm').reset();
	}

	var clearForm = function() {
		$scope.bookModel = {};
		$scope.bookForm.$setPristine();
		$scope.validate = false;
		if ($scope.action == 'add') $scope.resetForm();
		$('#categories').prop('selectedIndex', 0);
	}

	$('#bookModal').on('hide.bs.modal', clearForm);


	$scope.getCategories();
	$scope.getBooks();

}]);
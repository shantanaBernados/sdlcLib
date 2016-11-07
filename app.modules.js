'use strict'

var libApp = angular.module('libApp', [
	'ui.router',
	'ui.grid',
	'ui.grid.pagination',
	'ui.grid.resizeColumns',
	'ui.grid.autoResize',
	'ui.grid.selection'
]);

libApp.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
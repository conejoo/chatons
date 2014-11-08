app.directive('maximizar', function() {
	return {
		restrict: "E",
		scope: {
			moneda: '='
		},
		templateUrl : 'assets/views/directiva-maximizar.html',
		controller: ['$scope',  function($scope) {
			$scope.style = {
				"max-height":$(window).height(),
				"max-width":$(window).width()
			}
		}]
	}
});
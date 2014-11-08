app.directive('aviso', function() {
	return {
		restrict: "E",
		scope: {
			moneda: '=',
			tipos: '='
		},
		templateUrl : 'assets/views/directiva-aviso.html',
		controller: ['$scope', '$sce',  function($scope, $sce) {
			$scope.trustHtml = $sce.trustAsHtml;
			$scope.carouselInterval = 5000;
		}]
	}
});
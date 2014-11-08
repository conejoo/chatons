app.directive('mainCategory', function() {
	return {
		restrict: "E",
		scope: {
			category: "=",
			handler: "=",
			selected_category: "=selectedCategory"
		},
		templateUrl : 'assets/views/directiva-main-category.html',
		controller: ['$scope',  function($scope) {
			$scope.pick_category = function(category){
				$scope.handler(category);
			}
		}]
	}
});
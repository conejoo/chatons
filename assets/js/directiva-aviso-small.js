app.directive('avisoSmall', function() {
	return {
		restrict: "E",
		scope: {
			item: "="
		},
		templateUrl : 'assets/views/directiva-aviso-small.html',
		controller: ['$scope', '$modal',  function($scope, $modal) {
			$scope.show_details = function(){
				var modalInstance = $modal.open({
					templateUrl: 'assets/views/modal-details.html',
					controller: 'ModalDetailsCtrl',
					size: 'lg',
					resolve: {
						item: function () {
							return $scope.item;
						}
					}
				});
				modalInstance.result.then(function(success){
					$(".zoomContainer").remove();
				}, function(){
					$(".zoomContainer").remove();
				});
			}
		}]
	}
});
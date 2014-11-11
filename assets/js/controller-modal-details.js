app.controller('ModalDetailsCtrl', function ($scope, $modalInstance, item, $sce) {
	$scope.item = item;
	$scope.selected_img = item.images[0];
	$scope.trustHtml = $sce.trustAsHtml;
	$scope.ok = function () {
		$modalInstance.close();
	};
	$scope.select_image = function(image){
		$scope.selected_img = image;
	}
});
app.controller('ModalDetailsCtrl', function ($scope, $modalInstance, item, $sce) {
	$scope.item = item;
	$scope.trustHtml = $sce.trustAsHtml;
	$scope.ok = function () {
		$modalInstance.close();
	};
});
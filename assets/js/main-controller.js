app.controller('mainController', ['$scope', '$http', '$modal', '$location', MainControllerSettings]);

function MainControllerSettings($scope, $http, $modal, $location) {
	var start_categoria = $location.search().categoria;
	var start_collection = $location.search().coleccion;
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
	function getRandomIntsArray(max, n){
		var arr = [];
		if(max <= n){
			for(var i = 0; i < max; i++)
				arr.push(i);
			return arr;
		}
		while(arr.length < n){
			var randomnumber = getRandomInt(0, max);
			var found=false;
			for(var i = 0; i < arr.length; i++)
				if(arr[i] == randomnumber){
					found=true;break
				}
			if(!found)
				arr[arr.length] = randomnumber;
		}
		return arr;
	}
	$scope.footer_image_style = {
		'background-image': "url('imagenes/fondo" + getRandomInt(1, 33) + ".jpg')"
	};
	$scope.filtered_items = [];
	$scope.find_category_by_id = function(categories, category_id){
		for(var i = 0;i < categories.length; i++){
			var current_cat = categories[i];
			if(current_cat.id == category_id)
				return current_cat;
			current_cat = _.find(current_cat.children, function(child){return child.id == category_id});
			if(current_cat)
				return current_cat;
		}
		return undefined;
	};
	$scope.complete_items = function(items, collection){
		for(var i = 0;i<items.length;i++){
			var text = "";
			for(var key in items[i])
				text += " "+items[i][key];
			items[i].text = text;
			items[i].imagenesMin = jQuery.extend(true, {}, items[i].images);
			items[i].imagenesMax = jQuery.extend(true, {}, items[i].images);
			items[i].collection = collection;
		}
	}
	$scope.complete_categories = function(categories){
		for(var i = 0;i<categories.length;i++){
			categories[i].children_ids = _.pluck(categories[i].children, "id");
			_.forEach(categories[i].children, function(child){
				child.children_ids = [];
				child.parent = categories[i];
			});
		}
	}
	$scope.check_category = function(item, category){
		for(var i = 0; i < item.categories.length; i++)
			if(item.categories[i] == category.id || category.children_ids.indexOf(item.categories[i]) != -1)
				return true;
		return false;
	}
	$scope.pick_new_category_monedas = function(category){
		var filter = function(item){return $scope.check_category(item, category);};
		$scope.filtered_items = _.filter($scope.monedas.items, filter);
		$scope.selected_category = category;
		$scope.last_fn = $scope.pick_new_category_monedas;
		$scope.filtrotext = "";
		$location.search('categoria', category.id);
		$location.search('coleccion', 'monedas');
	}
	$scope.pick_new_category_chatons = function(category){
		var filter = function(item){return $scope.check_category(item, category);};
		$scope.filtered_items = _.filter($scope.chatons.items, filter);
		$scope.selected_category = category;
		$scope.last_fn = $scope.pick_new_category_chatons;
		$scope.filtrotext = "";
		$location.search('categoria', category.id);
		$location.search('coleccion', 'chatons');
	};
	$http.get("db/chatons.json?version="+(new Date().getTime())).success(function(data){
		$scope.chatons = data;
		$scope.chatons.items = _.filter($scope.chatons.items, function(item){return !item.hidden});
		$scope.chatons.categories = _.filter($scope.chatons.categories, function(item){return !item.hidden});
		$scope.complete_items($scope.chatons.items, "chatons");
		$scope.complete_categories($scope.chatons.categories);
		if(start_collection == 'chatons'){
			var start_cat_obj = $scope.find_category_by_id($scope.chatons.categories, start_categoria);
			if(start_cat_obj)
				$scope.pick_new_category_chatons(start_cat_obj);
			else 
				start_collection = undefined;
		}
		if(!start_collection){
			var random_items_index = getRandomIntsArray($scope.chatons.items.length, 3);
			for(var i = 0;i < random_items_index.length; i++)
				$scope.filtered_items.unshift($scope.chatons.items[random_items_index[i]]);
		}
	});
	$http.get("db/monedas.json?version="+(new Date().getTime())).success(function(data){
		$scope.monedas = data;
		$scope.monedas.items = _.filter($scope.monedas.items, function(item){return !item.hidden});
		$scope.monedas.categories = _.filter($scope.monedas.categories, function(item){return !item.hidden});
		$scope.complete_items($scope.monedas.items, "monedas");
		$scope.complete_categories($scope.monedas.categories);
		_.forEach($scope.monedas.items, function(moneda){
			moneda.krause_description = $scope.monedas.krause[moneda.krause];
		});
		if(start_collection == 'monedas'){
			var start_cat_obj = $scope.find_category_by_id($scope.monedas.categories, start_categoria);
			if(start_cat_obj)
				$scope.pick_new_category_monedas(start_cat_obj);
			else
				start_collection = undefined;
		}
		if(!start_collection){
			var random_items_index = getRandomIntsArray($scope.monedas.items.length, 3);
			for(var i = 0;i < random_items_index.length; i++)
				$scope.filtered_items.push($scope.monedas.items[random_items_index[i]]);
		}
	});
}
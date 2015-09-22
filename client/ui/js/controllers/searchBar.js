aroCityApp.controller('searchBarController',function($scope,$rootScope,$location,defaultVal,restAPI){
	
	
	//set default values
	$scope.selectedCity = defaultVal.defaultValues.selectDropDownVal;
	  //$('#selectCityModal').modal('show')	 
	  var restApi = restAPI.get({method:'fetchDistinctCities'},function(){      
	  $scope.cities = restApi.json;
	 
	  var storeItems = [];	
	  angular.forEach(restApi.json,function(data){		  	 
		  this.push(data.name);
		  this.push(data.retailerName);
		  this.push(data.brandName);		 
	  },$scope.storeItems = storeItems);
    });
	
		
	//select  city event of search box 
	$scope.selectCity = function(city){					
		$scope.selectedCity = city;	
		var restApi = restAPI.get({method:'fetchHomeBrandTilesInfo',cityName:city},function(){  			
			 $rootScope.homeTiles = restApi.json;					 
    	});
	},
	$scope.onSelect = function(item,model,lbl){			
		if($scope.selectedCity != null || $scope.selectedCity != ''){
			$scope.searchProducts($scope.selectedCity,item)
		}
		
	},
	$scope.searchProducts= function(selectedCity,searchItem){
		if(selectedCity == 'Select City' || selectedCity  == 'All')	{
			selectedCity = 'All';
			console.log('City : ', selectedCity , ' Item :' , searchItem)
		}
		else{
			console.log('City : ', selectedCity , ' Item :' , searchItem)
		}
		
		
		/*
		@@@@ //set the values which have to be access in another controller
		
		var oSearchParams ={'selectedCity':selectedCity,'searchItem':searchItem};	    
		$rootScope.$broadcast('sendToSearchedPageController',oSearchParams); 
		
		*/
		
		//changing the URL for serached details view 
		var _url = '/searchedDetails/'+selectedCity+"/"+searchItem
		$location.path(_url);
						
	}		 	
});
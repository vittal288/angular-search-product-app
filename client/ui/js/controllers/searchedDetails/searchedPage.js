aroCityApp.controller('searchedPage',function($scope,$rootScope,$location,restAPI){
	//console.log(' I am in searched page controller !!!');
	//passing a values to controller 
	/*$rootScope.$on('sendToSearchedPageController',function(event,oSearchParams){					
		//http://localhost:9000/rest-api/fetchProductInfoByCity/Bengaluru/Reliance%20Digital
		//console.log(oSearchParams);
		console.log('URL' , $location.path());		
		var restApi = restAPI.get({method:'fetchProductInfoByCity',cityName:oSearchParams.selectedCity,srchItem:oSearchParams.searchItem},function(){  						
				console.log('Data : ' , restApi.json);
				$rootScope.searchedProducts = restApi.json;					 
		});		
	});*/
	
			
	var _selectedCity = $location.path().split('/')[2],
		_searchItem   = $location.path().split('/')[3],
		_arrSearchedProds =[],
		_brands =[],
		_restApi;
		
	    _restApi = restAPI.get({method:'fetchProductInfoByCity',cityName:_selectedCity,srchItem:_searchItem},function(){ 
		   _arrSearchedProds = 	_restApi.json;	
		   
		   angular.forEach(_arrSearchedProds,function(obj){			   
			   _brands.push(obj.brandName);
		   });
		   
		   //removing duplicates entry from _brand array
		   $scope.brands = _.unique(_brands, function(item){ return item});		   		   	
		   $scope.searchedProducts = _arrSearchedProds;		   		  		   				 
	});	
	
	
	
	
	
	$scope.arrSelectedBrands=[];	
	// toggle selection brands
	$scope.toggleSelection = function(brand) {
		var idx = $scope.arrSelectedBrands.indexOf(brand);
	
		// is currently selected
		if (idx > -1) {
			//splice method removes the elemnt based on its index
			$scope.arrSelectedBrands.splice(idx, 1);
		}	
		// is newly selected
		else {
			$scope.arrSelectedBrands.push(brand);
		}
		
		
		
		//refersh the view based on brand selection 
		var _arrFiltered = [],			
			_arrLen = $scope.arrSelectedBrands .length;	
		console.log('LEN :' ,_arrLen)
		
		if(_arrLen > 0){
				for(var i=0;i<_arrLen;i++){
				console.log('ELSE');
				var brand = $scope.arrSelectedBrands [i];				
				angular.forEach(_arrSearchedProds,function(obj){	
					if(brand == obj.brandName){
						_arrFiltered.push(obj)
					}		   			   
				});
				$scope.searchedProducts = _arrFiltered;						
			}				
		}
		//if there is no selection of brands
		else{
			$scope.searchedProducts = _arrSearchedProds;	
		}		
	};											
});


aroCityApp.filter('removeDuplicates',function(){			
	return function(arrData) {	 
	 var arrDupilcateFree =  _.uniq(arrData, function (item) {
                return item.brandName;
            }); 
	return arrDupilcateFree;   
   };	
});
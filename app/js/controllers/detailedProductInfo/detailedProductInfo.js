aroCityApp.controller('detailedProductInfo',function($scope,$rootScope,$location,restAPI){
	
	//console.log('I am in detailedProductInfo controller');
	
	console.log($location.path())
	var _city = $location.path().split('/')[2],
	    _prodId = $location.path().split('/')[3];
		
	//http://localhost:9000/rest-api/fetchDetailedProductInfo/prodId/2
	var restApi = restAPI.get({method:'fetchDetailedProductInfo',prodId:_prodId},function(){ 
		   									
		   $scope.productDetails = restApi.json;
		   //console.log('DATA :' ,restApi.json)	
		  		   				 
	});	
	
	$scope.navigateBtwTabs = function(evt){
		console.log('data', evt.children());
		/*if ($(this).parent('li').hasClass('active')) {
                $($(this).attr('href')).hide();
		}
		else
		{
			evt.preventDefault();
			$(this).tab('show');
		}*/
	}
	  
});



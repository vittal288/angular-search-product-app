aroCityApp.controller('homePage',function($scope,$rootScope,$http,restAPI){	
    
    //call rest api 		        	                          
    var restApi = restAPI.get({method:'fetchHomeBrandTilesInfo',cityName:'Bengaluru'},function(){      
	     $rootScope.homeTiles = restApi.json;       
    });
     
});



aroCityApp.factory('sampleFactory',function($http){		
	var factory ={};
	factory.getRecords = function(fnCalBack){
		var restAPI = $http.get('http://www.w3schools.com/angular/customers.php');
		restAPI.success(function(res){
			if(fnCalBack){
				return fnCalBack({data:res.records});
			}
		});
	};
	factory.putRecords = function(records){
		//your code
	};
	return factory;
});

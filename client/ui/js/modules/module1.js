var module1 = angular.module('module1',[]);


module1.factory('module1InjectMe',function($log){
	
	var myObj = {};
	myObj.param = 'Hello I am in another module'
	myObj.method = function(name){		
		$log.info(name + ' I am a Method of another module !!!'+ new Date());
	}	
		
	return{
		myObj: myObj		
	}
});
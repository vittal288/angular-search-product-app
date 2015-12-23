var aroCityApp = angular.module('aroCityApp', ['ngRoute','ngResource','module1','ui.bootstrap']);
console.log('AroCity App is running with 0.0.1 version ');

//console.log('UI BOOTSTRAP---->')
//set constant here
aroCityApp.constant('configs',{
		restAPIPram:{
			protocal:'http',
			host:'localhost',
			port:'9000',
			restAPIPath:'rest-api'
		}
});

//set default vaues
aroCityApp.value('defaultVal',{
		defaultValues:{
			'selectDropDownVal' : 'Select City'
		}
});


//define routes
aroCityApp.config(function($routeProvider){
		$routeProvider
		.when('/',{
			controller:'homePage',
			templateUrl:'views/home/show.html'
		})
		.when('/searchedDetails/:selectedCity/:searchedItem',{
			controller:'searchedPage',
			templateUrl:'views/searchedDetails/show.html'
		})
		.when('/detailedProductInfo/:selectedCity/:selectedProdId',{
			controller:'detailedProductInfo',
			templateUrl:'views/detailedProductInfo/show.html'
		})
		.when('/createUser/',{
			controller:'createUser',
			templateUrl:'views/user/createUser.html'
		})		
		.otherwise({redirectTo:'/'});
});

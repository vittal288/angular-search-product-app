/*aroCityApp.directive('tabsDirective',function(){	
	return{
		//restrict:'a',
		templateUrl:'views/detailedProductInfo/tabs.html',
		link:function(scope,element,attr){
			//console.log('element' , element);			
		}
	}
});*/


aroCityApp.directive('tabsProdinfo',function(){
	return{
		restrict:'E',		
		templateUrl:'views/detailedProductInfo/tabs.html',
		link:function(scope,element,attr){
			//console.log('element' , element);			
		}
	}
});


/*
.directive('tabset', function() {
  return {
    restrict: 'EA',
    transclude: true,
    replace: true,
    scope: {
      type: '@'
    },
    controller: 'TabsetController',
    templateUrl: 'template/tabs/tabset.html',
    link: function(scope, element, attrs) {
      scope.vertical = angular.isDefined(attrs.vertical) ? scope.$parent.$eval(attrs.vertical) : false;
      scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;
    }
  };
})
 */



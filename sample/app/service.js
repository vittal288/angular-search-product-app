var app = angular.module('MyApp',[]);
app.filter('reverse',[function(){
    
    return function(string){
        return string.split('').reverse().join('');
    };
}]);

/*
app.directive('sampleDir',function(){   
   return{
       restrict:'EA',
       template:'<p>asdadad</p>'
   };
});

*/
 
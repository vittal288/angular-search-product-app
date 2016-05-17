aroCityApp.controller('loginController',function($scope,$q,$location,APIService,$window){    
    var deferred = $q.defer(); 
    $scope.loginUser = function (user) {              
        var userInfo ={'user':user};  
        APIService.callRESTAPI('POST','token-key','authUser',userInfo).
        then(function(response){            
            deferred.resolve(response);           
            if(response.data.json.length > 0){                              
                 $window.sessionStorage.userExist =JSON.stringify(response.data.json);
                  $location.path("/");  
            }
            else{
                $location.path("/login");               
            }            
        }).catch(function(response){
            deferred.reject(response);
            console.log('ERROR',response);
        });                       
    };
});

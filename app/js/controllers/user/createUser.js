aroCityApp.controller('createUser',function($scope,$rootScope,$http){
  console.log('I am in createUser controller!!!');



  $scope.createUser = function(user){
    console.log('User infor',user);
  }
});

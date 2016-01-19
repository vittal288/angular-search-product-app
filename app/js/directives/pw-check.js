//directive using attribute
aroCityApp.directive('pwCheck',function(){
    return{
      require:'ngModel',
      link:function(scope,elem,attr,ctrl){
        var firstPassword = '#'+attr.pwCheck;
        elem.add(firstPassword).on('keyup',function(){
          scope.$apply(function(){
            var v = elem.val()===$(firstPassword).val();
            ctrl.$setValidity('pwmatch',v);
          });
        });
      }
    }
});

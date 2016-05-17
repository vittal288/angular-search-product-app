//'use strict';
describe('Controller: homePage', function () {

    var MainCtrl,
        scope,
        http,
        rest_API;
    // load the controller's module
    beforeEach(module('aroCityApp',function($provide){
        $provide.service('restAPI',function(restapi){
            rest_API = restapi;
        });
    }));


    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope,$http) {
      scope = $rootScope.$new();
      MainCtrl = $controller('homePage', {
        $scope: scope,
        $http:http,
        restAPI:rest_API
      });
    }));

    it('should have homePage Controller',function(){
      expect(aroCityApp.homePage);
    });

    /*it('should have REST API Service',inject(['restAPI',function(restAPI){
        expect(restAPI)
    }]));*/

    it('shold have no items to start',function(){
      expect(scope.todos.length).toBe(0);
    });

    //add item
    it('shold add item to the list',function(){
        scope.todo ='Test Item';
        scope.addTodo();
        expect(scope.todos.length).toBe(1);
    });

    //remove item
    it('should remove an item from the list',function(){
      scope.todo='Test Item';
      scope.removeTodo();
      expect(scope.todos.length).toBe(0);
    });

    //add and remove at a time
    it('should add and remove the item',function(){
      scope.todo='test item';
      scope.addTodo();
      scope.removeTodo(0);
      expect(scope.todos.length).toBe(0);
    });

});

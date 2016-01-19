'use strict';
describe('Services: REST API',function(){

  var mockResource, $httpBackend;
  beforeEach(angular.mock.module('aroCityApp'));

  beforeEach(function () {
      angular.mock.inject(function ($injector) {
          $httpBackend = $injector.get('$httpBackend');
          mockUserResource = $injector.get('User');
      });
  });

  //http://localhost:9000/rest-api/fetchHomeBrandTilesInfo/cityName/Bengaluru
  describe('Fetch Home Brand Tiles Info ', function () {
        it('should call fetchHomeBrandTilesInfo', inject(function (User) {
            $httpBackend.expectGET('/rest-api/fetchHomeBrandTilesInfo/cityName/Bengaluru')
                .respond([{
                username: 'test'
            }]);

            var result = mockUserResource.getUser('test');
            $httpBackend.flush();
            console.log(result)
            expect(result[0].username).toEqual('test');
        }));

  });

});

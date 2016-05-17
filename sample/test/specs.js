describe('Filters',function(){
    //inject the app 
    beforeEach(module('MyApp'));
    
    describe('reverse',function(){
      
        var reverse;
        beforeEach(inject(function($filter){
            reverse = $filter('reverse',{});            
        }));  
        
        it('Should reverse a string',function(){
           expect(reverse('abc')).toBe('cba');//pass
           expect(reverse('xyz')).toBe('zyx');//pass
           //expect(reverse('abc')).toBe('wer');//fail 
        });
    });
});
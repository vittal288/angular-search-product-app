aroCityApp.factory('APIService',function($http,$q,configs){
         
   var callRESTAPI = function (method,authKey,restAPIMethod,reqPayload){  
                var url =   configs.restAPIPram.protocal
                            +"://"+configs.restAPIPram.host
                            +":"+configs.restAPIPram.port
                            +"/"+configs.restAPIPram.restAPIPath+"/"+restAPIMethod;
                
                var reqObj =  JSON.stringify(reqPayload);
                var deferred = $q.defer();                                            
                 return $http({
                        method: method, 
                        url: url,                  
                        data: reqObj,
                        headers: {'Content-Type': 'application/json'}
                    }).
                    success(function(response) {
                        deferred.resolve(response);
                        console.log('SUCCESS',response);                        
                    })
                    .error(function(response) {
                      deferred.reject(response);
                       console.log('ERROR',response);
                    });   
    };                                		
    return {
        'callRESTAPI':callRESTAPI,        
    };	
                        		
});



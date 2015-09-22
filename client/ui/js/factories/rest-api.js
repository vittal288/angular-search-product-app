aroCityApp.factory('restAPI',function($resource,configs){		
			
	//$resource(url, [paramDefaults], [actions], options);		
	var url = configs.restAPIPram.protocal
	          +"://"+configs.restAPIPram.host
			  +":"+configs.restAPIPram.port
			  +"/"+configs.restAPIPram.restAPIPath
			 	
	return $resource(url+'/:method'+'/:cityName'+'/:srchItem'+'/:prodId',{},'GET','');
		
});
aroCityApp.filter('unique',function(){
	return function(collection, keyname) {
	  //console.log('col --->' , collection , 'keyname--->',keyname);
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
		  //console.log('City --->' , item ,'Key Name--->' , keyname);
		          //Bangalore[city]
          var key = item[keyname];	
		  //Bangalore
		  //console.log(key);	           
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });
	    //console.log('filter ', output)
      return output;
   };
});
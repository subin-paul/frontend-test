angular.module('frontEndTest')
.factory('Authenticate',['$http','$q','$cookies', function ($http,$q,$cookies) {
    // authentication api integration is done in this factory
    
    return {
      //this method will make a post request with the user entered credentials
      authenticate: function (user) {
        var defer=$q.defer();
        $http.post('/login',{"user":user.user,"password":user.password})
        .success(function(message){
          defer.resolve(message);
        }

        )
        .error(
          function(error){
            console.log("Error"+error);
            defer.reject(error);
          }
          );

        return defer.promise;
      },
      //this method will return a boolean value to indicate whether the user is logged in
      isLoggedIn:function(){
        if(typeof $cookies.get('login') != 'undefined'){
          return $cookies.get('login').length>0;
        }
        else{
          return false;
        }
        
      },
      //this method will logout the user, by clearing the cookie sent from the server
      logOut:function(){
        $cookies.put('login', "");
      },
      //this method will return the name of currently oggd in user
      getUser:function(){
        return $cookies.get('login');
      }
      
    };
  }]);
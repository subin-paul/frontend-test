angular.module('frontEndTest')
  .factory('GuestBook',['$http','$q','$cookies', function ($http,$q,$cookies) {
    // guest book api integration is done in this factory
    
    return {
      //this method will retreive all the stored messages from server
      getMessages: function () {
        var defer=$q.defer();
         $http.get('/read')
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
      //this method will post the user entered messages to server
      saveMessage:function(message){
        var defer=$q.defer();
         $http.post('/write',{"message":message.message,"phone":message.phone,"user":$cookies.get('login')})
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
      }
      
    };
  }]);
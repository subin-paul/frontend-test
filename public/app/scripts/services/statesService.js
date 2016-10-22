angular.module('frontEndTest')
.factory('States', ['$http','$q',function ($http,$q) {
    // State apis are integrated in this factory
    
    //variables to keep track of the offset and order
    var offset=0;
    var order=1;

    //this method will return the states from server based on offset
    function getStatesThroughOffset(offset){
        var defer=$q.defer();
        $http.get('/states/', {
          params: { "offset": offset }
        })
        .success(function(states){

          defer.resolve(states);
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
    return {
      //this method will be called initially to load the first set of states
      loadStates: function(){
        return getStatesThroughOffset(0);
      },
      //this method will return all the states abbrevation stored in server
      getStateAbbr: function () {
        var defer=$q.defer();
        $http.get('/states/abbreviations')
        .success(function(states){

          defer.resolve(states);
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
      //this method will get the state details based on state abbrevation passed
      getDetailsFrpmStateAbbr: function (abbr) {
        var defer=$q.defer();
        $http.get('/states/'+abbr)
        .success(function(states){

          defer.resolve(states);
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
      //this method will toggle the sort order
      toggleSort: function(){
        //toggle order
        order=order*-1;
        offset=0;
        var defer=$q.defer();
        $http.get('/states/', {
          params: { "sort": (function(){return order<0?"-name":"name" })() ,"offset": offset}
        })
        .success(function(states){

          defer.resolve(states);
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
      //this method will load the next set of states
      loadNextStates: function(){
         offset+=10;
         return getStatesThroughOffset(offset);
      },
      //this method will load the previous set of states
      loadPreviousStates:function(value){
        offset-=10;
        return getStatesThroughOffset(offset);
      },
      //this method will keep track of the offset
      getOffset:function(){
        return offset;
      }
      
      
    };
  }]);
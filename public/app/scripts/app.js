angular
.module('frontEndTest', [ 'ngRoute','ui.bootstrap','ngCookies'])
.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'app/views/login.html',
    controller: 'LoginCtrl'

  }).when('/states', {
    templateUrl: 'app/views/states.html',
    controller: 'StatesCtrl',
    resolve:{
     loadStates:function(States){
      return States.loadStates();
    }
  }
}).when('/guest-book', {
    templateUrl: 'app/views/guest-book.html',
    controller: 'GuestBookCtrl',
    resolve:{
     loadMessages:function(GuestBook){
      return GuestBook.getMessages();
    }
  }
})
  .otherwise({
        redirectTo: '/'
      });

});

  //controller logic for navbar
  angular
.module('frontEndTest').controller('NavCtrl', [
    '$scope',
    'Authenticate','$location',
    function($scope, Authenticate,$location){
      $scope.isLoggedIn = Authenticate.isLoggedIn;
      $scope.currentUser = Authenticate.getUser;
      $scope.logOut = function(){
        Authenticate.logOut();
        $location.path( '/' );
      }
      $scope.guestBook = function(){
        
        $location.path( '/guest-book' );
      }
      $scope.states = function(){
        
        $location.path( '/states' );
      }
    }]);

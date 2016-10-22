angular.module('frontEndTest')
//GuestBookCtrl is the controller in charge of guest-book.html
.controller('GuestBookCtrl', ['$scope','GuestBook','$location','loadMessages','$cookies',function ($scope,GuestBook,$location,loadMessages,$cookies) {
    //loadMessages will be loaded with messages that is stored in back end on first time load
    $scope.messages=loadMessages;
    

    //This method will make a hit to factory so as to persist the message entered by user
    $scope.addMessage=function(){
    //add to array
        $scope.messages.splice(0,0,{user:$cookies.get('login'), phone: $scope.phone, message:$scope.inputMessage});
    //make a call to the factory
     GuestBook.saveMessage({'message':$scope.inputMessage,'phone':$scope.phone}).then(function(data){console.log(data)},
        function(error){console.log(error)}
        );

    };


    
}]);
angular.module('frontEndTest')
  .controller('LoginCtrl',['$scope','Authenticate','$location', function ($scope,Authenticate,$location) {
    $scope.user={};
    $scope.error=false;
    //if logged in redirect to states page
    if(Authenticate.isLoggedIn()){
        $location.path( '/states' );
    }
    //This method will hit the factory to authenticate the details entered by user
    $scope.login=function(){
    	Authenticate.authenticate($scope.user).then(function(data){
    		$location.path( '/states' );
    	},
    	function(error){
            $scope.error=true;
    	}

    	);
    }
    //This method is used to close the error alert displayed to the user
    $scope.closeAlert=function(){
        $scope.error=false;
    }
    
  }]);
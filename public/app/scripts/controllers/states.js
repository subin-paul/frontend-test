angular.module('frontEndTest')
.controller('StatesCtrl', ['$scope','loadStates','$location','States',function ($scope,loadStates,$location,States) {
    //loadstates will be loaded with messages that is stored in back end on first time load
    $scope.states=loadStates;

    //hit the factory to load all the state abbrevations, this array is used for type ahead
    States.getStateAbbr().then(function(data){
        $scope.stateAbbrevations=data;
    },
    function(error){

    });
    //the callback fired by type ahead, we make a call to factory to retreive the state details based on abbrevation
    $scope.onSelect = function ($item, $model, $label) {
        $scope.stateDescription=false;
        States.getDetailsFrpmStateAbbr($item).then(function(data){
            $scope.stateAbbrevationDetails=data;
             $scope.stateDescription=true;
        },
        function(error){

        });
    };
    //This method will hit the factory to load next set of states from factory 
    $scope.nextStates=function(){
        States.loadNextStates().then(function(data){$scope.states=data},function(error){});
    };

    //This method will hit the factory to load next set of states from factory 
    $scope.previousStates=function(){
        States.loadPreviousStates().then(function(data){$scope.states=data},function(error){});;
    };
    //Change the sort order of displayed states in the table
    $scope.toggleSort=function(){
        States.toggleSort().then(function(data){$scope.states=data},function(error){});;
    };
    
}]);
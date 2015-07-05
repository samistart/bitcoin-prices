/**
 * Created by samistart on 04/07/15.
 */
var pricesControllers = angular.module('pricesControllers', []);

pricesControllers.controller('MyController', function($scope, $http){

    var startDate = '2015-07-01';
    //I want to bind the start and end dates to the input fields so that the list automatically changes
    $http.startDate = startDate;
    var endDate = new Date();
    $scope.day = endDate.getDate();
    $scope.month = endDate.getMonth()+1; //January is 0!
    $scope.year = endDate.getFullYear();

    if($scope.day<10) {
        $scope.day='0'+$scope.day
    }

    if($scope.month<10) {
        $scope.month='0'+$scope.month
    }

    endDate = $scope.year+'-'+$scope.month+'-'+$scope.day;
    $http.endDate = endDate;


    console.log(endDate);
    var getUrl = "https://api.coindesk.com/v1/bpi/historical/close.json";
    // Simple GET request example :
    $http.get(getUrl, {params : {start : startDate, end : endDate}}).
        success(function(data) {
            $scope.prices = data.bpi;
        });

});




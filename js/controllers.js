/**
 * Created by samistart on 04/07/15.
 */
var myApp = angular.module('myApp', []);

myApp.controller('MyController', function($scope, $http, $routeParams){
    $routeParams.startDate = '2013-09-01';

    var startDate = '2013-09-01';
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

    $routeParams.endDate = endDate;

    console.log(endDate);
    var getUrl = "https://api.coindesk.com/v1/bpi/historical/close.json?start=" + $routeParams.startDate + "&end=" + $routeParams.endDate;
    // Simple GET request example :
    $http.get(getUrl).
        success(function(data) {
            $scope.prices = data.bpi;
        });



    console.log($scope.prices);


});



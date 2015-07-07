/**
 * Created by samistart on 05/07/15.
 */

var myApp = angular.module('myApp', [
    'n3-line-chart'
]);

myApp.controller('PricesController', ['$scope', '$http',
    function($scope, $http){

        $scope.today = new Date();
        $scope.endDate = $scope.today;
        $scope.startDate = new Date("2015/06/07");
        $scope.currency = "EUR";
        $scope.errorMessage = 'all good';

        function processDate(myDate) {
            var day = myDate.getDate();
            var month = myDate.getMonth()+1; //January is 0!
            var year = myDate.getFullYear();

            if(day < 10) {
                day= '0'+ day
            }

            if(month < 10) {
                month='0' + month
            }

            return year+'-'+month+'-'+day;
        }




        $scope.getData = function getData() {

            if ($scope.startDate > $scope.endDate ||
                $scope.endDate > (new Date())){
                $scope.errorMessage = "Invalid date input";
                return;
            }
            else{
                $scope.errorMessage = "";
            }

            var startDateString = processDate($scope.startDate);
            var endDateString = processDate($scope.endDate);

            $scope.displayCurrency = $scope.currency;

            var data = [];
            $scope.data = [];
            $scope.onClick = function (points, evt) {
                console.log(points, evt);
            };


            var getUrl = "https://api.coindesk.com/v1/bpi/historical/close.json";
            // Simple GET request example :
            $http.get(getUrl, {params : {start : startDateString, end : endDateString, currency : $scope.currency}}).
                success(function(data) {
                    var points = data.bpi;
                    var data = [];

                    for (var key in points) {
                        if (points.hasOwnProperty(key)) {
                            data.push({x: new Date(key), value: points[key]});
                        }
                    }
                    console.log(data);
                    $scope.data = data;


                });


        }

        $scope.getData();

        $scope.options = {
            axes: {
                x: {
                    key: "x",
                    type: 'date'
                },
                y: {
                    type: "linear"
                }
            },
            series: [
                {
                    y: "value",
                    label: "Bitcoin prices in " + $scope.displayCurrency,
                    color: "#ff7f0e",
                    type: 'area'
                }
            ]
        };



    }]);

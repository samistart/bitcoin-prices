/**
 * Created by samistart on 05/07/15.
 */

var myApp = angular.module('myApp', [
    "chart.js"
]);

myApp.controller('PricesController', ['$scope', '$http',
    function($scope, $http){


        $scope.endDate = new Date();
        $scope.startDate = new Date("2015/06/07");
        $scope.currency = "EUR";

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

            var startDateString = processDate($scope.startDate);
            var endDateString = processDate($scope.endDate);

            $scope.displayCurrency = $scope.currency;

            $scope.labels = [];
            $scope.series = [''];
            $scope.data = [[]];
            $scope.onClick = function (points, evt) {
                console.log(points, evt);
            };


            var getUrl = "https://api.coindesk.com/v1/bpi/historical/close.json";
            // Simple GET request example :
            $http.get(getUrl, {params : {start : startDateString, end : endDateString, currency : $scope.currency}}).
                success(function(data) {
                    $scope.prices = data.bpi;
                    var points = data.bpi;

                    for (var key in points) {
                        if (points.hasOwnProperty(key)) {
                            $scope.labels.push(key);
                            $scope.data[0].push(points[key]);
                        }
                    }


                });

        }

        $scope.getData();


        $scope.options = {

            ///Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines : true,

            //String - Colour of the grid lines
            scaleGridLineColor : "rgba(0,0,0,.05)",

            //Number - Width of the grid lines
            scaleGridLineWidth : 1,

            //Boolean - Whether to show horizontal lines (except X axis)
            scaleShowHorizontalLines: true,

            //Boolean - Whether to show vertical lines (except Y axis)
            scaleShowVerticalLines: true,

            //Boolean - Whether the line is curved between points
            bezierCurve : true,

            //Number - Tension of the bezier curve between points
            bezierCurveTension : 0.4,

            //Boolean - Whether to show a dot for each point
            pointDot : true,

            //Number - Radius of each point dot in pixels
            pointDotRadius : 4,

            //Number - Pixel width of point dot stroke
            pointDotStrokeWidth : 1,

            //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
            pointHitDetectionRadius : 20,

            //Boolean - Whether to show a stroke for datasets
            datasetStroke : true,

            //Number - Pixel width of dataset stroke
            datasetStrokeWidth : 2,

            //Boolean - Whether to fill the dataset with a colour
            datasetFill : true,

            //String - A legend template
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

        };



    }]);

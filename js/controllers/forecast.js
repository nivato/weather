(function(){
    var app = angular.module('WeatherInCity');

    app.controller('ForecastController', ['$weather', function($weather){
        this.weather = $weather;
        this.date = undefined;

        this.setTodaysDate = function(){
            var date = new Date();
            var monthIndex = date.getMonth() + 1;
            var month = monthIndex < 10 ? '0' + monthIndex : monthIndex;
            this.date = '' + date.getFullYear() + '-' + month + '-' + date.getDate();
        };

        this.setDate = function(date){
            this.date = date;
        };

        this.removeForecast = function(){
            $weather.removeForecast();
            this.setTodaysDate();
        };

        this.setTodaysDate();

    }]);

})();

(function(){
    var app = angular.module('WeatherInCity');

    app.controller('ForecastController', ['$weather', function($weather){
        this.forecastCity = $weather.forecastCity;
    }]);

})();
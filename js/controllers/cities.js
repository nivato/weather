(function(){
    var app = angular.module('WeatherInCity');

    app.controller('CitiesController', ['$weather', function($weather){
        this.cityOptions = $weather.cityOptions;
        this.cities = $weather.cities;
        this.enteredCity = '';

        this.submitCity = function(city){
            if (city){
                this.enteredCity = city;
            }
            $weather.add(this.enteredCity);
            this.enteredCity = '';
        };

        this.removeCity = function(city){
            $weather.remove(city);
        };

        this.getForecast = function(city, country){
            $weather.forecast(city, country);
        };

    }]);

})();

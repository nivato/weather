(function(){
    var app = angular.module('WeatherInCity', []);

    app.controller('CitiesController', ['$weather', function($weather){
        this.cityOptions = ['Lviv', 'Kiev', 'London', 'New York', 'Warsaw', 'Paris', 'Berlin'];
        this.cities = $weather.cities;
        this.enteredCity = '';

        this.submitCity = function(city){
            if (city){
                this.enteredCity = city;
            }
            $weather.add(this.enteredCity);
            if (this.cityOptions.indexOf(this.enteredCity) === -1){
                this.cityOptions.push(this.enteredCity);
            }
            this.enteredCity = '';
        };

        this.removeCity = function(city){
            $weather.remove(city);
        };
    }]);

})();

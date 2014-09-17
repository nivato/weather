(function(){
    var app = angular.module('WeatherInCity', []);
    
    app.controller('CitiesController', function(){
    	this.cities = [];
    	this.enteredCity = '';
    	this.submitCity = function(){
    		this.cities.push(this.enteredCity);
    		this.enteredCity = '';
    	};
    });
    
})();

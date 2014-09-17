(function(){
    var app = angular.module('WeatherInCity', []);
    
    app.controller('CitiesController', function(){
    	this.cities = [];
    	this.enteredCity = '';
    	
    	this.submitCity = function(){
    		this.cities.push(this.enteredCity);
    		this.enteredCity = '';
    	};
    	
    	this.removeCity = function(cityName){
    	    var position = this.cities.indexOf(cityName);
    	    if (position >= 0){
    	        this.cities.splice(position, 1);
    	    }
    	};
    });
    
    app.controller('WeatherController', ['$http', function($http){
        var controller = this;
        this.city = 'N/A';
        this.country = 'N/A';
        this.temperature = 0;
        this.pressure = 0;
        this.humidity = 0;
        this.weather = 'N/A';
        this.icon = 'na.png';
        
        this.initiate = function(cityName){
            this.city = cityName;
            $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + cityName.replace(' ', '+') + '&units=metric')
                .success(function(data){
                    if (data.cod && data.cod === 200){
                        controller.city = data.name;
                        controller.country = data.sys.country;
                        controller.temperature = data.main.temp;
                        controller.pressure = data.main.pressure;
                        controller.humidity = data.main.humidity;
                        controller.weather = data.weather[0].main + ' (' + data.weather[0].description + ')';
                        controller.icon = data.weather[0].icon + '.png';
                    }
                });
        };
    }]);
    
})();

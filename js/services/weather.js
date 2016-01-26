(function(){
    var app = angular.module('WeatherInCity');

    app.factory('$weather', ['$http', function($http){
        function WeatherService(){
            this.url = 'http://api.openweathermap.org/data/2.5';
            this.units = 'metric';
            this.key = 'c8367896c029db37f610ee38746ee03e';
            this.cityOptions = ['Lviv', 'Kiev', 'London', 'New York', 'Warsaw', 'Paris', 'Berlin'];
            this.forecastCity = undefined;
            this.cities = {};
            this.defaultCity = {
                name: 'N/A',
                country: 'N/A',
                temperature: 0,
                pressure: 0,
                humidity: 0,
                weather: 'N/A',
                icon:'na.png'
            };
        }
        var def = WeatherService.prototype;

        def.add = function(cityName){
            var weather = this;
            if (cityName.replace(/\s+/, '').length > 0){
                $http.get(this.url + '/weather?q=' + cityName.replace(' ', '+') + '&units=' + this.units + '&APPID=' + this.key)
                    .success(function(data){
                        if (data.cod && data.cod === 200){
                            var city = angular.copy(weather.defaultCity);
                            city.name = data.name;
                            city.country = data.sys.country;
                            city.temperature = data.main.temp.toFixed(0);
                            city.pressure = data.main.pressure;
                            city.humidity = data.main.humidity;
                            city.weather = data.weather[0].main + ' (' + data.weather[0].description + ')';
                            city.icon = data.weather[0].icon + '.png';
                            weather.cities[city.name] = city;
                            weather.addCityOption(cityName);
                        }
                    });
            }
        };

        def.addCityOption = function(cityName){
            if (this.cityOptions.indexOf(cityName) === -1){
                this.cityOptions.push(cityName);
            }
        };

        def.remove = function(cityName){
            delete this.cities[cityName];
        };

        def.forecast = function(cityName, countryCode){
            $http.get(this.url + '/forecast?q=' + cityName.replace(' ', '+') + ',' + countryCode + '&units=' + this.units + '&APPID=' + this.key)
                .success(function(data){
                    if (data.cod && data.cod == 200){
                        console.log(data);
                    }
                });
        };

        return new WeatherService();
    }]);

})();

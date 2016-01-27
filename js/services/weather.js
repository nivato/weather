(function(){
    var app = angular.module('WeatherInCity');

    app.factory('$weather', ['$http', function($http){
        function WeatherService(){
            this.url = 'http://api.openweathermap.org/data/2.5';
            this.units = 'metric';
            this.key = 'c8367896c029db37f610ee38746ee03e';
            this.cityOptions = ['Lviv', 'Kiev', 'London', 'New York', 'Warsaw', 'Paris', 'Berlin'];
            this.timeScale = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
            this.forecast = {};
            this.forecastDates = [];
            this.forecastCurrentDate = '';
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
            var service = this;
            if (cityName.replace(/\s+/, '').length > 0){
                $http.get(this.url + '/weather?q=' + cityName.replace(' ', '+') + '&units=' + this.units + '&APPID=' + this.key)
                    .success(function(data){
                        if (data.cod && data.cod === 200){
                            var city = angular.copy(service.defaultCity);
                            city.name = data.name;
                            city.country = data.sys.country;
                            city.temperature = data.main.temp.toFixed(0);
                            city.pressure = data.main.pressure;
                            city.humidity = data.main.humidity;
                            city.weather = data.weather[0].main + ' (' + data.weather[0].description + ')';
                            city.icon = data.weather[0].icon + '.png';
                            service.cities[city.name] = city;
                            service.addCityOption(cityName);
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

        def.getForecast = function(cityName, countryCode){
            var service = this;
            $http.get(this.url + '/forecast?q=' + cityName.replace(' ', '+') + ',' + countryCode + '&units=' + this.units + '&APPID=' + this.key)
                .success(function(data){
                    if (data.cod && data.cod == 200){
                        service.prepareForecastData(cityName, countryCode, data);
                    }
                });
        };

        def.prepareForecastData = function(cityName, countryCode, data){
            var list = data.list;
            var forecast = {
                city: cityName,
                country: countryCode,
                weather: {}
            };
            var service = this;
            var weather = forecast.weather;
            for (var i = 0, len = list.length; i < len; i++){
                var date = list[i].dt_txt.split(' ')[0];
                var time = list[i].dt_txt.split(' ')[1].slice(0, 5);
                if (!weather[date]){
                    weather[date] = {};
                }
                weather[date][time] = {};
                var details = weather[date][time];
                details.temperature = list[i].main.temp.toFixed(0);
                details.pressure = list[i].main.pressure;
                details.humidity = list[i].main.humidity;
                details.weather = list[i].weather[0].main;
                details.icon = list[i].weather[0].icon + '.png';
            }
            this.forecast = forecast;
            this.forecastDates = Object.keys(forecast.weather);
            this.forecastCurrentDate = this.forecastDates[0];
        };

        return new WeatherService();
    }]);

})();

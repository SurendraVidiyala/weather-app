// Grab the latitude & longitude
$.getJSON('https://crossorigin.me/http://ip-api.com/json', function(ipAPI) {
  var latitude = ipAPI.lat;
  var longitude = ipAPI.lon;

  // Feed the latitude and longitude to the OpenWeatherMap API
  $.getJSON('https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=' +
    latitude + '&lon=' + longitude + '&APPID=98310c44c00378e11f092a57b0514137',
    function(ow) {
      // Demo hot in Dubai:
      //    $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=25&lon=55', function(ow) {
      // Demo cold in Antarctica:
      //      $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=-90&lon=0', function(ow) {
      var location = ipAPI.city + ', ' + ipAPI.region, //ow.name, 
        status = ow.weather[0].main,
        windMeters = ow.wind.speed,
        windMiles = ow.wind.speed * Math.round(2.23694),
        tempF = Math.round(((((ow.main.temp - 273.15) * 1.8000) + 32) * 10) / 10).toFixed(0),
        tempC = Math.round(ow.main.temp - 273.15),
        iconSource = ow.weather[0].icon,
        icons = { // ow.weather[0].icon to wi
                  // Daytime conditions
                  '01d': 'wi-day-sunny',
                  '02d': 'wi-day-sunny-overcast',
                  '03d': 'wi-day-cloudy',
                  '04d': 'wi-cloudy',
                  '09d': 'wi-day-sprinkle',
                  '10d': 'wi-day-rain',
                  '11d': 'wi-day-thunderstorm',
                  '13d': 'wi-day-snow',
                  '50d': 'wi-day-fog',

                  // Nightime conditions
                  '01n': 'wi-stars',
                  '02n': 'wi-night-partly-cloudy',
                  '03n': 'wi-night-cloudy',
                  '04n': 'wi-cloudy',
                  '09n': 'wi-night-sprinkle',
                  '10n': 'wi-night-rain',
                  '11n': 'wi-night-thunderstorm',
                  '13n': 'wi-night-snow',
                  '50n': 'wi-night-fog'
        },
        iconName = iconSource.split(' ').map(function(code) {
          var results = [];
          results.push(icons[code]);
          return results.join('');
        }),
        icon = iconName[0],
        extremeSource = ow.weather[0].id.toString(),
        extremes = {
          // ow.weather[0].id to wi
          // Extreme weather conditions
          '900': 'wi-tornado',
          '901': 'wi-hurricane',
          '902': 'wi-hurricane',
          '903': 'wi-snowflake-cold',
          '904': 'wi-hot',
          '905': 'wi-windy',
          '906': 'wi-hail',

          // Beaufort wind scale
          '951': 'wi-beafort-1',
          '952': 'wi-beafort-2',
          '953': 'wi-beafort-3',
          '954': 'wi-beafort-4',
          '955': 'wi-beafort-5',
          '956': 'wi-beafort-6',
          '957': 'wi-beafort-7',
          '958': 'wi-beafort-8',
          '959': 'wi-beafort-9',
          '960': 'wi-beafort-10',
          '961': 'wi-beafort-11',
          '962': 'wi-beafort-12'
        },
        extremeName = extremeSource.split(' ').map(function(code) {
          var results = [];
          results.push(extremes[code]);
          return results.join('');
        }),
        extreme = extremeName[0]
      /*,
        direction = {
          toCompass: function(degrees) {
            if (degrees === undefined) {
              return '';
            } else {
              return [
                'wi-wind-default _0-deg',
                'wi-wind-default _15-deg',
                'wi-wind-default _30-deg',
                'wi-wind-default _45-deg',
                'wi-wind-default _60-deg',
                'wi-wind-default _75-deg',
                'wi-wind-default _90-deg',
                'wi-wind-default _105-deg',
                'wi-wind-default _120-deg',
                'wi-wind-default _135-deg',
                'wi-wind-default _150-deg',
                'wi-wind-default _165-deg',
                'wi-wind-default _180-deg',
                'wi-wind-default _195-deg',
                'wi-wind-default _210-deg',
                'wi-wind-default _225-deg',
                'wi-wind-default _240-deg',
                'wi-wind-default _255-deg',
                'wi-wind-default _270-deg',
                'wi-wind-default _285-deg',
                'wi-wind-default _300-deg',
                'wi-wind-default _315-deg',
                'wi-wind-default _330-deg',
                'wi-wind-default _345-deg',
              ][Math.round(degrees / 15 / 2)]
            }
          }
        }*/

 //     var compassIcon = direction.toCompass(ow.wind.deg);
//      var compassIcon = 'wi-wind-default _' + 165 + '-deg';
    var windIcon = 'wi-wind towards-' + ow.wind.deg + '-deg';

      /* #quick-view */
      $('#loading').hide();
      $('#tempF > span').empty().append(tempF);
      $('#tempC > span').empty().append(tempC);
      $('#weather-icons > i:first-child').addClass(icon);
      $('#weather-icons > i:last-child').addClass(extreme);

      /* #grid */
      $('#location').empty().append(location);
      $('#status').empty().append(status);
      /* #wind */
      $('.compass > i').empty().addClass(windIcon);
      $('#miles').empty().append(windMiles + ' MPH');
      $('#meters').empty().append(windMeters + ' m/s');

      /* Background changes based on temperature */
      if (tempF >= 80) {
        $('html').css({
          backgroundImage: "url(https://lh3.googleusercontent.com/tZpc9y7vX-brIB_QZdCtfvuCCFch97ibZuzMpyoGdYY=w1371-h914-no)"
        });
      }
      if (tempF <= 40) {
        $('html').css({
          backgroundImage: "url(https://lh3.googleusercontent.com/ZVl-smyma4XB3KnqVkrZOP3q3XHA6h6yB2ghMaLilx0=w1625-h914-no)"
        });
      }
    });

  function error() {
    $('#main').append("Unable to retrieve your location");
  };

})

$('button').click(function() {
  $('#tempF').toggle();
  $('#tempC').toggle();
  $('#miles').toggle();
  $('#meters').toggle();
});
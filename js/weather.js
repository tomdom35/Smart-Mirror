$(document).ready(function () {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var location = position.coords.latitude + ',' + position.coords.longitude
            getWeather(location);
            setInterval(getWeather, 500, location);
        });
    }
});

function getWeather(location) {
    $.simpleWeather({
        location: location,
        unit: 'f',
        success: function (weather) {
            city = weather.city;
            temp = weather.temp + '&deg;';
            //high = '<p class="high">' + weather.high + '&deg;</p>';
            //low = '<p class="low">' + weather.low + '&deg;</p>';
            high = weather.high + '&deg;';
            low = weather.low + '&deg;';
            //wcode = '<img class="weathericon" src="images/weathericons/' + weather.code + '.svg"> <p class="current_weather">' + weather.currently + '</p>';
            wcode = '<img class="weathericon" src="images/weathericons/' + weather.code + '.svg">';
            wind = '<p>' + weather.wind.speed + '</p><p>' + weather.units.speed + '</p>';
            humidity = weather.humidity + ' %';

            $(".location").text(city);
            $('.humidity').text(humidity);
            $('.climate_bg').html(wcode);
            $(".windspeed").html(wind);
            $(".temperature").html(temp);
            $(".high").html(high)
            $(".low").html(low)
            //$(".current_weather").text(weather.currently);
        }
    });
}
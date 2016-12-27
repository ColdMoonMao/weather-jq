//自动定位获取城市
// console.log(!(localStorage.getItem('city')));
function autoLocation() {
    // if (autoLocationSwitch) {
        var key = '4fb3950449a42b83cdda8226b0463bdb';
        var lat, lon;
        autoLocationSwitch=false;
        navigator.geolocation.getCurrentPosition(function(Geoposition) {
            console.log(Geoposition.coords);
            lat = Geoposition.coords.latitude;
            lon = Geoposition.coords.longitude;
            var url = "http://restapi.amap.com/v3/geocode/regeo?location=" + lon + "," + lat + "&key=" + key
            console.log('navigator' + url);
            $.ajax({
                    url: url,
                    type: 'get',
                    dataType: 'json',
                })
                .done(function() {
                    console.log(arguments);
                    var cityFullName = arguments[2].responseJSON.regeocode.addressComponent.city
                    console.log(cityFullName);
                    var city = cityFullName.replace('市', '');
                    console.log(city + cityFullName);
                    localStorage.setItem("city", city);
                    console.log('assign to index.html');
                    nowForecastAjax();
                    location.assign("index.html");
                })
                .fail(function() {
                    console.log("error");
                })

        })
    // }
}
//ajax获取天气数据
var weatherData, weather7Days;
nowForecastAjax();

function nowForecastAjax() {
    $.ajax({
            url: 'https://free-api.heweather.com/v5/weather',
            type: 'GET',
            dataType: 'json',
            data: {
                city: localStorage.getItem('city'),
                key: '6d1ac51ff7a34eb996e8ca0c6d39db24'
            }

        })
        .done(function(value, status) {
            // console.log(arguments);
            // console.log(status);
            // console.log(value['HeWeather5']);
            $('#status').hide();
            weatherData = value['HeWeather5'];
            console.log(weatherData);
            makeList();
            weekForecastAjax();
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
}

function weekForecastAjax() {
    $.ajax({
        type: 'get',
        async: false,
        url: 'https://sapi.k780.com/?app=weather.future&weaid=' + localStorage.getItem('city') + '&appkey=22282&sign=8871fb8b0901ff9a5053155892941903&format=json&jsoncallback=data',
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'data',
        success: function(value, status) {
            console.log(value.result);
            weather7Days = value.result;
            make7Days();
        },
        error: function() {
            alert('fail');
        }
    });
}

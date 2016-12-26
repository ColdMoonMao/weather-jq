var weatherData,weather7Days;
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

function weekForecastAjax() {
    $.ajax({
         type          : 'get',
        async         : false,
        url           : 'https://sapi.k780.com/?app=weather.future&weaid='+localStorage.getItem('city')+'&appkey=22282&sign=8871fb8b0901ff9a5053155892941903&format=json&jsoncallback=data',
        dataType      : 'jsonp',
        jsonp         : 'callback',
        jsonpCallback : 'data',
        success: function(value, status) {
            console.log(value.result);
            weather7Days=value.result;
            make7Days();
        },
        error: function() {
            alert('fail');
        }
    });
}

// var weatherData = {
//  "HeWeather": [{
//      "aqi": {
//          "city": {
//              "aqi": "51",
//              "co": "1",
//              "no2": "14",
//              "o3": "155",
//              "pm10": "45",
//              "pm25": "22",
//              "qlty": "良",
//              "so2": "12"
//          }
//      },
//      "basic": {
//          "city": "西安",
//          "cnty": "中国",
//          "id": "CN101110101",
//          "lat": "34.285000",
//          "lon": "108.969000",
//          "update": {
//              "loc": "2016-07-04 14:53",
//              "utc": "2016-07-04 06:53"
//          }
//      },
//      "daily_forecast": [{
//          "astro": {
//              "sr": "05:37",
//              "ss": "19:59"
//          },
//          "cond": {
//              "code_d": "100",
//              "code_n": "100",
//              "txt_d": "晴",
//              "txt_n": "晴"
//          },
//          "date": "2016-07-04",
//          "hum": "20",
//          "pcpn": "0.0",
//          "pop": "0",
//          "pres": "1003",
//          "tmp": {
//              "max": "35",
//              "min": "24"
//          },
//          "vis": "10",
//          "wind": {
//              "deg": "124",
//              "dir": "东风",
//              "sc": "微风",
//              "spd": "5"
//          }
//      }, {
//          "astro": {
//              "sr": "05:37",
//              "ss": "19:59"
//          },
//          "cond": {
//              "code_d": "101",
//              "code_n": "101",
//              "txt_d": "多云",
//              "txt_n": "多云"
//          },
//          "date": "2016-07-05",
//          "hum": "22",
//          "pcpn": "0.0",
//          "pop": "0",
//          "pres": "1005",
//          "tmp": {
//              "max": "35",
//              "min": "23"
//          },
//          "vis": "10",
//          "wind": {
//              "deg": "130",
//              "dir": "东风",
//              "sc": "微风",
//              "spd": "10"
//          }
//      }, {
//          "astro": {
//              "sr": "05:38",
//              "ss": "19:59"
//          },
//          "cond": {
//              "code_d": "101",
//              "code_n": "104",
//              "txt_d": "多云",
//              "txt_n": "阴"
//          },
//          "date": "2016-07-06",
//          "hum": "24",
//          "pcpn": "0.0",
//          "pop": "0",
//          "pres": "1008",
//          "tmp": {
//              "max": "32",
//              "min": "25"
//          },
//          "vis": "10",
//          "wind": {
//              "deg": "133",
//              "dir": "东风",
//              "sc": "微风",
//              "spd": "8"
//          }
//      }, {
//          "astro": {
//              "sr": "05:38",
//              "ss": "19:59"
//          },
//          "cond": {
//              "code_d": "305",
//              "code_n": "306",
//              "txt_d": "小雨",
//              "txt_n": "中雨"
//          },
//          "date": "2016-07-07",
//          "hum": "43",
//          "pcpn": "3.0",
//          "pop": "72",
//          "pres": "1007",
//          "tmp": {
//              "max": "28",
//              "min": "22"
//          },
//          "vis": "9",
//          "wind": {
//              "deg": "167",
//              "dir": "东风",
//              "sc": "微风",
//              "spd": "1"
//          }
//      }, {
//          "astro": {
//              "sr": "05:39",
//              "ss": "19:59"
//          },
//          "cond": {
//              "code_d": "305",
//              "code_n": "305",
//              "txt_d": "小雨",
//              "txt_n": "小雨"
//          },
//          "date": "2016-07-08",
//          "hum": "39",
//          "pcpn": "0.3",
//          "pop": "61",
//          "pres": "1005",
//          "tmp": {
//              "max": "27",
//              "min": "22"
//          },
//          "vis": "10",
//          "wind": {
//              "deg": "38",
//              "dir": "东风",
//              "sc": "微风",
//              "spd": "0"
//          }
//      }, {
//          "astro": {
//              "sr": "05:39",
//              "ss": "19:58"
//          },
//          "cond": {
//              "code_d": "104",
//              "code_n": "104",
//              "txt_d": "阴",
//              "txt_n": "阴"
//          },
//          "date": "2016-07-09",
//          "hum": "30",
//          "pcpn": "0.4",
//          "pop": "35",
//          "pres": "1002",
//          "tmp": {
//              "max": "30",
//              "min": "20"
//          },
//          "vis": "10",
//          "wind": {
//              "deg": "54",
//              "dir": "东风",
//              "sc": "微风",
//              "spd": "5"
//          }
//      }, {
//          "astro": {
//              "sr": "05:40",
//              "ss": "19:58"
//          },
//          "cond": {
//              "code_d": "101",
//              "code_n": "305",
//              "txt_d": "多云",
//              "txt_n": "小雨"
//          },
//          "date": "2016-07-10",
//          "hum": "28",
//          "pcpn": "0.0",
//          "pop": "0",
//          "pres": "1001",
//          "tmp": {
//              "max": "29",
//              "min": "22"
//          },
//          "vis": "10",
//          "wind": {
//              "deg": "70",
//              "dir": "东风",
//              "sc": "微风",
//              "spd": "4"
//          }
//      }],
//      "hourly_forecast": [{
//          "date": "2016-07-04 16:00",
//          "hum": "21",
//          "pop": "0",
//          "pres": "1002",
//          "tmp": "39",
//          "wind": {
//              "deg": "132",
//              "dir": "东南风",
//              "sc": "3-4",
//              "spd": "19"
//          }
//      }, {
//          "date": "2016-07-04 19:00",
//          "hum": "30",
//          "pop": "0",
//          "pres": "1002",
//          "tmp": "37",
//          "wind": {
//              "deg": "134",
//              "dir": "东南风",
//              "sc": "3-4",
//              "spd": "20"
//          }
//      }, {
//          "date": "2016-07-04 22:00",
//          "hum": "43",
//          "pop": "0",
//          "pres": "1005",
//          "tmp": "34",
//          "wind": {
//              "deg": "132",
//              "dir": "东南风",
//              "sc": "微风",
//              "spd": "16"
//          }
//      }],
//      "now": {
//          "cond": {
//              "code": "101",
//              "txt": "多云"
//          },
//          "fl": "37",
//          "hum": "37",
//          "pcpn": "0",
//          "pres": "1004",
//          "tmp": "34",
//          "vis": "10",
//          "wind": {
//              "deg": "90",
//              "dir": "东北风",
//              "sc": "5-6",
//              "spd": "25"
//          }
//      },
//      "status": "ok",
//      "suggestion": {
//          "comf": {
//              "brf": "很不舒适",
//              "txt": "白天天气晴好，但烈日炎炎会使您会感到很热，很不舒适。"
//          },
//          "cw": {
//              "brf": "较适宜",
//              "txt": "较适宜洗车，未来一天无雨，风力较小，擦洗一新的汽车至少能保持一天。"
//          },
//          "drsg": {
//              "brf": "炎热",
//              "txt": "天气炎热，建议着短衫、短裙、短裤、薄型T恤衫等清凉夏季服装。"
//          },
//          "flu": {
//              "brf": "少发",
//              "txt": "各项气象条件适宜，发生感冒机率较低。但请避免长期处于空调房间中，以防感冒。"
//          },
//          "sport": {
//              "brf": "较适宜",
//              "txt": "天气较好，户外运动请注意防晒。推荐您进行室内运动。"
//          },
//          "trav": {
//              "brf": "一般",
//              "txt": "天气较好，同时又有微风伴您一路同行，但是比较热，外出旅游请注意防晒，并注意防暑降温。"
//          },
//          "uv": {
//              "brf": "很强",
//              "txt": "紫外线辐射极强，建议涂擦SPF20以上、PA++的防晒护肤品，尽量避免暴露于日光下。"
//          }
//      }
//  }]
// }
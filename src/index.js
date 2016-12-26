var aqiObj = [{
        condition: function(x) {
            return x <= 50
        },
        pos: '0px -1px'
    }, {
        condition: function(x) {
            return x <= 100 && x > 50
        },
        pos: '0px -23px'
    }, {
        condition: function(x) {
            return x <= 150 && x > 100
        },
        pos: '0px -46px'
    }, {
        condition: function(x) {
            return x <= 200 && x > 150
        },
        pos: '0px -69px'
    }, {
        condition: function(x) {
            return x <= 300 && x > 200
        },
        pos: '0px -92px'
    }, {
        condition: function(x) {
            return x <= 500 && x > 300
        },
        pos: '0px -115px'
    }, {
        condition: function(x) {
            return x > 500
        },
        pos: '0px -137px'
    }]
    //setaqi backgroud-position function
function setBgp(data, node, value) {
    data.forEach(function(elements) {
        if (elements.condition(value)) {
            node.css('background-position', elements.pos);
        }
    })
    console.log('setAqiBgp success');
}
var weekarr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
// 1-3天天气
function makeList() {
    //aqi backgroud-position object

    var w = weatherData[0];
    var cityChoose = localStorage.getItem('city');
    console.log(cityChoose);
    $('#city').html(cityChoose);
    $('#todaytmpmin').html(w.daily_forecast[0].tmp.min);
    $('#todaytmpmax').html(w.daily_forecast[0].tmp.max);
    $('#todayweather').html(w.now.cond.txt);
    console.log(w.now.cond.txt);
    $('#nowtmp').html(w.now.tmp);
    $('#winddir').html(w.now.wind.dir);
    $('#windspd').html(w.now.wind.sc);
    if (w.aqi) {
        $('#aqi').html('空气质量指数: ' + w.aqi.city.aqi);
        $('#qlty').html(w.aqi.city.qlty);
        setBgp(aqiObj, $('#todayico'), w.aqi.city.aqi);
    } else {
        $('#aqiContainer').removeClass('cover');
        $('#aqiContainer').empty()
        console.log($('#aqiContainer').children());
    }
    $('#days').html(7);
    //1-3天列表
    for (var i = 0; i < w.daily_forecast.length; i++) {
        var aa = (((w.daily_forecast[i].date).split('-')).slice(1)).join('/');
        // console.log(aa);
        var lists = '<li><span class="date left">' + aa + '&nbsp;' + '</span> <span class="relate-day left">' + weekarr[new Date(weatherData[0].daily_forecast[i].date).getDay()] + '</span><span class="ico left">' + '</span><span class="weather left">' + w.daily_forecast[i].cond.txt_d + '</span><span class="orange right">' + w.daily_forecast[i].tmp.max + '°C' + '</span><span class="right"> ~ </span><span class="green right">' + w.daily_forecast[i].tmp.min + '</span><span class="clearfloat"></span></li>';
        $('#li').append(lists)
    }
}
//未来5-7天天气
function make7Days() {
    weather7Days
    // var weekarr[new Date(weatherData.HeWeather[0].daily_forecast[i].date).getDay()]
    for (var i = 3; i < weather7Days.length; i++) {
        var aa = (((weather7Days[i].days).split('-')).slice(1)).join('/');
        // console.log(aa);
        var lists = '<li><span class="date left">' + aa + '&nbsp;' + '</span> <span class="relate-day left">' + weekarr[new Date(weather7Days[i].days).getDay()] + '</span><span class="ico left">' + '</span><span class="weather left">' + weather7Days[i].weather + '</span><span class="orange right">' + weather7Days[i].temp_high + '°C' + '</span><span class="right"> ~ </span><span class="green right">' + weather7Days[i].temp_low + '</span><span class="clearfloat"></span></li>';
        $('#li').append(lists)
    }
    changeStyle();
    voiceBtn ()
}
//添加语音播报
function voiceBtn () {
    var img=$('<img src="src/喇叭.svg" alt="" class="voiceimg">');
    img.click(function  () {
        // console.log(123123123123);
      voicePlay ();
    })
    $('#cityTitle').after(img);
}
//改变样式
function changeStyle() {
    //周六日变红
    $('.relate-day').each(function(index, el) {
        // console.log($(el).html());
        if ($(el).html() == '周六' || $(el).html() == '周日') {
            $(el).addClass('red');
            $(el).prev().addClass('red');
        }
    });

    //今天明天重命名
    $('main li .relate-day').eq(0).html('今天');
    $('main li .relate-day').eq(1).html('明天');
    //当前天气图片地址更改
    console.log($('#today-pic'));

    console.log($('#todayweather').html());
    setPicSrc(todayPicSrcObj, $('#today-pic')[0], $('#todayweather').html())


    //列表天气图标更改
    setPicPos(listPicPosObj, $('main li .weather'))


    // $('main li .weather').each(function(index, el) {
    //     if ($(el).html() == '晴') {
    //         $(el).prev().css('background-position', '0px 634px');
    //     }
    // });
}

//更换list pic bgpositon 函数
function setPicPos(posobj, value) {
    posobj.forEach(function(elements) {
        value.each(function(index, el) {
            // if ((elements.weather).indexOf(($(el).html())) != -1) {
            if (elements.weather==$(el).html() ) {
                $(el).prev().css('background-position', elements.pos);
            }
        })
    })
}
//列表天气图标对象
var listPicPosObj = [{
    weather: '晴',
    pos: '0px 634px'
}, {
    weather: '阴',
    pos: '0px 744px'
}, {
    weather: '小雨',
    pos: '0px -38px'
}, {
    weather: '多云',
    pos: '0px -380px'
}, {
    weather: '阴转晴',
    pos: '0px -380px'
}, {
    weather: '多云转晴',
    pos: '0 35.71429%'
}, {
    weather: '多云转阴',
    pos: '0 35.71429%'
}, {
    weather: '阴转多云',
    pos: '0 35.71429%'
}, {
    weather: '晴转多云',
    pos: '0 35.71429%'
}, {
    weather: '小雨转阴',
    pos: '0 3.57143%'
}, {
    weather: '阴转小雨',
    pos: '0 3.57143%'
}, {
    weather: '小雪',
    pos: '0px 10.7%'
}, {
    weather: '小雪转多云',
    pos: '0px 10.7%'
}, {
    weather: '中雪',
    pos: '0px 17.8%'
}, {
    weather: '大雪',
    pos: '0px 14.3%'
}]



//今天天气图片src对象
var todayPicSrcObj = [{
        weather: '晴',
        pos: 'src/1.png'
    }, {
        weather: '多云',
        pos: 'src/2.png'
    }, {
        weather: '阴',
        pos: 'src/3.png'
    }, {
        weather: '小雨',
        pos: 'src/11.png'
    }, {
        weather: '中雨',
        pos: 'src/5.png'
    }, {
        weather: '阵雨',
        pos: 'src/5.png'
    }, {
        weather: '小雪',
        pos: 'src/13.png'
    }, {
        weather: '雨夹雪',
        pos: 'src/10.png'
    }, {
        weather: '雷',
        pos: 'src/4.png'
    }]
    //更换PIC src 函数
function setPicSrc(srcobj, node, value) {
    srcobj.forEach(function(elements) {
        if ((elements.weather).indexOf(value) != -1) {
            node.src = elements.pos;
        }
    })
}

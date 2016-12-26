function voicePlay () {
	var voiceObj={
		city:$('#city').html(),
		weather:$('#todayweather').html(),
		tmp_low:$('#todaytmpmin').html(),
		tmp_high:$('#todaytmpmax').html(),
		tmp_now:$('#nowtmp').html(),
		wind_dir:$('#winddir').html(),
		wind_spd:$('#windspd').html(),
		aqi:$('#aqi').html(),
		qlty:$('#qlty').html(),
	};

	var res='你好。'+voiceObj.city+"当前天气"+voiceObj.weather+'。'+'今天气温'+voiceObj.tmp_low+'到'+voiceObj.tmp_high+'摄氏度。'+'现在气温'+voiceObj.tmp_now+'摄氏度。'+voiceObj.wind_dir+voiceObj.wind_spd+'级。'+voiceObj.aqi+'。'+voiceObj.qlty;
            console.log(res);
	play_xiaoyan(res);
}
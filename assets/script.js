//getting html elements that need modification 
var timeEl = document.getElementById('time');
var dateEl = document.getElementById('date');
var currentWeatherItemsEl = document.getElementById('current-weather-item');
var timezone = document.getElementById('time-zone');
var countryEl = document.getElementById('country');
var weatherForecastEl=document.getElementById('weather-forecast');
var currentTempEl = document.getElementById('current-temp');

//gettting API key from Open weather

var APIkey = "1c168a60a44e8577db4149722880e015";

//modifying time to the current time

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
//every 1 sec this will update automatically on the screen 
setInterval(() => {
    var time = new Date();
    var month = time.getMonth();
    var date = time.getDate();
    var day = time.getDay();
    var hour = time.getHours();
    var hoursMilitary = hour >=13 ? hour %12: hour
    var minutes = time.getMinutes();
    var minutes1 = minutes <=9 ? "0"+minutes : minutes 
    var ampm = hour >=12 ? "PM" : "AM"
    
    timeEl.innerHTML = hoursMilitary + ':' + minutes1 + " " + `<span id ="am-pm">${ampm}</span>`
    dateEl.innerHTML = days[day] + ", " + months[month] + " " + date
},1000)


//Calling API
getWeather()
function getWeather () {
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success);

        let {latitude, longitude }= success.coords

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${APIkey}
        `).then(res=> res.json()).then(data => {
            console.log(data);

            showWeather(data);
        })
    })
}

function showWeather(data) {
    var {temp, humidity, wind_speed, uvi} = data.current;

    currentWeatherItemsEl.innerHTML = 
    `<div class = "weather-item">
        <div>Temperature</div>
        <div>${temp} &#176F</div>
    </div>
    <div class = "weather-item">
        <div>Humidity</div>
        <div>${humidity} %</div>
    </div>
    <div class = "weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed} mph</div>
    </div>
    <div class = "weather-item">
        <div>UV Index</div>
        <div>${uvi} </div>
    </div>`;

    var nextDayForecast = '';

    data.daily.forEach((day,idx) => {
        if (idx === 0) {
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt = "weather icon" class="w-icon">
            <div class="other">
                <div class = "day">Today</div>
                <div class = "temp">Night - ${day.temp.night}&#176F</div>
                <div class = "temp">Day - ${day.temp.day}&#176F</div>
            </div>`
        }else if( idx <=5){
            nextDayForecast +=`            
            <div class = "weather-forecast-item">
                <div class = "day">${window.moment(day.dt*1000).format("dddd")}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt = "weather icon" class="w-icon">
                <div class = "temp">Night - ${day.temp.night}&#176 F</div>
                <div class = "temp">Day - ${day.temp.day}&#176 F</div>                    
            </div>
            `
        }
    })
    weatherForecastEl.innerHTML = nextDayForecast; 
}

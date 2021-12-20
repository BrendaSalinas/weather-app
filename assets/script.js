//getting html elements that need modification 
var timeEl = document.getElementById('time');
var dateEl = document.getElementById('date');
var currentWeatherItemsEl = document.getElementById('current-weather-items');
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

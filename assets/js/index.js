var btn = document.querySelector('#city-search');
var search = document.querySelector('#search');

var APIKey = "410c0575ed08c60b522482fb4842a2a0";

var city;

var ping = function (event) {
    event.preventDefault();
    

    var city = search.value.trim();

    console.log(city);

    if (city) {
      getCityWeather(city);
    } else {
      alert('Please search for a city');
    }
}

var getCityWeather = function (city) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

  fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
          console.log(response.json())
        }
    })
}

btn.addEventListener('click', ping);

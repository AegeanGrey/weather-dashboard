var btn = document.querySelector('#city-search');
var search = document.querySelector('#search');
var section = document.querySelector('#result');

var APIKey = "410c0575ed08c60b522482fb4842a2a0";

// Function that prevents the website from refreshing while taking in user searched city
var ping = function (event) {
    
    // Prevents the webpage from refreshing each time the search button is clicked
    event.preventDefault();
    
    // Stores the user searched city from the DOM into citySearch
    var citySearch = search.value.trim();

    // if there's data within citySearch
    if (citySearch) {

      // Calls the getCityWeather with the users searched city being passed in as a parameter
      getCityWeather(citySearch);

     // Otherwise it will display an alert prompt to enter a city into the search 
    } else {
      alert('Please search for a city');
    }
}

// Function that will pull in weather data based on the user searched city 
var getCityWeather = function (city) {

  // Plugs the user searched city and API Key into url for user requested
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

  // Fetch request is sent for the apiUrl with user data
  fetch(apiUrl)

    // The data from the fetch request is then passed into response
    .then(function(response) {

        // If the response for the fetch request is true or in this case 'ok'
        if (response.ok) {

          // It will console log the API data in JSON to the console  
          // console.log(response.json());

          // Returns json formatted data
          return response.json();

         // Otherwise it will display an alert prompt to the webpage with an error message regarding the status
        } else {
          alert('Error: ' + response.statusText);
        }
    })

    // Passes json formatted data into cityWeatherData
    .then(function(data) {
      cityWeatherData(data);
    })
    .catch(function(error) {
      console.log('Error: ' + error);
    })
}

// Contains weather data from API call and stores them within variables
function cityWeatherData(data) {
  var city = data.name;
  var humid = data.main.humidity;
  var wind = data.wind.speed;
  var icon = data.main.feels_like;

  // variables that store the searched cities longitude and latitude for weekly weather data API call
  var lon = data.coord.lon;
  var lat = data.coord.lat;
  
  // Converts daily time (dt) from milliseconds to be utilized as the current day, month and year
  var date = new Date(data.dt * 1000);

  // Converts temperature from Kelvin to Fahrenheit while rounding up
  var temp = Math.floor(((data.main.temp - 273.15) * 1.8) + 32);

  console.log(icon);
  
  // HTML that will pass in the stored data we formatted from the API call
  var currentWeather = `
    <h1 id="city">${city}, ${date.toDateString()}</h1>
    <p>Temp: ${temp}°F</p>
    <p>Wind: ${wind} MPH</p>
    <p>Humidity: ${humid}%</p>`;

  // If there is data within all these variables to pass then it will return the HTML from the currentWeather variable while calling getWeeklyWeather w/ lat and lon as parameters
  if (city, date, temp, wind, humid) {
    getWeeklyWeather(lat, lon);
    return section.innerHTML = currentWeather;
  }
}

// Function that will retrieve weekly weather data by taking in lat and lon variables
var getWeeklyWeather = function (lat, lon) {

  // API call that will use lat and lon w/ the API Key
  var weekApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;

  // Fetch request is made with the weekApiUrl
  fetch(weekApiUrl)

  // Ferch request data from weekApiUrl is passed into response
  .then(function(response) {

    // If the response is valid then it will return the data in json format
    if (response.ok) {
        return response.json();

    // Otherwise it will alert the webpage with a prompt and an error message
    } else {
        alert('Error: ' + response.statusText);
    }
  })

  // JSON data is then passed into data and a call is made to the weeklyWeatherData function
  .then(function(data) {
    weeklyWeatherData(data)
  })
  .catch(function(error) {
    console.log('Error: ' + error)
  })
}

// Contains weekly weather data from weekApiUrl
function weeklyWeatherData(data) {
  console.log(data)
}

// When someone clicks the search button it will call the ping function
btn.addEventListener('click', ping);

var btn = document.querySelector('#city-search');
var search = document.querySelector('#search');

var APIKey = "410c0575ed08c60b522482fb4842a2a0";

var city;

// Function that prevents the website from refreshing while taking in user searched city
var ping = function (event) {
    
    // Prevents the webpage from refreshing each time the search button is clicked
    event.preventDefault();
    
    // Stores the user searched city from the DOM into citySearch
    var citySearch = search.value.trim();

    // Shows the user search 
    console.log(citySearch);

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

    // After the fetch request is made it will then 
    .then(function (response) {

        // If the response for the fetch request is true or in this case 'ok'
        if (response.ok) {

          // It will console log the API data in JSON to the console  
          console.log(response.json())

         // Otherwise it will display an alert prompt to the webpage with an error message regarding the status
        } else {
          alert('Error: ' + response.statusText);
        }
    })
}

// When someone clicks the search button it will call the ping function
btn.addEventListener('click', ping);

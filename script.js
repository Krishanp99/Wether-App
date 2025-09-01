const apiKey = 'ee2778900d5890005203a'; // Replace with your OpenWeatherMap API key
const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const dayName = document.getElementById('dayName');
const date = document.getElementById('date');
const todayIcon = document.getElementById('todayIcon');
const currentTemp = document.getElementById('currentTemp');
const currentCondition = document.getElementById('currentCondition');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const weatherToday = document.querySelector('.weather-today'); 


searchButton.addEventListener('click', () => {
  const city = cityInput.value;
  if (city) {
    fetchWeather(city);
  } else {
    alert('Please enter a city name'); 
  }
});

function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetch(url)
    .then((respo) => respo.json())
    .then((data) => {updateUI(data);
      console.log(data)
    })

   .catch((error) => {
      alert('your city name is not correct');
      console.error(error);
    });
   
}

function updateUI(data) {
  const { name } = data;
  const { description, icon } = data.weather[0];
  const { temp, humidity: hum } = data.main;
  const { speed } = data.wind;

  // Update Left Section
  const today = new Date();
  dayName.textContent = today.toLocaleString('en-US', { weekday: 'long' });
  date.textContent = today.toLocaleDateString();
  todayIcon.src = `https://openweathermap.org/img/wn/${icon}.png`;
  currentTemp.textContent = `${temp}°C`;
  currentCondition.textContent = description;

  // Update Right Section
  cityName.textContent = name;
  temperature.textContent = `${temp}°C`;
  humidity.textContent = `${hum}%`;
  windSpeed.textContent = `${speed} km/h`;

  changeBackground(description.toLowerCase());
}

// Background images 
const backgroundImages = {
  clear: 'back photo/clearsky.jpg',
  cloudy: 'back photo/cloudy.jpg',
  rain: 'back photo/rainy.jpg',
  snow: 'back photo/snowy.jpg',
  mist: 'back photo/sunny.jpg',
  thunderstorm : 'back photo/thunderstorm.jpeg',
  default: 'back photo/blizzard.jpeg',
};

function changeBackground(weatherCondition) {
  let bgImage = backgroundImages.default; 

  // Match conditions to background images
  if (weatherCondition.includes('clear')) {
    bgImage = backgroundImages.clear;
  } else if (weatherCondition.includes('cloud')) {
    bgImage = backgroundImages.cloudy;
  } else if (weatherCondition.includes('rain')) {
    bgImage = backgroundImages.rain;
  } else if (weatherCondition.includes('snow')) {
    bgImage = backgroundImages.snow;
  } else if (weatherCondition.includes('thunderstorm')) {
    bgImage = backgroundImages.thunderstorm;
  } else if (weatherCondition.includes('mist') || weatherCondition.includes('fog')) {
    bgImage = backgroundImages.mist;
  }

  // Update the left section's background image
  weatherToday.style.backgroundImage = `url('${bgImage}')`;
  weatherToday.style.backgroundSize = 'cover';
  weatherToday.style.backgroundPosition = 'center';

}
 })



const apiKey = '9505fd1df737e20152fbd78cdb289b6a';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + apiKey;

const cityElement = document.querySelector('.name');
const form = document.querySelector("form");
const temperatureElement = document.querySelector('.temperature');
const descriptionElement = document.querySelector('.description');
const valueSearch = document.getElementById('name');
const cloudsElement = document.querySelector('#clouds .value');
const humidityElement = document.querySelector('#humidity .value');
const pressureElement = document.querySelector('#pressure .value');
const main = document.querySelector('main');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (valueSearch.value.trim() !== '') {
        searchWeather(valueSearch.value.trim());
    }
});

const searchWeather = (city) => {
    fetch(`${apiUrl}&q=${city}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                updateWeatherInfo(data);
            } else {
                showError();
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            showError();
        });
};

const updateWeatherInfo = (data) => {
    cityElement.querySelector('figcaption').innerText = data.name;
    cityElement.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
    temperatureElement.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    temperatureElement.querySelector('figcaption').innerText = `${data.main.temp} °C`;
    descriptionElement.innerText = data.weather[0].description;
    cloudsElement.innerText = data.clouds.all;
    humidityElement.innerText = data.main.humidity;
    pressureElement.innerText = data.main.pressure;
};

const showError = () => {
    main.classList.add('error');
    setTimeout(() => {
        main.classList.remove('error');
    }, 1000);
    valueSearch.value = '';
};

// Initialize the app with a default search
const initApp = () => {
    searchWeather('Washington');
};

initApp();

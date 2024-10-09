async function getWeather(location) {
    const apiKey = 'N8SR4SE4EKKAB4BR22WXD5E9N';
    const requestUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json`
    
    try {
        const response = await fetch(requestUrl, {mode: 'cors'})
        const data = await response.json()
        return data;
    }catch(err){
        clearInput();
        alert("Check your Location Spelling !");
    }
}

async function submit() {
    const submitButton = document.querySelector('#submit');
    const location = document.getElementById('location');
    submitButton.addEventListener('click', async () => {
        event.preventDefault();
        let data = await getWeather(location.value);
        displayData(data);
    })
}

function displayData(data){
    const infoDisplay = document.querySelector('.weatherForecast');
    const location = document.querySelector('.weatherForecast h2')
    const conditionsInfo = document.querySelector('.weatherForecast h3');
    const tempInfo = document.querySelector('.temp');
    const tempMinInfo = document.querySelector('.tempMin');
    const tempMaxInfo = document.querySelector('.tempMax');
    const sunriseInfo = document.querySelector('#sunrise');
    const sunsetInfo = document.querySelector('#sunset');
    const sunriseIcon = document.querySelector('#sunriseIcon');
    const sunsetIcon = document.querySelector('#sunsetIcon');

    const iconImg = document.querySelector('#icon');
    const iconMap = {
        'clear-day': 'icons/clear-day.svg',          // Clear weather during the day
        'clear-night': 'icons/clear-night.png',      // Clear weather at night
        'rain': 'icons/rain.svg',                    // Rainy weather
        'snow': 'icons/snow.svg',                    // Snowy weather
        'sleet': 'icons/sleet.png',                  // Sleet (a mix of rain and snow)
        'wind': 'icons/wind.png',                    // Windy conditions
        'fog': 'icons/fog.png',                      // Foggy weather
        'cloudy': 'icons/cloud.svg',                // Completely cloudy
        'partly-cloudy-day': 'icons/cloud.svg',  // Partly cloudy during the day
        'partly-cloudy-night': 'icons/cloud.svg', // Partly cloudy during the night
        'hail': 'icons/hail.png',                    // Hail
        'thunderstorm': 'icons/thunderstorm.svg',    // Thunderstorms
        'tornado': 'icons/tornado.png'               // Tornado conditions
    };

    console.log(data);
    let address = data.resolvedAddress;
    let temp = Math.floor(data.days[0].temp) + "°C";
    let description = data.days[0].description;
    let conditions = data.days[0].conditions;
    let feelsLikeTemp = data.days[0].feelslike;
    let humidity = data.days[0].humidity;
    let tempMin = 'min ' + Math.floor(data.days[0].tempmin) + "°C";
    let tempMax = 'max ' + Math.floor(data.days[0].tempmax) + "°C";
    let sunrise = data.days[0].sunrise.split(':').slice(0,2).join(":");
    let sunset = data.days[0].sunset.split(':').slice(0,2).join(":");
    let icon = data.days[0].icon;

    location.textContent = address;
    conditionsInfo.textContent = conditions;
    tempInfo.textContent = temp;
    tempMinInfo.textContent = tempMin;
    tempMaxInfo.textContent = tempMax;
    sunriseInfo.textContent = sunrise;
    sunriseIcon.src = "icons/sunrise.svg";
    sunsetIcon.src = "icons/sunset.svg";
    sunsetInfo.textContent= sunset;
    iconImg.src = iconMap[icon];

    
    

}

function clearInput() {
    const input = document.querySelector('#location');
    input.value = "";
}



submit();









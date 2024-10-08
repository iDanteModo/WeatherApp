async function showWeather(location) {
    const apiKey = 'N8SR4SE4EKKAB4BR22WXD5E9N';
    const requestUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json`
    const weatherText = document.querySelector('h2');
    
    try {
        const response = await fetch(requestUrl, {mode: 'cors'})
        const data = await response.json()
        weatherText.textContent = `Temperature in ${location} is: ${data.days[0].temp}C`;
    }catch(err){
        clearInput();
        alert("Check your Location Spelling !");
    }
}

function submit() {
    const submitButton = document.querySelector('#submit');
    const location = document.getElementById('location');
    submitButton.addEventListener('click', () => {
        event.preventDefault();
        let locationTemp = location.value;
        let locationFinal = locationTemp.charAt(0).toUpperCase() + locationTemp.slice(1).toLowerCase();
        showWeather(locationFinal);
        
    })
}

function clearInput() {
    const input = document.querySelector('#location');
    input.value = "";
}

submit();

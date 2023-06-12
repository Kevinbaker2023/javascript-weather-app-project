const key = 'a647987de6bc2c945358b066123f2803';


const form1 = document.getElementsByTagName('form')[0]
form1.addEventListener('submit', (event) => {
    event.preventDefault()
    const city_name = form1[0].value
    weatherData(city_name)
})

const weather = document.querySelector('.weather')

const weatherData = async (city_name) => {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=1&appid=${key}`)
    const data = await response.json()
    console.log(data)
    const lat = data[0]['lat']
    const lon = data[0]['lon']
    const response1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
    const data1 = await response1.json()
    console.log(data1)
    const temp = Math.ceil((data1.main.temp - 273) * 9/5 + 32)
    const min = Math.ceil((data1.main.temp_min - 273) * 9/5 + 32)
    const max = Math.ceil((data1.main.temp_max - 273) * 9/5 + 32)
    const feels_like = Math.ceil((data1.main.feels_like - 273) * 9/5 + 32)
    if (data1.weather[0].main === 'Clouds') {
        document.body.style.backgroundImage = "url('images/cloudy-day.jpeg')"
    } else if (data1.weather[0].main === 'Clear') {
        document.body.style.backgroundImage = "url('images/sunny-day.jpeg')"
    } else if (data1.weather[0].main === 'Rain') {
        document.body.style.backgroundImage = "url('images/rainy-day.jpeg')"
    } else if (data1.weather[0].main === 'snow') {
        document.body.style.backgroundImage = "url('images/snowy-day.jpeg')"
    } else if (data1.weather[0].main === 'Fog') {
        document.body.style.backgroundImage = "url('images/fog-day.jpeg')"
    } else {
        document.body.style.backgroundImage = "url('images/weather.jpeg')"
    }


    weather.innerHTML = `
        <div class="card mx-auto" id="weather-card" style="width: 18rem;">
            <div id="location">
                <h5 class="card-title text-center">${data1.name}, ${data1.sys.country}</h5>
            </div>
        <div class="card-body mx-auto">
            <ul>
                <li class="card-subtitle mb-2 text-body-secondary">Current Temperature: ${temp}°F</li>
                <li class="card-subtitle mb-2 text-body-secondary">Humidity: ${data1.main.humidity}%</li>
                <li class="card-subtitle mb-2 text-body-secondary">Pressure: ${data1.main.pressure}</li>
            </ul>
        </div>
        </div>
        <div class="card mx-auto" id="weather-card" style="width: 18rem;">
            <div id="forecast">
                <h5 class="card-title text-center">Forecast</h5>
            </div>
        <div class="card-body mx-auto">
            <ul>
                <li class="card-subtitle mb-2 text-body-secondary">Description: ${data1.weather[0].description}</li>
                <li class="card-subtitle mb-2 text-body-secondary">Feels Like: ${feels_like}°F</li>
                <li class="card-subtitle mb-2 text-body-secondary">Minimum Temperature ${min}°F</li>
                <li class="card-subtitle mb-2 text-body-secondary">Maximum Temperature: ${max}°F</li>
            </ul>
        </div>
        </div>
        <div class="card mx-auto" id="weather-card" style="width: 18rem;">
            <div id="wind">
                <h5 class="card-title text-center">Wind Conditions</h5>
            </div>
        <div class="card-body mx-auto">
            <ul>
                <li class="card-subtitle mb-2 text-body-secondary" id="card-padding">Wind Degrees: ${data1.wind.deg}</li>
                <li class="card-subtitle mb-2 text-body-secondary" id="card-padding">Wind Speed: ${data1.wind.speed}mph</li>
                <li class="card-subtitle mb-2 text-body-secondary" id="card-padding">Cloud Conditions: ${data1.clouds.all}</li>
            </ul>
        </div>
        </div>
    `
}
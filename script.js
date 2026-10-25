async function getWeather() {
  const city = document.getElementById("city").value;

  // Step A: find the city's location
  const geo = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
  );
  const geoData = await geo.json();

  if (!geoData.results) {
    document.getElementById("result").innerText = "City not found";
    return;
  }

  const { latitude, longitude, name } = geoData.results[0];

  // Step B: get the weather for that location
  const weather = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  );
  const weatherData = await weather.json();

  const temp = weatherData.current_weather.temperature;
  const wind = weatherData.current_weather.windspeed;

  document.getElementById("result").innerText =
    `${name}: ${temp}°C, wind ${wind} km/h`;
}
let chart = null;

function clearWeather() {
  document.getElementById("locationInfo").innerHTML = "";
  document.querySelector("#forecastTable tbody").innerHTML = "";
  document.getElementById("weatherError").innerHTML = "";

  if (chart) {
    chart.destroy();
    chart = null;
  }
}

async function getForecast() {
  const error = document.getElementById("weatherError");
  error.innerHTML = "";

  if (!navigator.geolocation) {
    error.innerHTML = "Geolocation is not supported by your browser.";
    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    try {
      // Optional: reverse geocode to get city/state
      const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
      const geoData = await geoRes.json();
      const displayName = geoData.display_name || "Unknown Location";

      document.getElementById("locationInfo").innerHTML =
        `${displayName}<br>Latitude = ${lat} - Longitude = ${lon}`;

      // Fetch weather
      const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&temperature_unit=fahrenheit&forecast_days=7`;
      const weatherRes = await fetch(weatherURL);
      const weatherData = await weatherRes.json();

      const tableBody = document.querySelector("#forecastTable tbody");
      tableBody.innerHTML = "";

      let labels = [];
      let temps = [];

      for (let i = 0; i < weatherData.hourly.time.length; i++) {
        const tmpdate = new Date(Date.parse(weatherData.hourly.time[i]));
        const friendly = tmpdate.toLocaleString();

        tableBody.innerHTML += `<tr>
          <td>${friendly}</td>
          <td>${weatherData.hourly.temperature_2m[i]}</td>
        </tr>`;

        labels.push(friendly);
        temps.push(weatherData.hourly.temperature_2m[i]);
      }

      // Render chart
      if (chart) chart.destroy();

      const ctx = document.getElementById("weatherChart").getContext("2d");
      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: "Temperature (°F)",
            data: temps,
            borderColor: "#ff2e00",
            backgroundColor: "rgba(255,46,0,0.2)",
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          scales: { y: { beginAtZero: false } }
        }
      });

    } catch (err) {
      console.error(err);
      error.innerHTML = "Failed to retrieve weather data.";
    }

  }, (err) => {
    console.error(err);
    error.innerHTML = "Location permission denied or unavailable.";
  });
}
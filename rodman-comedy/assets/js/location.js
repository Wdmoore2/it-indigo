// Tour stops data
const tourStops = [
  { city: "Chicago, IL", date: "March 15, 2026", lat: 41.8781, lon: -87.6298 },
  { city: "Atlanta, GA", date: "March 29, 2026", lat: 33.7490, lon: -84.3880 },
  { city: "Los Angeles, CA", date: "April 12, 2026", lat: 34.0522, lon: -118.2437 },
];

// Haversine formula to calculate distance between two lat/lon points
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Find closest tour stop
function findClosestShow(position) {
  const userLat = position.coords.latitude;
  const userLon = position.coords.longitude;

  let closest = null;
  let minDistance = Infinity;

  tourStops.forEach(stop => {
    const distance = getDistance(userLat, userLon, stop.lat, stop.lon);
    if(distance < minDistance){
      minDistance = distance;
      closest = stop;
    }
  });

  const display = document.getElementById("closest-show");
  display.innerHTML = `
   Closest Show<br>
  <span style="color:#ff2e00">${closest.city}</span><br>
  <small>${closest.date}</small>
`;
}

// Handle geolocation errors
function geoError(err){
  const display = document.getElementById("closest-show");
  if(err.code === 1){
    display.textContent = "Location access denied. Please allow location services.";
  } else {
    display.textContent = "Unable to retrieve location.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const locationBtn = document.getElementById("locationBtn");

  locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(findClosestShow, geoError);
    } else {
      document.getElementById("closest-show").textContent =
        "Geolocation not supported in this browser.";
    }
  });
});
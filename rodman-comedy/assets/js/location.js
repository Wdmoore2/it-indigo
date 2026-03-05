document.addEventListener("DOMContentLoaded", () => {
  const locationBtn = document.getElementById("locationBtn");
  const template = document.getElementById("show-card-template");
  const display = document.getElementById("closest-show");

  const tourStops = [
    { city: "Chicago, IL", lat: 41.8781, lon: -87.6298, date: "March 15, 2026", url: "https://chicago.zanies.com/" },
    { city: "Atlanta, GA", lat: 33.7490, lon: -84.3880, date: "March 29, 2026", url: "https://chicago.zanies.com/" },
    { city: "Los Angeles, CA", lat: 34.0522, lon: -118.2437, date: "April 12, 2026", url: "#" }
  ];

  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) * Math.sin(dLon/2)**2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  async function getUserLocation() {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      return { lat: parseFloat(data.latitude), lon: parseFloat(data.longitude) };
    } catch (err) {
      console.error("Failed to get user location:", err);
      return null;
    }
  }

  async function findClosestShow() {
    const userLoc = await getUserLocation();
    if (!userLoc) return tourStops[0]; // fallback to first show

    let closestStop = tourStops[0];
    let minDist = getDistance(userLoc.lat, userLoc.lon, closestStop.lat, closestStop.lon);

    tourStops.forEach(stop => {
      const dist = getDistance(userLoc.lat, userLoc.lon, stop.lat, stop.lon);
      if (dist < minDist) {
        minDist = dist;
        closestStop = stop;
      }
    });

    return closestStop;
  }

  locationBtn.addEventListener("click", async () => {
    display.innerHTML = "";
    const closest = await findClosestShow();
    const clone = template.content.cloneNode(true);
    clone.querySelector("h3").textContent = closest.city;
    clone.querySelector("p").textContent = closest.date;
    clone.querySelector("a").href = closest.url;
    display.appendChild(clone);
  });
});
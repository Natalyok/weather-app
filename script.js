const city = document.querySelector('.city')
const temp = document.querySelector('.temp')
const img = document.createElement('img')

navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude
    const long = position.coords.longitude
    const API = `https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${long}`

    fetch(API).then(
        response => response.json()
            .then(data => {
                city.innerText = data.name
                temp.innerText = data.main.temp
                img.src = data.weather[0].icon
                document.body.appendChild(img)
            }))

    const map = L.map("map").setView([lat, long], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    L.marker([lat, long]).addTo(map);
})


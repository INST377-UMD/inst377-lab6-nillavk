const map = L.map('map').setView([37.8, -96], 4); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);


function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

function createMarker(lat, lon, index) {
    const marker = L.marker([lat, lon]).addTo(map);

    $.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
        .done(data => {
            const locality = data.locality || "Unknown locality";
            marker.bindPopup(`Marker ${index + 1}<br>Latitude: ${lat}<br>Longitude: ${lon}<br>Locality: ${locality}`);

            // Add marker info to the webpage
            $('#markers-info').append(`
                <div class="marker-info">
                    <strong>Marker ${index + 1}:</strong> Latitude: ${lat}, Longitude: ${lon}<br>
                    Locality: ${locality}
                </div>
            `);
        })
}

// Generate 3 random coordinates and create markers
for (let i = 0; i < 3; i++) {
    const latitude = getRandomInRange(30, 35, 3);
    const longitude = getRandomInRange(-90, -100, 3);
    createMarker(latitude, longitude, i);
}
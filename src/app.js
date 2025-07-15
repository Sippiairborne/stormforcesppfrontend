import React, { useEffect } from 'react';
import L from 'leaflet';

function App() {
  useEffect(() => {
    const map = L.map('map').setView([35.1495, -90.0490], 6); // Memphis, TN
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
  }, []);

  return (
    <div className="app-container">
      <h1>🌪️ StormForce Map</h1>
      <div id="map" className="map-view"></div>
    </div>
  );
}

export default App;

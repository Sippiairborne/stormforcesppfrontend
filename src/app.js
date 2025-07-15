import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import './App.css';

function App() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Initialize the map
    const map = L.map('map').setView([35.1495, -90.0490], 6); // Memphis

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Fetch alerts from backend
    fetch('https://stormforceapp7.onrender.com/api/alerts')
      .then(res => res.json())
      .then(data => {
        setAlerts(data);
        data.forEach(alert => {
          if (alert.lat && alert.lon) {
            L.marker([alert.lat, alert.lon])
              .addTo(map)
              .bindPopup(alert.message || '⚠️ Alert');
          }
        });
      })
      .catch(err => {
        console.error('Error fetching alerts:', err);
      });
  }, []);

  return (
    <div className="app-container">
      <h1>🌪️ StormForce Map</h1>
      <div id="map" className="map-view"></div>
      <div className="alerts-list">
        <h2>Active Alerts</h2>
        {alerts.length === 0 ? (
          <p>No alerts available</p>
        ) : (
          <ul>
            {alerts.map((alert, i) => (
              <li key={i}>{alert.message}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;

import React, { useEffect } from 'react';
import { MapContainer, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.gridlayer.googlemutant';

// Note: Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual Google Maps API Key
const googleMutant = L.gridLayer.googleMutant({
  type: 'roadmap', // Valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
  maxZoom: 20,
  continuousWorld: true,
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
});

function GoogleMutantLayer() {
  const map = useMap();

  // Add the Google Maps layer when the map is ready
  useEffect(() => {
    map.addLayer(googleMutant);
  }, [map]);

  return null;
}

function Map() {
  return (
    <MapContainer center={[45.5051, -122.6750]} zoom={13} style={{ height: "450px", width: "100%" }}>
      <GoogleMutantLayer />
    </MapContainer>
  );
}

export default Map;

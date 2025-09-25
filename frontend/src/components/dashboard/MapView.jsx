import React from 'react';
import MapboxMap from '../map/MapboxMap';
import FloatingStats from './FloatingStats';
import MapControls from '../map/MapControls';
import EventsTrigger from '../events/EventsTrigger';

const MapView = ({ isActive }) => {
  return (
    <div className={`map-view ${!isActive ? 'hidden' : ''}`}>
      <div className="map-section">
        <MapboxMap />
        <FloatingStats />
        <MapControls />
        <EventsTrigger />
      </div>
      
      <div className="content-section">
        <div className="content-left">
          <h1>🗺️ Live Hazard Map</h1>
          <p>Real-time visualization of ocean hazards across India's coastline</p>
        </div>
        <div className="action-buttons">
          <button onClick={() => window.switchToOverview()}>📊 Back to Overview</button>
          <button onClick={() => window.toggleEventsPanel()}>📋 Events Panel</button>
          <button onClick={() => window.askForLocation()}>📍 My Location</button>
        </div>
      </div>
    </div>
  );
};

export default MapView;
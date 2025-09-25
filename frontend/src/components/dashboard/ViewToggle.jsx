import React from 'react';
import { useDashboard } from '../../context/DashboardContext';

const ViewToggle = () => {
  const { currentView, switchView } = useDashboard();

  return (
    <div className="view-toggle-nav">
      <button
        className={currentView === 'overview' ? 'active' : ''}
        onClick={() => switchView('overview')}
      >
        📊 Overview
      </button>
      <button
        className={currentView === 'map' ? 'active' : ''}
        onClick={() => switchView('map')}
      >
        🗺️ Live Map
      </button>
    </div>
  );
};

export default ViewToggle;
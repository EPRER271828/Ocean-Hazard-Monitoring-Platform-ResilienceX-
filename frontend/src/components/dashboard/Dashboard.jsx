import React from 'react';
import ViewToggle from './ViewToggle';
import OverviewView from './OverviewView';
import MapView from './MapView';
import EventsSidebar from '../events/EventsSidebar';
import { useDashboard } from '../../context/DashboardContext';

const Dashboard = () => {
  const { currentView } = useDashboard();

  return (
    <div className="main-container">
      <ViewToggle />
      
      <div className="view-container">
        <OverviewView isActive={currentView === 'overview'} />
        <MapView isActive={currentView === 'map'} />
      </div>
      
      <EventsSidebar />
    </div>
  );
};

export default Dashboard;
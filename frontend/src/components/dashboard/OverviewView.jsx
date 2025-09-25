import React from 'react';
import StatsCards from './StatsCards';
import { useAuth } from '../../hooks/useAuth';
import { useDashboard } from '../../context/DashboardContext';

const OverviewView = ({ isActive }) => {
  const { user, role } = useAuth();
  const { switchView } = useDashboard();

  const getHeaderContent = () => {
    switch (role) {
      case 'admin':
        return {
          title: '🔐 Admin Command Center',
          subtitle: 'Administrative controls and system monitoring'
        };
      case 'citizen':
        return {
          title: '👤 Citizen Reporter',
          subtitle: 'Submit geotagged reports and track hazard status'
        };
      default:
        return {
          title: '👋 Ocean Hazard Monitoring Platform',
          subtitle: 'Real-time crowdsourced reporting & social media analytics'
        };
    }
  };

  const { title, subtitle } = getHeaderContent();

  return (
    <div className={`overview-view ${!isActive ? 'hidden' : ''}`}>
      <div className="overview-header">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <div className="overview-actions">
          <button>📝 Submit Report</button>
          <button>📊 View Analytics</button>
          <button onClick={() => switchView('map')}>🗺️ View Live Map</button>
        </div>
      </div>
      
      <StatsCards />
    </div>
  );
};

export default OverviewView;
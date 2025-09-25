import { useState, useEffect } from 'react';

export const useHazardData = () => {
  const [hazardEvents, setHazardEvents] = useState([]);
  const [stats, setStats] = useState({
    totalReports: 128,
    activeHazards: 8,
    socialMentions: 542,
    resolvedIssues: 67,
    reportsToday: 12,
    criticalAlerts: 3,
    trendingHashtag: '#TsunamiAlert',
    resolutionRate: 94
  });

  useEffect(() => {
    // Sample hazard data
    const sampleData = [
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [80.2707, 13.0827] },
        properties: {
          type: 'tsunami',
          title: 'Tsunami Alert',
          location: 'Chennai Coast',
          description: 'Unusual wave patterns reported by local fishermen',
          severity: 'Critical',
          reports: 23,
          time: '15 mins ago'
        }
      },
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [72.8347, 18.9220] },
        properties: {
          type: 'storm',
          title: 'Storm Surge',
          location: 'Mumbai Harbor',
          description: 'Storm surge warning issued for next 6 hours',
          severity: 'High',
          reports: 45,
          time: '32 mins ago'
        }
      }
    ];
    
    setHazardEvents(sampleData);
  }, []);

  return {
    hazardEvents,
    stats
  };
};
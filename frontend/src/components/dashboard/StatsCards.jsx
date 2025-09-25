import React from 'react';
import { useHazardData } from '../../hooks/useHazardData';

const StatsCards = () => {
  const { stats } = useHazardData();

  return (
    <div className="overview-stats">
      <div className="overview-stat-card reports">
        <span className="overview-stat-icon">📊</span>
        <span className="overview-stat-number">{stats.totalReports}</span>
        <div className="overview-stat-label">Total Reports</div>
        <div className="overview-stat-subtitle">+{stats.reportsToday} in last 24hrs</div>
      </div>
      
      <div className="overview-stat-card hazards">
        <span className="overview-stat-icon">🚨</span>
        <span className="overview-stat-number">{stats.activeHazards}</span>
        <div className="overview-stat-label">Active Hazards</div>
        <div className="overview-stat-subtitle">{stats.criticalAlerts} critical alerts</div>
      </div>
      
      <div className="overview-stat-card social">
        <span className="overview-stat-icon">📱</span>
        <span className="overview-stat-number">{stats.socialMentions}</span>
        <div className="overview-stat-label">Social Mentions</div>
        <div className="overview-stat-subtitle">Trending: {stats.trendingHashtag}</div>
      </div>
      
      <div className="overview-stat-card resolved">
        <span className="overview-stat-icon">✅</span>
        <span className="overview-stat-number">{stats.resolvedIssues}</span>
        <div class="overview-stat-label">Resolved Issues</div>
        <div className="overview-stat-subtitle">{stats.resolutionRate}% resolution rate</div>
      </div>
    </div>
  );
};

export default StatsCards;
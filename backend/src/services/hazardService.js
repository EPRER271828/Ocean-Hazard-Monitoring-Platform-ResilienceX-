// backend/src/services/hazardService.js

const admin = require('firebase-admin');

class HazardService {
  constructor() {
    this.db = admin.firestore();
  }

  async getHazardsByLocation(lat, lng, radius = 50) {
    try {
      const hazardsRef = this.db.collection('hazards');
      const snapshot = await hazardsRef
        .where('status', '==', 'active')
        .orderBy('createdAt', 'desc')
        .get();
      
      const hazards = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        // Simple distance calculation (you might want to use proper geospatial queries)
        const distance = this.calculateDistance(lat, lng, data.latitude, data.longitude);
        if (distance <= radius) {
          hazards.push({ id: doc.id, ...data, distance });
        }
      });
      
      return hazards;
    } catch (error) {
      throw new Error(`Error fetching hazards: ${error.message}`);
    }
  }

  async createHazard(hazardData) {
    try {
      const hazardRef = this.db.collection('hazards');
      const docRef = await hazardRef.add({
        ...hazardData,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        status: 'active',
        verificationStatus: 'pending'
      });
      
      return { id: docRef.id, ...hazardData };
    } catch (error) {
      throw new Error(`Error creating hazard: ${error.message}`);
    }
  }

  async updateHazardStatus(hazardId, status) {
    try {
      const hazardRef = this.db.collection('hazards').doc(hazardId);
      await hazardRef.update({
        status,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      return { id: hazardId, status };
    } catch (error) {
      throw new Error(`Error updating hazard status: ${error.message}`);
    }
  }

  async getHazardStatistics() {
    try {
      const snapshot = await this.db.collection('hazards').get();
      const stats = {
        totalReports: 0,
        activeHazards: 0,
        resolvedIssues: 0,
        criticalAlerts: 0,
        reportsToday: 0,
        socialMentions: 542, // This would come from NLP service
        trendingHashtag: '#TsunamiAlert'
      };

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      snapshot.forEach(doc => {
        const data = doc.data();
        stats.totalReports++;
        
        if (data.status === 'active') stats.activeHazards++;
        if (data.status === 'resolved') stats.resolvedIssues++;
        if (data.severity === 'Critical') stats.criticalAlerts++;
        
        // Check if created today
        if (data.createdAt && data.createdAt.toDate() >= today) {
          stats.reportsToday++;
        }
      });

      stats.resolutionRate = stats.totalReports > 0 ? 
        Math.round((stats.resolvedIssues / stats.totalReports) * 100) : 0;

      return stats;
    } catch (error) {
      throw new Error(`Error fetching statistics: ${error.message}`);
    }
  }

  async getHazardById(hazardId) {
    try {
      const doc = await this.db.collection('hazards').doc(hazardId).get();
      if (!doc.exists) {
        throw new Error('Hazard not found');
      }
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      throw new Error(`Error fetching hazard: ${error.message}`);
    }
  }

  // Helper method to calculate distance between two points
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in km
    return distance;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180);
  }
}

module.exports = new HazardService();
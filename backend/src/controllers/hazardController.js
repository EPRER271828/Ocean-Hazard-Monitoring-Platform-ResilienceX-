const hazardService = require('../services/hazardService');

class HazardController {
  async getHazards(req, res, next) {
    try {
      const { lat, lng, radius = 50 } = req.query;
      const hazards = await hazardService.getHazardsByLocation(lat, lng, radius);
      res.json(hazards);
    } catch (error) {
      next(error);
    }
  }

  async createHazard(req, res, next) {
    try {
      const hazardData = req.body;
      const hazard = await hazardService.createHazard(hazardData);
      res.status(201).json(hazard);
    } catch (error) {
      next(error);
    }
  }

  async getHazardStats(req, res, next) {
    try {
      const stats = await hazardService.getHazardStatistics();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new HazardController();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = require('./src/app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🌊 Ocean Hazard API running on port ${PORT}`);
});
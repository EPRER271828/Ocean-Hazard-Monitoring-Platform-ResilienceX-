export const mapboxConfig = {
    accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    defaultStyle: 'mapbox://styles/mapbox/dark-v11',
    defaultCenter: [78.96, 20.59], // India center
    defaultZoom: 5,
    maxZoom: 18,
    minZoom: 2
  };
  
  export const hazardStyles = {
    colors: {
      tsunami: '#dc2626',
      storm: '#ea580c',
      waves: '#d97706',
      flood: '#0891b2'
    },
    icons: {
      tsunami: '🌊',
      storm: '🌀',
      waves: '🌊',
      flood: '💧'
    }
  };
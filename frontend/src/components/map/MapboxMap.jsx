import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { mapboxConfig, hazardStyles } from '../../config/mapbox';
import { useHazardData } from '../../hooks/useHazardData';

const MapboxMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const { hazardEvents } = useHazardData();

  useEffect(() => {
    if (map.current) return;

    mapboxgl.accessToken = mapboxConfig.accessToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapboxConfig.defaultStyle,
      center: mapboxConfig.defaultCenter,
      zoom: mapboxConfig.defaultZoom
    });

    map.current.on('load', () => {
      // Add hazard data source
      map.current.addSource('hazards', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: hazardEvents
        }
      });

      // Add hazard markers layer
      map.current.addLayer({
        id: 'hazard-markers',
        type: 'circle',
        source: 'hazards',
        paint: {
          'circle-radius': [
            'case',
            ['==', ['get', 'severity'], 'Critical'], 20,
            ['==', ['get', 'severity'], 'High'], 16,
            12
          ],
          'circle-color': [
            'case',
            ['==', ['get', 'type'], 'tsunami'], hazardStyles.colors.tsunami,
            ['==', ['get', 'type'], 'storm'], hazardStyles.colors.storm,
            ['==', ['get', 'type'], 'waves'], hazardStyles.colors.waves,
            ['==', ['get', 'type'], 'flood'], hazardStyles.colors.flood,
            '#64748b'
          ],
          'circle-stroke-color': '#ffffff',
          'circle-stroke-width': 3,
          'circle-opacity': 0.9
        }
      });

      // Add click events
      map.current.on('click', 'hazard-markers', (e) => {
        const properties = e.features[0].properties;
        const coordinates = e.features[0].geometry.coordinates.slice();

        const popupContent = `
          <div style="font-family: 'Segoe UI', sans-serif; min-width: 200px;">
            <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 12px; margin: -10px -10px 10px -10px; border-radius: 8px 8px 0 0;">
              <strong style="font-size: 16px;">${properties.title}</strong>
            </div>
            <div style="padding: 0 5px;">
              <p style="margin: 8px 0; color: #64748b; font-size: 13px;"><strong>📍 Location:</strong> ${properties.location}</p>
              <p style="margin: 8px 0; color: #64748b; font-size: 12px; line-height: 1.4;">${properties.description}</p>
              <div style="display: flex; justify-content: space-between; margin-top: 12px; font-size: 11px; color: #64748b;">
                <span><strong>📊 ${properties.reports} reports</strong></span>
                <span><strong>⚠️ ${properties.severity}</strong></span>
              </div>
            </div>
          </div>
        `;

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(popupContent)
          .addTo(map.current);
      });

      // Add controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
      map.current.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');
    });

    // Cleanup
    return () => map.current?.remove();
  }, []);

  // Update data when hazardEvents change
  useEffect(() => {
    if (map.current && map.current.getSource('hazards')) {
      map.current.getSource('hazards').setData({
        type: 'FeatureCollection',
        features: hazardEvents
      });
    }
  }, [hazardEvents]);

  return <div ref={mapContainer} id="map" />;
};

export default MapboxMap;
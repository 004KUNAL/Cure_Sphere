import { useEffect, useRef } from 'react';

const GoogleMap = ({ center, zoom = 14, markers = [] }) => {
  const mapRef = useRef(null);
  const googleMap = useRef(null);

  useEffect(() => {
    if (window.google && mapRef.current && !googleMap.current) {
      googleMap.current = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
        styles: [
          {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#7c93a3"}]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{"color": "#fefefe"}]
          },
          // ... more styles for a clean medical look
        ],
        disableDefaultUI: true,
        zoomControl: true,
      });
    }
  }, [center, zoom]);

  useEffect(() => {
    if (googleMap.current && markers.length > 0) {
      markers.forEach(marker => {
        new window.google.maps.Marker({
          position: marker.position,
          map: googleMap.current,
          title: marker.title,
          icon: marker.icon || {
            path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            scale: 5,
            fillColor: "#ef4444",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#ffffff",
          }
        });
      });
    }
  }, [markers]);

  return <div ref={mapRef} className="w-full h-full rounded-2xl" />;
};

export default GoogleMap;

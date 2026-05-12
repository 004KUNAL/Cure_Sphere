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

  if (!window.google) {
    return (
      <div className="w-full h-full rounded-2xl bg-gray-100 flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-gray-200">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        </div>
        <h3 className="font-bold text-gray-600 mb-2">Live Map Coming Soon</h3>
        <p className="text-xs text-gray-400 max-w-[200px]">
          We're currently setting up live tracking. In the meantime, you can still request emergency services.
        </p>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-full rounded-2xl shadow-inner bg-gray-50" />;
};

export default GoogleMap;

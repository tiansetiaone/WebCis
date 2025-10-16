'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const createMarkerIcon = () => {
  return L.icon({
    iconUrl: '/images/locate cis.png',
    iconRetinaUrl: '/images/locate cis.png',
    shadowUrl: '/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

const LocationMap = () => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    };

    if (!mapRef.current) {
      mapRef.current = L.map('map-container', {
        zoomControl: false,
        preferCanvas: true
      }).setView([-6.9147, 107.6098], 7);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(mapRef.current);

      // Add locations
      const locations = [
        {
          id: 1,
          name: "HEAD OFFICE & FACTORY",
          coords: [-6.922248678433621, 107.56976369018082],
          address: "Jl. H. Alpi 107, Cijerah, Bandung 40212",
          contact: "Phone: +62 22 6025888"
        },
        {
          id: 2,
          name: "PURWAKARTA FACTORY",
          coords: [-6.494379313666955, 107.52754486524533],
          address: "JL. Raya Cibatu Km.14,2 Campaka - Purwakarta 41182",
          contact: "Phone: +62 264 208143"
        },
        {
          id: 3,
          name: "HOUSE OF CISANGKAN",
          coords: [-6.198693969968487, 106.74706329223018],
          address: "Kompleks Perkantoran Intercon Plaza E-16, Jakarta Barat 11630",
          contact: "Phone: +62 21 5853305"
        },
        {
          id: 4,
          name: "PASURUAN FACTORY",
          coords: [-7.715681053402352, 113.05303583457803],
          address: "Jl. Raya Sedarum Km 19, No 8A - Nguling Kab. Pasuruan",
          contact: "Phone: +62 343 6408682"
        }
      ];

      const icon = createMarkerIcon();
      markersRef.current = locations.map(location => {
        return L.marker(location.coords, { icon })
          .addTo(mapRef.current)
          .bindPopup(`
            <div class="w-40">
              <h4 class="font-bold text-sm mb-1">${location.name}</h4>
              <p class="text-xs text-gray-600 mb-1">${location.address}</p>
              <p class="text-xs text-blue-600">${location.contact}</p>
            </div>
          `);
      });

      const group = L.featureGroup(markersRef.current);
      mapRef.current.fitBounds(group.getBounds().pad(0.2));

      L.control.zoom({
        position: 'topright'
      }).addTo(mapRef.current);

      // Fix z-index issues
      const style = document.createElement('style');
      style.innerHTML = `
        .leaflet-top, .leaflet-bottom {
          z-index: 10 !important;
        }
        .leaflet-pane {
          z-index: 1 !important;
        }
        .leaflet-control {
          z-index: 10 !important;
        }
      `;
      document.head.appendChild(style);

      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative z-0 2xl:mb-24">
      <div 
        id="map-container" 
        className="rounded-lg shadow-md border border-gray-200 overflow-hidden"
        style={{ 
          height: '450px',
          width: '100%',
          marginTop: '19px' // Adjust based on your navbar height
        }}
      />
    </div>
  );
};

export default LocationMap;
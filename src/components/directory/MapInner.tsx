"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Search, Loader2 } from "lucide-react";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// DEFAULT: BANGALORE
const DEFAULT_CENTER = { lat: 12.9716, lng: 77.5946 };

interface MapInnerProps {
  onLocationSelect: (loc: { lat: number; lng: number; address: string }) => void;
  setAddress: (addr: string) => void;
}

function FlyToLocation({ center }: { center: { lat: number, lng: number } }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, 15);
  }, [center, map]);
  return null;
}

function MapClickHandler({ setMarkerPos, updateLocation }: any) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      setMarkerPos({ lat, lng });
      updateLocation(lat, lng);
    },
  });
  return null;
}

export default function MapInner({ onLocationSelect, setAddress }: MapInnerProps) {
  const [markerPos, setMarkerPos] = useState(DEFAULT_CENTER);
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const updateLocation = async (lat: number, lng: number) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await res.json();
      const addr = data.display_name || "Pinned Location";
      
      setAddress(addr);
      onLocationSelect({ lat, lng, address: addr });
    } catch (error) {
      const fallback = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      setAddress(fallback);
      onLocationSelect({ lat, lng, address: fallback });
    }
  };

  const executeSearch = async () => {
    if (!searchText) return;
    setIsSearching(true);
    
    try {
      // FIX: Added '&countrycodes=in' to restrict search to India
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}&countrycodes=in`);
      const data = await res.json();

      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const newLat = parseFloat(lat);
        const newLng = parseFloat(lon);

        setMarkerPos({ lat: newLat, lng: newLng });
        setAddress(display_name);
        onLocationSelect({ lat: newLat, lng: newLng, address: display_name });
      } else {
        alert("Location not found in India");
      }
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      executeSearch();
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setMarkerPos({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        (err) => {
          console.warn("Geolocation denied, using default center.");
        }
      );
    }
  }, []);

  return (
    <div className="relative h-full w-full group">
      <div className="absolute top-2 left-2 right-2 z-[500]">
        <div className="relative shadow-md rounded-lg overflow-hidden flex bg-white/90">
          <input 
            type="text" 
            placeholder="Search area (e.g. Jayanagar)..." 
            className="w-full pl-3 pr-10 py-2 text-xs font-medium text-slate-700 bg-transparent focus:bg-white outline-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button 
            type="button" 
            onClick={executeSearch}
            className="absolute right-0 top-0 h-full px-3 text-slate-500 hover:text-[#D4AF37] hover:bg-white transition-colors"
          >
            {isSearching ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
          </button>
        </div>
      </div>

      <MapContainer 
        center={markerPos} 
        zoom={13} 
        style={{ height: "100%", width: "100%" }}
        zoomControl={false} 
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={markerPos} icon={icon} />
        <FlyToLocation center={markerPos} />
        <MapClickHandler setMarkerPos={setMarkerPos} updateLocation={updateLocation} />
      </MapContainer>
    </div>
  );
}
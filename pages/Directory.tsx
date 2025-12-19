import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { lawyers } from '../data/mockData';
import Section from '../components/Section';
import { 
  Star, MapPin, Briefcase, Map as MapIcon, List, Search, Navigation, Filter, Loader2, Milestone, ExternalLink,
  Building2, Home, Gavel, Globe, Lightbulb, Users, Scale, Shield
} from 'lucide-react';
import * as L from 'leaflet';

// Utility to calculate distance between two coordinates (Haversine formula)
const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

// Helper to get icon based on specialty name
const getSpecialtyIcon = (specialty: string) => {
  if (specialty.includes('تجارت') || specialty.includes('شرکت') || specialty.includes('قرارداد')) return <Building2 className="w-3 h-3" />;
  if (specialty.includes('ملک') || specialty.includes('اراضی') || specialty.includes('شهرداری')) return <Home className="w-3 h-3" />;
  if (specialty.includes('کیفری') || specialty.includes('جزا') || specialty.includes('جرم')) return <Gavel className="w-3 h-3" />;
  if (specialty.includes('بین‌المللی')) return <Globe className="w-3 h-3" />;
  if (specialty.includes('مالکیت') || specialty.includes('استارتاپ') || specialty.includes('رایانه')) return <Lightbulb className="w-3 h-3" />;
  if (specialty.includes('خانواده')) return <Users className="w-3 h-3" />;
  if (specialty.includes('دیوان') || specialty.includes('اقتصادی')) return <Shield className="w-3 h-3" />;
  return <Scale className="w-3 h-3" />;
};

const Directory: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [filteredLawyers, setFilteredLawyers] = useState(lawyers);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [nearestLawyer, setNearestLawyer] = useState<typeof lawyers[0] | null>(null);
  const [routeInfo, setRouteInfo] = useState<{duration: number, distance: number} | null>(null);
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const routeLayerRef = useRef<L.Layer | null>(null);
  const navigate = useNavigate();

  // Extract unique specialties for the dropdown
  const specialties = Array.from(new Set(lawyers.flatMap(l => l.specialties)));

  // Filter lawyers based on search and specialty
  useEffect(() => {
    let result = lawyers;

    // Filter by specialty
    if (selectedSpecialty) {
      result = result.filter(l => l.specialties.includes(selectedSpecialty));
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(l => 
        l.name.includes(query) || 
        l.location.address.includes(query) ||
        l.specialties.some(s => s.includes(query))
      );
    }
    
    // Sort by distance if user location is available
    if (userLocation) {
      result = [...result].sort((a, b) => {
        const distA = getDistance(userLocation.lat, userLocation.lng, a.location.lat, a.location.lng);
        const distB = getDistance(userLocation.lat, userLocation.lng, b.location.lat, b.location.lng);
        return distA - distB;
      });
    }

    setFilteredLawyers(result);
  }, [searchQuery, selectedSpecialty, userLocation]);

  const fetchRoute = async (startLat: number, startLng: number, endLat: number, endLng: number) => {
    try {
      // Using OSRM Public API (Project OSRM)
      const url = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const geometry = route.geometry;
        
        // Save route info
        setRouteInfo({
          duration: Math.round(route.duration / 60), // seconds to minutes
          distance: (route.distance / 1000) // meters to km
        });

        // Draw on map
        if (mapInstanceRef.current) {
          // Remove old route
          if (routeLayerRef.current) {
            mapInstanceRef.current.removeLayer(routeLayerRef.current);
          }

          // Create styled polyline
          const routeLayer = L.geoJSON(geometry, {
            style: {
              color: '#0f172a', // Primary Navy
              weight: 5,
              opacity: 0.8,
              lineCap: 'round',
              lineJoin: 'round'
            }
          }).addTo(mapInstanceRef.current);
          
          routeLayerRef.current = routeLayer;

          // Fit bounds to show route
          mapInstanceRef.current.fitBounds(routeLayer.getBounds(), {
            padding: [50, 50],
            maxZoom: 16
          });
        }
      }
    } catch (error) {
      console.error("Failed to fetch route", error);
    }
  };

  const handleNearMe = () => {
    setIsLocating(true);
    setRouteInfo(null);
    setNearestLawyer(null);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLoc = { lat: latitude, lng: longitude };
          setUserLocation(userLoc);
          setViewMode('map');
          setIsLocating(false);

          const sorted = [...lawyers].sort((a, b) => {
            const distA = getDistance(latitude, longitude, a.location.lat, a.location.lng);
            const distB = getDistance(latitude, longitude, b.location.lat, b.location.lng);
            return distA - distB;
          });

          if (sorted.length > 0) {
            const closest = sorted[0];
            setNearestLawyer(closest);
            fetchRoute(latitude, longitude, closest.location.lat, closest.location.lng);
          }
        },
        (error) => {
          console.error("Error getting location", error);
          alert("عدم دسترسی به موقعیت مکانی. نمایش موقعیت پیش‌فرض در تهران برای دمو.");
          const demoLoc = { lat: 35.7550, lng: 51.4100 };
          setUserLocation(demoLoc);
          setViewMode('map');
          setIsLocating(false);
          
          const sorted = [...lawyers].sort((a, b) => {
            const distA = getDistance(demoLoc.lat, demoLoc.lng, a.location.lat, a.location.lng);
            const distB = getDistance(demoLoc.lat, demoLoc.lng, b.location.lat, b.location.lng);
            return distA - distB;
          });
          if(sorted.length > 0) {
              setNearestLawyer(sorted[0]);
              fetchRoute(demoLoc.lat, demoLoc.lng, sorted[0].location.lat, sorted[0].location.lng);
          }
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      alert("مرورگر شما از موقعیت مکانی پشتیبانی نمی‌کند.");
      setIsLocating(false);
    }
  };

  // Initialize Map
  useEffect(() => {
    if (viewMode === 'map' && mapContainerRef.current && !mapInstanceRef.current) {
      const initialLat = userLocation ? userLocation.lat : 35.715298;
      const initialLng = userLocation ? userLocation.lng : 51.404343;
      const initialZoom = userLocation ? 14 : 12;

      const map = L.map(mapContainerRef.current).setView([initialLat, initialLng], initialZoom);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;
    }
    
    if (viewMode === 'map' && mapInstanceRef.current) {
      const map = mapInstanceRef.current;
      
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker && layer !== userMarkerRef.current) {
          map.removeLayer(layer);
        }
      });

      if (userLocation) {
        if (userMarkerRef.current) {
             map.removeLayer(userMarkerRef.current);
        }
        
        const userIconHtml = `
          <div class="relative w-4 h-4 flex items-center justify-center">
             <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
             <span class="relative inline-flex rounded-full h-4 w-4 bg-blue-600 border-2 border-white shadow-lg"></span>
          </div>
        `;
        const userIcon = L.divIcon({
          className: 'custom-user-marker',
          html: userIconHtml,
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });

        userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon, zIndexOffset: 1000 })
          .addTo(map)
          .bindPopup('<div class="text-center font-bold text-slate-800 p-2">شما اینجا هستید</div>');
      }

      filteredLawyers.forEach(lawyer => {
        const isNearest = nearestLawyer?.id === lawyer.id;
        const iconHtml = `
          <div class="relative group flex flex-col items-center hover:z-50 transition-all cursor-pointer ${isNearest ? 'z-[900]' : 'z-20'}">
            <div class="w-16 h-16 rounded-full border-4 ${isNearest ? 'border-green-500 scale-110' : 'border-white'} shadow-xl overflow-hidden bg-gray-100 relative z-20 transition-transform transform group-hover:scale-110 group-hover:border-accent">
               <img src="${lawyer.imageUrl}" class="w-full h-full object-cover" alt="${lawyer.name}" />
            </div>
            ${isNearest ? '<div class="absolute -top-8 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm animate-bounce">نزدیک‌ترین وکیل</div>' : ''}
            <div class="absolute bottom-6 w-4 h-4 bg-white transform rotate-45 shadow-sm z-10"></div>
            
            <div class="mt-2 bg-slate-900/90 backdrop-blur-sm text-white text-[11px] px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap opacity-100 border border-white/10 z-30 transition-all group-hover:bg-accent group-hover:text-slate-900 group-hover:font-bold">
              ${lawyer.name}
            </div>
          </div>
        `;

        const customIcon = L.divIcon({
          className: 'custom-map-marker',
          html: iconHtml,
          iconSize: [80, 100], 
          iconAnchor: [40, 70], 
          popupAnchor: [0, -70]
        });

        const popupContent = `
          <div 
             onclick="window.location.hash = '/lawyer/${lawyer.id}'"
             class="flex flex-col font-sans text-right cursor-pointer group hover:bg-gray-50 transition-colors rounded-lg overflow-hidden" 
             dir="rtl"
          >
            <div class="p-4 bg-white">
              <div class="flex items-center justify-between mb-2">
                 <div class="bg-accent/20 px-2 py-0.5 rounded-full">
                    <span class="text-accent text-xs font-bold">${lawyer.rating} ★</span>
                 </div>
                 <span class="text-gray-400 text-[10px]">${lawyer.title}</span>
              </div>
              <h3 class="font-bold text-slate-900 text-base mb-1 group-hover:text-accent transition-colors">${lawyer.name}</h3>
              <p class="text-xs text-gray-500 mb-2 truncate">${lawyer.specialties.join('، ')}</p>
              
              <div class="text-[10px] text-gray-500 flex items-center gap-1 mb-3 truncate border-t border-gray-100 pt-2">
                 <span class="truncate w-full">${lawyer.location.address}</span>
              </div>
              
              <button class="w-full text-center bg-slate-900 text-white text-xs py-2 rounded font-bold group-hover:bg-accent group-hover:text-slate-900 transition-all shadow-md">
                مشاهده پروفایل کامل
              </button>
            </div>
          </div>
        `;

        const marker = L.marker([lawyer.location.lat, lawyer.location.lng], { icon: customIcon })
          .addTo(map)
          .bindPopup(popupContent);
          
        if (isNearest) {
             marker.openPopup();
        }
      });
    }

    return () => {
      if (viewMode === 'list' && mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        userMarkerRef.current = null;
        routeLayerRef.current = null;
      }
    };
  }, [viewMode, filteredLawyers, userLocation, nearestLawyer]);

  const openGoogleMaps = () => {
      if(userLocation && nearestLawyer) {
          const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${nearestLawyer.location.lat},${nearestLawyer.location.lng}&travelmode=driving`;
          window.open(url, '_blank');
      }
  };

  return (
    <Section title="معرفی وکلای برتر" subtitle="جستجو بر اساس تخصص و موقعیت مکانی" light>
      
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100 mb-8 sticky top-24 z-30 animate-fadeInUp">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 w-full lg:w-2/3">
             <div className="relative w-full md:w-3/5">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  className="block w-full pr-10 pl-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent sm:text-sm transition-all"
                  placeholder="جستجوی نام وکیل یا محله..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>

             <div className="relative w-full md:w-2/5">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                   <Filter className="h-4 w-4 text-gray-400" />
                </div>
                <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="block w-full pr-10 pl-3 py-3 border border-gray-300 rounded-md leading-5 bg-white text-gray-700 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent sm:text-sm transition-all appearance-none cursor-pointer"
                >
                    <option value="">همه تخصص‌ها</option>
                    {specialties.map((spec, index) => (
                        <option key={index} value={spec}>{spec}</option>
                    ))}
                </select>
             </div>
          </div>
          
          <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
             <button 
                onClick={handleNearMe}
                disabled={isLocating}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition disabled:opacity-70 disabled:cursor-wait"
             >
                {isLocating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
                <span className="hidden xl:inline">{isLocating ? 'در حال یافتن...' : 'نزدیک من'}</span>
             </button>
             
             <div className="flex bg-gray-100 p-1 rounded-lg">
                <button 
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  <List className="w-4 h-4" />
                  لیست
                </button>
                <button 
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'map' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  <MapIcon className="w-4 h-4" />
                  نقشه
                </button>
             </div>
          </div>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="grid grid-cols-1 gap-8">
          {filteredLawyers.length > 0 ? (
            filteredLawyers.map((lawyer, index) => (
              <div 
                key={lawyer.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row group animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-full md:w-64 h-64 md:h-auto relative shrink-0 overflow-hidden">
                   <img src={lawyer.imageUrl} alt={lawyer.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute top-4 right-4 bg-accent text-slate-900 text-xs font-bold px-3 py-1 rounded-sm">
                     {lawyer.rating} <Star className="w-3 h-3 inline mb-1 fill-slate-900" />
                   </div>
                </div>

                <div className="p-8 flex-grow flex flex-col justify-between">
                   <div>
                     <div className="flex justify-between items-start mb-2">
                       <div>
                         <h3 className="text-2xl font-bold text-slate-900">{lawyer.name}</h3>
                         <p className="text-accent font-medium mt-1">{lawyer.title}</p>
                       </div>
                       <div className="text-gray-400 text-xs text-left">
                         شماره پروانه: {lawyer.licenseNumber}
                       </div>
                     </div>

                     <p className="text-gray-600 leading-7 mb-6 line-clamp-2">
                       {lawyer.description}
                     </p>

                     <div className="flex flex-wrap gap-2 mb-6">
                       {lawyer.specialties.map((spec, index) => (
                         <span key={index} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">
                           {getSpecialtyIcon(spec)}
                           {spec}
                         </span>
                       ))}
                     </div>
                   </div>

                   <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                     <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-1 hover:text-slate-800 transition cursor-help" title={lawyer.location.address}>
                          <MapPin className="w-4 h-4 text-accent" /> {lawyer.location.address}
                        </span>
                        <span className="flex items-center gap-1"><Briefcase className="w-4 h-4 text-accent" /> ۱۵+ سال سابقه</span>
                        {userLocation && (
                           <span className="flex items-center gap-1 text-green-600 font-bold bg-green-50 px-2 rounded">
                              <Navigation className="w-3 h-3" /> 
                              {getDistance(userLocation.lat, userLocation.lng, lawyer.location.lat, lawyer.location.lng).toFixed(1)} km
                           </span>
                        )}
                     </div>
                     <Link to={`/lawyer/${lawyer.id}`} className="bg-primary hover:bg-slate-800 text-white px-6 py-2 rounded text-sm font-medium transition-colors whitespace-nowrap">
                       مشاهده پروفایل
                     </Link>
                   </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300 animate-fadeInUp">
               <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
               <p className="text-gray-500 font-medium">نتیجه‌ای با این مشخصات یافت نشد.</p>
               <button onClick={() => { setSearchQuery(''); setSelectedSpecialty(''); }} className="text-accent text-sm mt-2 hover:underline">مشاهده همه وکلا</button>
            </div>
          )}
        </div>
      ) : (
        <div className="h-[700px] rounded-xl overflow-hidden shadow-2xl border border-gray-200 animate-fadeIn relative z-0">
           <div ref={mapContainerRef} className="w-full h-full bg-slate-100"></div>
           
           <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur p-4 rounded-lg shadow-lg z-[400] max-w-xs text-xs">
              <h4 className="font-bold mb-2">راهنمای نقشه</h4>
              <p className="text-gray-600 mb-1">برای مشاهده رزومه، روی تصویر وکیل کلیک کنید.</p>
              <div className="flex flex-col gap-2 mt-2">
                 {userLocation && (
                   <div className="flex items-center gap-2">
                     <div className="w-3 h-3 bg-blue-600 rounded-full border border-white shadow"></div>
                     <span className="text-blue-700 font-bold">موقعیت شما</span>
                   </div>
                 )}
                 {routeInfo && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-slate-800 font-bold mb-1">
                            <Milestone className="w-3 h-3 text-accent" />
                            <span>مسیر تا نزدیکترین وکیل:</span>
                        </div>
                        <p className="text-gray-600">فاصله: {routeInfo.distance.toFixed(1)} کیلومتر</p>
                        <p className="text-gray-600">زمان تقریبی: {routeInfo.duration} دقیقه</p>
                        
                        <button 
                            onClick={openGoogleMaps}
                            className="mt-3 w-full flex items-center justify-center gap-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        >
                            <ExternalLink className="w-3 h-3" /> مسیریابی در گوگل
                        </button>
                    </div>
                 )}
              </div>
           </div>
        </div>
      )}
    </Section>
  );
};

export default Directory;
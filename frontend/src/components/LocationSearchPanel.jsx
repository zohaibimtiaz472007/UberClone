import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

// Location Search Panel Component
const LocationSearchPanel = ({ 
  isOpen, 
  onClose, 
  onSelectLocation, 
  inputType,
  searchQuery,
  setSearchQuery
}) => {
  const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const panelRef = useRef(null);
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    // Debounce search to avoid too many API calls
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      const fetchSuggestions = async () => {
        if (searchQuery && searchQuery.trim() !== "") {
          setIsLoading(true);
          try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/suggestions`, {
              params: { query: searchQuery },
              headers: {
                'Authorization' : `Bearer ${localStorage.getItem('token')}` // Include token if required by backend
              }
            });
            setSuggestedLocations(Array.isArray(response.data) ? response.data : []);
          } catch (error) {
            console.error("Error fetching suggestions:", error);
            setSuggestedLocations([]);
          } finally {
            setIsLoading(false);
          }
        } else {
          setSuggestedLocations([]);
        }
      };

      fetchSuggestions();
    }, 500); // 500ms debounce delay

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
        onClick={onClose}
      />
      
      <div 
        ref={panelRef}
        className="fixed bottom-0 left-0 right-0 md:absolute md:bottom-auto md:left-1/2 md:-translate-x-1/2 z-50
                   bg-white rounded-t-3xl md:rounded-2xl shadow-2xl 
                   animate-slideUp md:animate-slideDown
                   max-h-[85vh] md:max-h-[80vh] overflow-hidden"
        style={{
          width: '100%',
          maxWidth: '700px',
          margin: '0 auto'
        }}
      >
        <div className="md:hidden w-full flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>

        <div className="px-5 pt-4 pb-3 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {inputType === 'pickup' ? 'Choose pickup location' : 'Choose destination'}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">Select from below or search manually</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text"
              placeholder="Search for a location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-2 focus:ring-black/10 outline-none transition-all duration-300 bg-gray-50"
              autoFocus
            />
            {isLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-y-auto max-h-[55vh] md:max-h-[60vh] custom-scrollbar">
          {suggestedLocations.length === 0 && searchQuery && !isLoading && (
            <div className="px-5 py-8 text-center">
              <p className="text-gray-500">No locations found</p>
            </div>
          )}
          {suggestedLocations.map((location, index) => (
            <div 
              key={location.id || index}
              onClick={() => onSelectLocation(location)}
              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 cursor-pointer transition-all duration-200 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{location.name || location.address || location.description || 'Location'}</p>
                <p className="text-sm text-gray-500">{location.address || location.description || ''}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        
        @keyframes slideDown {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-slideDown {
          animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
        
        @media (min-width: 768px) {
          .animate-slideDown {
            animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
        }
      `}</style>
    </>
  );
};

export default LocationSearchPanel;
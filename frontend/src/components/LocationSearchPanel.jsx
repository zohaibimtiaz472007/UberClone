import React, { useState, useRef, useEffect } from 'react'

// Location Search Panel Component
const LocationSearchPanel = ({ 
  isOpen, 
  onClose, 
  onSelectLocation, 
  inputType,
  searchQuery,
  setSearchQuery
}) => {
  const [recentLocations] = useState([
    { id: 1, name: "Home", address: "123 Main Street, New York", lat: 40.7128, lng: -74.0060, icon: "🏠" },
    { id: 2, name: "Work", address: "456 Business Ave, New York", lat: 40.7580, lng: -73.9855, icon: "💼" },
    { id: 3, name: "Airport", address: "JFK Airport, Queens", lat: 40.6413, lng: -73.7781, icon: "✈️" }
  ])

  const [suggestedLocations] = useState([
    { id: 4, name: "Times Square", address: "Manhattan, NY 10036", lat: 40.7580, lng: -73.9855, distance: "0.5 miles", eta: "5 min" },
    { id: 5, name: "Central Park", address: "New York, NY 10022", lat: 40.7851, lng: -73.9683, distance: "1.2 miles", eta: "8 min" },
    { id: 6, name: "Brooklyn Bridge", address: "Brooklyn, NY 11201", lat: 40.7061, lng: -73.9969, distance: "2.3 miles", eta: "12 min" },
    { id: 7, name: "Statue of Liberty", address: "Liberty Island, NY 10004", lat: 40.6892, lng: -74.0445, distance: "3.1 miles", eta: "15 min" },
    { id: 8, name: "Empire State Building", address: "350 5th Ave, New York", lat: 40.7488, lng: -73.9857, distance: "0.8 miles", eta: "6 min" }
  ])

  const panelRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const filteredRecent = recentLocations.filter(loc => 
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredSuggestions = suggestedLocations.filter(loc =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
          </div>
        </div>

        <div className="overflow-y-auto max-h-[55vh] md:max-h-[60vh] custom-scrollbar">
          <div 
            onClick={() => onSelectLocation({ name: "Current Location", address: "Using your device location", lat: 40.7128, lng: -74.0060 })}
            className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 cursor-pointer transition-all duration-200 border-b border-gray-50"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Use current location</p>
              <p className="text-sm text-gray-500">Get your exact location</p>
            </div>
            <div className="text-blue-500 text-sm font-medium bg-blue-50 px-3 py-1 rounded-full">Detect</div>
          </div>

          {filteredRecent.length > 0 && (
            <div className="py-2">
              <div className="px-5 py-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Recent places</p>
              </div>
              {filteredRecent.map(location => (
                <div 
                  key={location.id}
                  onClick={() => onSelectLocation(location)}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 cursor-pointer transition-all duration-200"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                    {location.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{location.name}</p>
                    <p className="text-sm text-gray-500">{location.address}</p>
                  </div>
                  <div className="text-gray-400 text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {Math.floor(Math.random() * 15) + 5} min ago
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredSuggestions.length > 0 && (
            <div className="py-2">
              <div className="px-5 py-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Popular destinations</p>
              </div>
              {filteredSuggestions.map(location => (
                <div 
                  key={location.id}
                  onClick={() => onSelectLocation(location)}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 cursor-pointer transition-all duration-200 group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{location.name}</p>
                    <p className="text-sm text-gray-500">{location.address}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-900 font-medium">{location.eta}</div>
                    <div className="text-xs text-gray-400">{location.distance}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredRecent.length === 0 && filteredSuggestions.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">No locations found</p>
              <p className="text-sm text-gray-400 mt-1">Try searching for a different place</p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-2">
            <span>🔒</span> Your location data is secure and never shared
            <span>✨</span>
          </p>
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
  )
}

export default LocationSearchPanel
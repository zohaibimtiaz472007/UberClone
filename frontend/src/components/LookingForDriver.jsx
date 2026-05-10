import React, { useState, useEffect } from 'react'

// Looking for Driver Component
const LookingForDriver = ({ 
  isOpen, 
  onClose, 
  rideDetails,
  onDriverFound,
  onCancelSearch
}) => {
  const [searchTime, setSearchTime] = useState(0)
  const [searchProgress, setSearchProgress] = useState(0)
  const [nearbyDrivers, setNearbyDrivers] = useState([])
  const [isSearching, setIsSearching] = useState(true)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  // Simulate searching for drivers
  useEffect(() => {
    let timer
    let progressInterval
    let driverInterval

    if (isOpen && isSearching) {
      // Timer
      timer = setInterval(() => {
        setSearchTime(prev => prev + 1)
      }, 1000)

      // Progress bar animation
      progressInterval = setInterval(() => {
        setSearchProgress(prev => {
          if (prev < 90) {
            return prev + Math.random() * 10
          }
          return prev
        })
      }, 1500)

      // Simulate finding drivers
      const drivers = [
        { id: 1, name: "Rajesh Kumar", distance: "0.8 km", eta: "3 min", rating: 4.8, photo: "https://randomuser.me/api/portraits/men/1.jpg", vehicle: "Swift Dzire", plate: "KA 01 AB 1234" },
        { id: 2, name: "Amit Sharma", distance: "1.2 km", eta: "4 min", rating: 4.9, photo: "https://randomuser.me/api/portraits/men/2.jpg", vehicle: "Honda City", plate: "KA 02 CD 5678" },
        { id: 3, name: "Vikram Singh", distance: "1.5 km", eta: "5 min", rating: 4.7, photo: "https://randomuser.me/api/portraits/men/3.jpg", vehicle: "Toyota Etios", plate: "KA 03 EF 9012" }
      ]

      let driverIndex = 0
      driverInterval = setInterval(() => {
        if (driverIndex < drivers.length) {
          setNearbyDrivers(prev => [...prev, drivers[driverIndex]])
          driverIndex++
          
          // When we have 2 drivers, "find" one
          if (driverIndex === 2) {
            setTimeout(() => {
              setIsSearching(false)
              setSearchProgress(100)
              // Notify that driver is found
              setTimeout(() => {
                onDriverFound(drivers[0])
              }, 1000)
            }, 2000)
          }
        }
      }, 3000)
    }

    return () => {
      clearInterval(timer)
      clearInterval(progressInterval)
      clearInterval(driverInterval)
    }
  }, [isOpen, isSearching, onDriverFound])

  const handleCancelSearch = () => {
    setShowCancelConfirm(false)
    onCancelSearch()
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 animate-fadeIn" />

      {/* Cancel Confirmation Dialog */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl transform animate-scaleIn">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cancel Search?</h3>
              <p className="text-gray-500 text-sm">
                Are you sure you want to stop searching for drivers?
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 py-3 rounded-xl font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
              >
                Continue Search
              </button>
              <button
                onClick={handleCancelSearch}
                className="flex-1 py-3 rounded-xl font-semibold bg-red-500 text-white hover:bg-red-600 transition-all"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Looking for Driver Panel */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-500 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-hidden">
          
          {/* Drag Handle */}
          <div className="w-full flex justify-center pt-3 pb-2">
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          </div>

          {/* Header with Search Animation */}
          <div className="px-6 pt-2 pb-4 border-b border-gray-100">
            <div className="text-center mb-4">
              {/* Animated Search Icon */}
              <div className="relative inline-block">
                <div className="absolute inset-0 animate-ping-slow">
                  <div className="w-20 h-20 bg-blue-400 rounded-full opacity-30"></div>
                </div>
                <div className="absolute inset-0 animate-ping-medium">
                  <div className="w-20 h-20 bg-blue-300 rounded-full opacity-20"></div>
                </div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg mx-auto">
                  <svg className="w-10 h-10 text-white animate-pulse-fast" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mt-4">
                {isSearching ? 'Looking for drivers' : 'Driver found!'}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {isSearching 
                  ? `Searching nearby drivers • ${Math.floor(searchTime / 60)}:${String(searchTime % 60).padStart(2, '0')}`
                  : 'Great news! A driver has been found for you'}
              </p>
            </div>

            {/* Search Progress Bar */}
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Searching area</span>
                <span>Connecting</span>
                <span>Driver assigned</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                  style={{ width: `${searchProgress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[55vh] custom-scrollbar">
            
            {/* Search Animation Area */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-white border-b border-gray-100">
              <div className="relative h-48 rounded-2xl overflow-hidden">
                {/* Animated radar effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-40 h-40">
                    <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-radar-pulse"></div>
                    <div className="absolute inset-2 rounded-full border-4 border-blue-300 animate-radar-pulse-delayed"></div>
                    <div className="absolute inset-4 rounded-full border-4 border-blue-400 animate-radar-pulse-slow"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
                    </div>
                  </div>
                </div>
                
                {/* Rotating radar line */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 relative">
                    <div className="absolute top-0 left-1/2 w-0.5 h-20 bg-gradient-to-b from-blue-500 to-transparent origin-bottom animate-radar-rotate"></div>
                  </div>
                </div>

                {/* City dots */}
                <div className="absolute top-8 left-8 w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-12 right-10 w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse-delayed"></div>
                <div className="absolute top-20 right-16 w-2 h-2 bg-gray-400 rounded-full animate-pulse-slow"></div>
                <div className="absolute bottom-20 left-16 w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                
                {/* Found drivers animation */}
                {nearbyDrivers.map((driver, idx) => (
                  <div 
                    key={driver.id}
                    className="absolute animate-float-up"
                    style={{ 
                      top: `${20 + idx * 30}%`, 
                      right: `${10 + idx * 15}%`,
                      animationDelay: `${idx * 0.5}s`
                    }}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-xs">🚗</span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status messages */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-600">Searching within 5km radius...</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" style={{ animationDelay: '0.5s' }}></div>
                  <span className="text-gray-600">Checking {nearbyDrivers.length} nearby drivers...</span>
                </div>
                {nearbyDrivers.length > 0 && (
                  <div className="flex items-center gap-2 text-sm animate-fadeIn">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Contacting nearest driver...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Nearby Drivers List */}
            {nearbyDrivers.length > 0 && (
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Nearby drivers</h4>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {nearbyDrivers.length} found
                  </span>
                </div>
                
                <div className="space-y-3">
                  {nearbyDrivers.map((driver, idx) => (
                    <div 
                      key={driver.id}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 animate-slideIn
                        ${idx === nearbyDrivers.length - 1 && !isSearching 
                          ? 'bg-green-50 border-2 border-green-200 shadow-md' 
                          : 'bg-gray-50'
                        }`}
                      style={{ animationDelay: `${idx * 0.2}s` }}
                    >
                      <img 
                        src={driver.photo} 
                        alt={driver.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-gray-900">{driver.name}</p>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400 text-xs">★</span>
                            <span className="text-xs font-medium">{driver.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{driver.vehicle}</span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                          <span className="text-xs text-gray-500">{driver.plate}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">{driver.distance}</p>
                        <p className="text-xs text-gray-500">{driver.eta}</p>
                      </div>
                      {idx === nearbyDrivers.length - 1 && !isSearching && (
                        <div className="absolute -top-1 -right-1">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trip Summary */}
            <div className="p-6">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Your Trip Details</h4>
              
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">{rideDetails?.vehicle?.icon || '🚗'}</div>
                  <div>
                    <p className="font-semibold text-gray-900">{rideDetails?.vehicle?.name || 'Standard Vehicle'}</p>
                    <p className="text-xs text-gray-500">Comfortable ride</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-lg font-bold text-gray-900">${rideDetails?.totalFare || 0}</p>
                    <p className="text-xs text-gray-500">total fare</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex gap-2 text-sm">
                    <svg className="w-4 h-4 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span className="text-gray-600 flex-1">{rideDetails?.pickupLocation || 'Pickup location'}</span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <svg className="w-4 h-4 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span className="text-gray-600 flex-1">{rideDetails?.destinationLocation || 'Destination'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="p-4 mx-4 mb-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
              <div className="flex gap-2">
                <span className="text-xl">💡</span>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-700">Quick Tip</p>
                  <p className="text-xs text-gray-500">Drivers are usually found within 30 seconds in your area</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="w-full py-3 rounded-xl font-semibold border-2 border-red-300 text-red-600 hover:bg-red-50 transition-all duration-300"
            >
              Cancel Search
            </button>
            <p className="text-xs text-gray-400 text-center mt-3">
              Searching for the best driver near you
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes floatUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes radarPulse {
          0% {
            transform: scale(0.4);
            opacity: 1;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
        
        @keyframes radarRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.4s ease-out forwards;
        }
        
        .animate-float-up {
          animation: floatUp 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-radar-pulse {
          animation: radarPulse 2s ease-out infinite;
        }
        
        .animate-radar-pulse-delayed {
          animation: radarPulse 2s ease-out 0.6s infinite;
        }
        
        .animate-radar-pulse-slow {
          animation: radarPulse 2s ease-out 1.2s infinite;
        }
        
        .animate-radar-rotate {
          animation: radarRotate 4s linear infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-ping-fast {
          animation: ping 0.8s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-ping-slow {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-ping-medium {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-pulse-fast {
          animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-pulse-delayed {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) 0.5s infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) 1s infinite;
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
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
      `}</style>
    </>
  )
}

export default LookingForDriver
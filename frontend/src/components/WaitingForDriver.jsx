import React, { useState, useEffect } from 'react'

// Waiting for Driver Component
const WaitingForDriver = ({ 
  isOpen, 
  onClose, 
  rideDetails,
  onCancelRide,
  onTrackDriver
}) => {
  const [waitingTime, setWaitingTime] = useState(0)
  const [driverLocation, setDriverLocation] = useState(40)
  const [isCancelling, setIsCancelling] = useState(false)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  // Simulate driver approaching
  useEffect(() => {
    let interval
    if (isOpen) {
      interval = setInterval(() => {
        setWaitingTime(prev => prev + 1)
        setDriverLocation(prev => {
          if (prev <= 100) {
            return prev + 2
          }
          return prev
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isOpen])

  // Driver details
  const driver = {
    name: "Michael Rodriguez",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.92,
    totalTrips: 2847,
    vehicleNumber: "KA 01 AB 1234",
    vehicleModel: "Toyota Innova Crysta",
    eta: Math.max(1, Math.floor((100 - driverLocation) / 10)),
    phone: "+91 98765 43210"
  }

  const handleCancelRide = () => {
    setIsCancelling(true)
    setTimeout(() => {
      setIsCancelling(false)
      onCancelRide()
      onClose()
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 animate-fadeIn" />

      {/* Cancel Confirmation Dialog */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl transform animate-scaleIn">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cancel Ride?</h3>
              <p className="text-gray-500 text-sm">
                Are you sure you want to cancel this ride? A cancellation fee of ₹50 may apply.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 py-3 rounded-xl font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
              >
                Go Back
              </button>
              <button
                onClick={handleCancelRide}
                disabled={isCancelling}
                className="flex-1 py-3 rounded-xl font-semibold bg-red-500 text-white hover:bg-red-600 transition-all disabled:bg-red-300"
              >
                {isCancelling ? 'Cancelling...' : 'Yes, Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Waiting Panel */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-500 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden">
          
          {/* Drag Handle */}
          <div className="w-full flex justify-center pt-3 pb-2">
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          </div>

          {/* Header with Timer */}
          <div className="px-6 pt-2 pb-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Finding your driver</h3>
                <p className="text-sm text-gray-500 mt-1">Please wait while we connect you</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">{Math.floor(waitingTime / 60)}:{String(waitingTime % 60).padStart(2, '0')}</div>
                <p className="text-xs text-gray-500">waiting time</p>
              </div>
            </div>

            {/* Progress Bar - Driver Approaching */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Driver assigned</span>
                <span>{driver.eta} min away</span>
                <span>Arriving</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${driverLocation}%` }}
                />
              </div>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[60vh] custom-scrollbar">
            
            {/* Animated Car and Map Preview */}
            <div className="p-6 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
              <div className="relative">
                <div className="h-40 bg-gradient-to-br from-blue-100 to-gray-100 rounded-2xl overflow-hidden relative">
                  {/* Animated Car */}
                  <div 
                    className="absolute bottom-4 transition-all duration-1000 ease-in-out"
                    style={{ left: `${driverLocation}%`, transform: 'translateX(-50%)' }}
                  >
                    <div className="text-4xl animate-bounceX">
                      {driverLocation > 95 ? '📍' : '🚗'}
                    </div>
                  </div>
                  
                  {/* Road lines */}
                  <div className="absolute bottom-8 left-0 right-0 h-0.5 bg-gray-300">
                    <div className="absolute inset-0 flex gap-4 overflow-hidden">
                      {[...Array(20)].map((_, i) => (
                        <div key={i} className="w-8 h-0.5 bg-gray-400"></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Destination marker */}
                  <div className="absolute bottom-8 right-4 text-3xl">
                    🏁
                  </div>
                  
                  {/* Pickup marker */}
                  <div className="absolute bottom-8 left-4 text-2xl">
                    📍
                  </div>
                  
                  {/* Map overlay text */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                    Live tracking
                  </div>
                </div>
              </div>
            </div>

            {/* Driver Info Card */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <img 
                  src={driver.photo} 
                  alt={driver.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-gray-900">{driver.name}</h4>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm font-semibold">{driver.rating}</span>
                      <span className="text-xs text-gray-400">({driver.totalTrips}+ trips)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                      <span className="text-xs text-gray-600">{driver.vehicleNumber}</span>
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <span className="text-xs text-gray-600">{driver.vehicleModel}</span>
                  </div>
                </div>
              </div>

              {/* Contact buttons */}
              <div className="flex gap-3 mt-4">
                <button 
                  onClick={() => window.location.href = `tel:${driver.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border-2 border-gray-300 hover:border-green-500 hover:bg-green-50 transition-all"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm font-medium">Call</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-sm font-medium">Message</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border-2 border-gray-300 hover:border-purple-500 hover:bg-purple-50 transition-all">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>
            </div>

            {/* Trip Summary */}
            <div className="p-6 border-b border-gray-100">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Your Trip</h4>
              
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                  <div>
                    <p className="text-xs text-gray-500">PICKUP</p>
                    <p className="text-sm text-gray-900">{rideDetails?.pickupLocation || 'Your location'}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
                  <div>
                    <p className="text-xs text-gray-500">DESTINATION</p>
                    <p className="text-sm text-gray-900">{rideDetails?.destinationLocation || 'Destination'}</p>
                  </div>
                </div>
              </div>

              {/* Ride Info */}
              <div className="mt-4 flex gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="flex-1 text-center">
                  <div className="text-2xl mb-1">{rideDetails?.vehicle?.icon || '🚗'}</div>
                  <p className="text-xs text-gray-500">{rideDetails?.vehicle?.name || 'Vehicle'}</p>
                </div>
                <div className="flex-1 text-center">
                  <div className="text-2xl mb-1">💰</div>
                  <p className="text-xs text-gray-500">${rideDetails?.totalFare || 0}</p>
                </div>
                <div className="flex-1 text-center">
                  <div className="text-2xl mb-1">⏱️</div>
                  <p className="text-xs text-gray-500">{driver.eta} min</p>
                </div>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="p-6 bg-blue-50 m-4 rounded-2xl">
              <div className="flex gap-3">
                <div className="text-2xl">🛡️</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 mb-1">Safety First</p>
                  <p className="text-xs text-gray-600">Share your trip status with trusted contacts. Your safety is our priority.</p>
                </div>
                <button className="text-blue-600 text-sm font-medium">Share</button>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <button
              onClick={onTrackDriver}
              className="w-full mb-3 py-3 rounded-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:scale-[1.02] transition-all duration-300 shadow-lg"
            >
              Track on Map
            </button>
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="w-full py-3 rounded-xl font-semibold border-2 border-red-300 text-red-600 hover:bg-red-50 transition-all duration-300"
            >
              Cancel Ride
            </button>
            <p className="text-xs text-gray-400 text-center mt-3">
              Cancellation fee may apply if driver is already on the way
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
        
        @keyframes bounceX {
          0%, 100% {
            transform: translateX(-50%) translateY(0px);
          }
          50% {
            transform: translateX(-50%) translateY(-3px);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        
        .animate-bounceX {
          animation: bounceX 0.5s ease-in-out infinite;
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

export default WaitingForDriver
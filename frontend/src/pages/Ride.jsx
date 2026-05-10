import React, { useState, useEffect } from 'react'

// Riding Page Component
const RidingPage = ({ 
  rideDetails, 
  onCompleteRide,
  onCancelRide
}) => {
  const [rideTime, setRideTime] = useState(0)
  const [tripProgress, setTripProgress] = useState(0)
  const [currentSpeed, setCurrentSpeed] = useState(45)
  const [showHelp, setShowHelp] = useState(false)
  const [showRateDriver, setShowRateDriver] = useState(false)
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [isMinimized, setIsMinimized] = useState(false)
  const [showRouteDetails, setShowRouteDetails] = useState(false)
  
  // Simulate ride progress
  useEffect(() => {
    let timer
    let progressInterval
    let speedInterval

    if (!showRateDriver) {
      timer = setInterval(() => {
        setRideTime(prev => prev + 1)
      }, 1000)

      progressInterval = setInterval(() => {
        setTripProgress(prev => {
          if (prev < 100) {
            return prev + 1
          } else {
            // Ride completed
            clearInterval(progressInterval)
            clearInterval(timer)
            clearInterval(speedInterval)
            setTimeout(() => {
              setShowRateDriver(true)
            }, 1000)
            return 100
          }
        })
      }, 3000)

      speedInterval = setInterval(() => {
        setCurrentSpeed(Math.floor(Math.random() * 30) + 35)
      }, 3000)
    }

    return () => {
      clearInterval(timer)
      clearInterval(progressInterval)
      clearInterval(speedInterval)
    }
  }, [showRateDriver])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const handleSubmitRating = () => {
    onCompleteRide({ rating, feedback })
    setShowRateDriver(false)
  }

  const driver = rideDetails?.driver || {
    name: "Michael Rodriguez",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.92,
    totalTrips: 2847,
    vehicleNumber: "KA 01 AB 1234",
    vehicleModel: "Toyota Innova Crysta",
    phone: "+1 234 567 8900"
  }

  // Rating Screen
  if (showRateDriver) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black z-50 animate-fadeIn overflow-y-auto">
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 animate-scaleIn shadow-2xl">
            <div className="text-center">
              <div className="w-28 h-28 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-5 animate-bounceIn shadow-lg">
                <span className="text-6xl">⭐</span>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Rate your ride</h3>
              <p className="text-gray-500 mb-6">How was your experience with {driver.name}?</p>

              {/* Star Rating */}
              <div className="flex justify-center gap-3 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="transform hover:scale-110 transition-transform"
                  >
                    <svg 
                      className={`w-12 h-12 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} transition-colors duration-200`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>

              {/* Feedback Input */}
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your experience (optional)"
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-black focus:ring-2 focus:ring-black/20 outline-none transition-all resize-none text-gray-900 placeholder-gray-400"
                rows="4"
              />

              {/* Submit Button */}
              <button
                onClick={handleSubmitRating}
                disabled={rating === 0}
                className={`w-full mt-6 py-4 rounded-2xl font-semibold text-white transition-all duration-300 text-lg
                  ${rating > 0 
                    ? 'bg-gradient-to-r from-gray-900 to-gray-800 hover:scale-[1.02] shadow-lg' 
                    : 'bg-gray-300 cursor-not-allowed'
                  }`}
              >
                Submit & Continue
              </button>
              
              <button
                onClick={() => {
                  onCompleteRide({ rating: 0, feedback: 'Skipped' })
                  setShowRateDriver(false)
                }}
                className="w-full mt-3 py-3 rounded-xl font-semibold text-gray-500 hover:text-gray-700 transition-all"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Help Modal
  if (showHelp) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 animate-fadeIn overflow-y-auto">
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 animate-scaleIn">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🆘</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-500">We're here for you 24/7</p>
            </div>
            
            <div className="space-y-3">
              <button className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all group">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl">📞</span>
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold text-gray-900 text-lg">Call Driver</p>
                  <p className="text-sm text-gray-500">Contact {driver.name} directly</p>
                </div>
                <span className="text-blue-600 font-medium">Call</span>
              </button>
              
              <button className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all group">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl">💬</span>
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold text-gray-900 text-lg">Message Support</p>
                  <p className="text-sm text-gray-500">24/7 customer support</p>
                </div>
                <span className="text-blue-600 font-medium">Chat</span>
              </button>
              
              <button className="w-full flex items-center gap-4 p-4 bg-red-50 rounded-2xl hover:bg-red-100 transition-all group">
                <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl">🚨</span>
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold text-red-600 text-lg">Emergency SOS</p>
                  <p className="text-sm text-gray-500">Contact emergency services</p>
                </div>
                <span className="text-red-600 font-medium">SOS</span>
              </button>
              
              <button className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all group">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl">📝</span>
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold text-gray-900 text-lg">Share Trip Status</p>
                  <p className="text-sm text-gray-500">Share with trusted contacts</p>
                </div>
                <span className="text-blue-600 font-medium">Share</span>
              </button>
            </div>
            
            <button
              onClick={() => setShowHelp(false)}
              className="w-full mt-6 py-4 rounded-2xl font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all text-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black z-50 overflow-hidden">
      
      {/* Fullscreen Map Background */}
      <div className="absolute inset-0">
        {/* Animated Map Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900">
          {/* Grid lines for map effect */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="absolute w-full h-px bg-white" style={{ top: `${i * 5}%` }}></div>
            ))}
            {[...Array(20)].map((_, i) => (
              <div key={i} className="absolute h-full w-px bg-white" style={{ left: `${i * 5}%` }}></div>
            ))}
          </div>
          
          {/* Moving road */}
          <div className="absolute bottom-32 left-0 right-0">
            <div className="relative h-64 overflow-hidden">
              {/* Road base */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gray-700"></div>
              
              {/* Road lines */}
              <div className="absolute bottom-16 left-0 right-0 h-1 bg-yellow-500 animate-road-move">
                <div className="absolute inset-0 flex gap-12">
                  {[...Array(30)].map((_, i) => (
                    <div key={i} className="w-16 h-1 bg-yellow-400"></div>
                  ))}
                </div>
              </div>
              
              {/* Moving car with gradient trail */}
              <div 
                className="absolute transition-all duration-1000 ease-in-out"
                style={{ 
                  bottom: '48px', 
                  left: `${tripProgress}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                <div className="relative">
                  <div className="text-7xl filter drop-shadow-2xl animate-car-shake">
                    🚗
                  </div>
                  {/* Speed trail */}
                  <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-4 h-4 bg-white/30 rounded-full animate-trail"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Destination marker */}
              <div className="absolute bottom-12 right-8 text-5xl animate-bounce">
                🏁
              </div>
              
              {/* Buildings */}
              <div className="absolute bottom-0 left-0 right-0 h-24 flex justify-around items-end">
                <div className="w-16 h-12 bg-gray-600 rounded-t-lg"></div>
                <div className="w-20 h-16 bg-gray-600 rounded-t-lg"></div>
                <div className="w-12 h-10 bg-gray-600 rounded-t-lg"></div>
                <div className="w-24 h-20 bg-gray-600 rounded-t-lg"></div>
                <div className="w-14 h-14 bg-gray-600 rounded-t-lg"></div>
                <div className="w-18 h-12 bg-gray-600 rounded-t-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Minimized Button */}
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-6 right-6 z-40 bg-white rounded-full p-4 shadow-2xl hover:scale-105 transition-all"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚗</span>
            <div>
              <p className="text-xs font-semibold text-gray-900">Ride in Progress</p>
              <p className="text-xs text-gray-500">{formatTime(rideTime)} elapsed</p>
            </div>
          </div>
        </button>
      ) : (
        <>
          {/* Floating Stats Cards */}
          <div className="absolute top-6 left-6 right-6 z-30 flex justify-between gap-3">
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-lg">
              <p className="text-white/60 text-xs uppercase tracking-wide">Elapsed Time</p>
              <p className="text-white text-2xl font-bold">{formatTime(rideTime)}</p>
            </div>
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-lg">
              <p className="text-white/60 text-xs uppercase tracking-wide">Speed</p>
              <p className="text-white text-2xl font-bold">{currentSpeed} <span className="text-sm">km/h</span></p>
            </div>
            <div className="bg-black/60 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-lg">
              <p className="text-white/60 text-xs uppercase tracking-wide">Progress</p>
              <p className="text-white text-2xl font-bold">{tripProgress}%</p>
            </div>
          </div>

          {/* Minimize Button */}
          <button
            onClick={() => setIsMinimized(true)}
            className="absolute top-6 right-6 z-30 bg-black/60 backdrop-blur-xl rounded-full p-2 hover:bg-black/80 transition-all"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Main Bottom Panel */}
          <div className="absolute bottom-0 left-0 right-0 z-30">
            <div className="bg-white/95 backdrop-blur-xl rounded-t-3xl shadow-2xl">
              
              {/* Drag Handle */}
              <div className="w-full flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
              </div>

              {/* Driver Info & Progress */}
              <div className="px-6 pt-2 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <img 
                    src={driver.photo} 
                    alt={driver.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold text-gray-900">{driver.name}</h4>
                      <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
                        <span className="text-green-500 text-xs">★</span>
                        <span className="text-xs font-semibold text-green-600">{driver.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{driver.vehicleNumber}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className="text-xs text-gray-500">{driver.vehicleModel}</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{Math.floor(tripProgress)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-1000"
                          style={{ width: `${tripProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trip Info */}
              <div className="p-6 border-b border-gray-100">
                <button
                  onClick={() => setShowRouteDetails(!showRouteDetails)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📍</span>
                    <span className="text-sm font-semibold text-gray-900">Trip Details</span>
                  </div>
                  <svg className={`w-5 h-5 text-gray-400 transition-transform ${showRouteDetails ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showRouteDetails && (
                  <div className="mt-4 space-y-3 animate-slideDown">
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="w-0.5 h-12 bg-gray-300"></div>
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <p className="text-xs text-gray-500">PICKUP</p>
                          <p className="text-sm text-gray-900 font-medium">{rideDetails?.pickupLocation || 'Your location'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">DESTINATION</p>
                          <p className="text-sm text-gray-900 font-medium">{rideDetails?.destinationLocation || 'Destination'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Live Stats Grid */}
              <div className="p-6 border-b border-gray-100">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Live Statistics</h4>
                <div className="grid grid-cols-4 gap-3">
                  <div className="text-center">
                    <div className="text-2xl mb-1">📏</div>
                    <p className="text-lg font-bold text-gray-900">{Math.floor(tripProgress * 0.085)} km</p>
                    <p className="text-xs text-gray-500">covered</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">⏱️</div>
                    <p className="text-lg font-bold text-gray-900">{formatTime(rideTime)}</p>
                    <p className="text-xs text-gray-500">elapsed</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">⚡</div>
                    <p className="text-lg font-bold text-gray-900">{currentSpeed}</p>
                    <p className="text-xs text-gray-500">km/h</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-1">💰</div>
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(rideDetails?.totalFare || 25)}</p>
                    <p className="text-xs text-gray-500">fare</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6">
                <button
                  onClick={() => setShowHelp(true)}
                  className="w-full mb-3 py-4 rounded-2xl font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white hover:scale-[1.02] transition-all duration-300 shadow-lg flex items-center justify-center gap-2 text-lg"
                >
                  <span className="text-2xl">🆘</span>
                  Emergency / Help
                </button>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      navigator.share?.({
                        title: 'My Trip',
                        text: `I'm on a ride with ${driver.name}`,
                        url: window.location.href
                      }).catch(() => alert('Trip status copied to clipboard!'))
                    }}
                    className="flex-1 py-3 rounded-xl font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                  >
                    <span className="text-xl">👥</span>
                    Share
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to contact support?')) {
                        alert('Connecting to customer support...')
                      }
                    }}
                    className="flex-1 py-3 rounded-xl font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                  >
                    <span className="text-xl">💬</span>
                    Support
                  </button>
                </div>
                
                <p className="text-xs text-gray-400 text-center mt-4">
                  Your safety is our priority • Ride is being monitored
                </p>
              </div>
            </div>
          </div>

          {/* ETA Notification */}
          {tripProgress > 80 && tripProgress < 95 && (
            <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-30 animate-slideDown">
              <div className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
                <span className="text-xl">🎉</span>
                <span className="font-semibold">Almost there! {Math.max(1, Math.floor((100 - tripProgress) / 10))} minutes remaining</span>
              </div>
            </div>
          )}
        </>
      )}

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
        
        @keyframes bounceIn {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes slideDown {
          from {
            transform: translate(-50%, -20px);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }
        
        @keyframes roadMove {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes carShake {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes trail {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        
        .animate-bounceIn {
          animation: bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }
        
        .animate-road-move {
          animation: roadMove 0.5s linear infinite;
        }
        
        .animate-car-shake {
          animation: carShake 0.3s ease-in-out infinite;
        }
        
        .animate-bounce {
          animation: bounce 1s ease-in-out infinite;
        }
        
        .animate-trail {
          animation: trail 0.6s ease-out infinite;
        }
      `}</style>
    </div>
  )
}

export default RidingPage
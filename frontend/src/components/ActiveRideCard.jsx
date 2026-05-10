import React from 'react'

const ActiveRideCard = ({ ride, onStartRide, onCompleteRide, onCancelRide }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-6 mb-6 shadow-2xl animate-slideDown">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🚗</span>
          <span className="text-white font-bold">Active Ride</span>
        </div>
        <div className="bg-white/20 backdrop-blur px-3 py-1 rounded-full">
          <span className="text-white text-sm font-medium">
            {ride.status === 'accepted' ? 'Heading to pickup' : 'Ride in progress'}
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <div className="w-0.5 h-12 bg-white/40"></div>
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <p className="text-white/70 text-xs">PICKUP</p>
              <p className="text-white font-medium">{ride.pickupLocation}</p>
            </div>
            <div>
              <p className="text-white/70 text-xs">DESTINATION</p>
              <p className="text-white font-medium">{ride.destinationLocation}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-white/70 text-sm">💰 Fare:</span>
            <span className="text-white font-bold">{formatCurrency(ride.fare)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/70 text-sm">⏱️ Duration:</span>
            <span className="text-white font-bold">{ride.duration}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        {ride.status === 'accepted' ? (
          <>
            <button 
              onClick={onStartRide}
              className="flex-1 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:scale-[1.02] transition-all"
            >
              Start Ride
            </button>
            <button 
              onClick={onCancelRide}
              className="flex-1 py-3 bg-red-500/30 text-white rounded-xl font-semibold hover:bg-red-500/50 transition-all"
            >
              Cancel
            </button>
          </>
        ) : (
          <button 
            onClick={onCompleteRide}
            className="flex-1 py-3 bg-green-500 text-white rounded-xl font-semibold hover:scale-[1.02] transition-all"
          >
            Complete Ride
          </button>
        )}
      </div>
    </div>
  )
}

export default ActiveRideCard
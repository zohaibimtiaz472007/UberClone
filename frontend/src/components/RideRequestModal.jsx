import React, { useState, useEffect } from 'react'

const RideRequestModal = ({ request, onAccept, onDecline, onClose }) => {
  const [timer, setTimer] = useState(30)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          onDecline()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [onDecline])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 animate-fadeIn">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-3xl max-w-md w-full p-6 animate-slideUp shadow-2xl">
        <div className="text-center mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse-slow">
            <span className="text-4xl">🔔</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">New Ride Request!</h3>
          <p className="text-gray-500 mt-1">You have a new booking request</p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-xl">👤</span>
              <span className="text-gray-700">{request.customerName}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span className="text-sm font-semibold">{request.customerRating}</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-0.5 h-12 bg-gray-300"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-xs text-gray-500">PICKUP</p>
                <p className="text-sm font-medium text-gray-900">{request.pickupLocation}</p>
                <p className="text-xs text-gray-400 mt-0.5">📍 {request.distance} away</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">DESTINATION</p>
                <p className="text-sm font-medium text-gray-900">{request.destinationLocation}</p>
                <p className="text-xs text-gray-400 mt-0.5">⏱️ {request.duration}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💰</span>
              <div>
                <p className="text-xs text-gray-500">Fare Estimate</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(request.fare)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Includes GST</p>
              <p className="text-xs text-green-600">+ ₹20 bonus</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onDecline}
            className="flex-1 py-3 rounded-xl font-semibold border-2 border-red-300 text-red-600 hover:bg-red-50 transition-all"
          >
            Decline
          </button>
          <button
            onClick={onAccept}
            className="flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white hover:scale-[1.02] transition-all shadow-lg"
          >
            Accept Ride
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          You have {timer} seconds to respond • Auto-decline in {timer}s
        </p>
      </div>
    </div>
  )
}

export default RideRequestModal
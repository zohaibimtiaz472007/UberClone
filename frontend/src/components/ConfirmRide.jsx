import React, { useState, useEffect } from 'react'

// Confirm Ride Component
const ConfirmRide = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  pickupLocation, 
  destinationLocation, 
  selectedVehicle,
  estimatedDistance,
  estimatedTime
}) => {
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [isConfirming, setIsConfirming] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Calculate fare details
  const baseFare = selectedVehicle?.price || 0
  const tax = Math.floor(baseFare * 0.08)
  const platformFee = 2
  const totalFare = baseFare + tax + platformFee

  const paymentMethods = [
    { id: 'cash', name: 'Cash', icon: '💵', description: 'Pay with cash directly to driver' },
    { id: 'card', name: 'Credit/Debit Card', icon: '💳', description: '**** **** **** 4242' },
    { id: 'upi', name: 'UPI / Digital Wallet', icon: '📱', description: 'Google Pay, PhonePe, Paytm' }
  ]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleConfirmRide = () => {
    setIsConfirming(true)
    // Simulate API call
    setTimeout(() => {
      setIsConfirming(false)
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        onConfirm({
          pickupLocation,
          destinationLocation,
          vehicle: selectedVehicle,
          paymentMethod,
          totalFare,
          bookingId: Math.floor(Math.random() * 1000000)
        })
        onClose()
      }, 2000)
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 animate-fadeIn"
        onClick={onClose}
      />

      {/* Success Animation */}
      {showSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl transform animate-bounceIn">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-scaleIn">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Ride Confirmed!</h3>
            <p className="text-gray-500">Your driver is on the way</p>
          </div>
        </div>
      )}

      {/* Main Confirm Ride Panel */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-500 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-hidden">
          
          {/* Drag Handle */}
          <div className="w-full flex justify-center pt-3 pb-2">
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          </div>

          {/* Header */}
          <div className="px-6 pt-2 pb-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Confirm Your Ride</h3>
                <p className="text-sm text-gray-500 mt-1">Review your trip details</p>
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

          <div className="overflow-y-auto max-h-[70vh] custom-scrollbar">
            
            {/* Vehicle Info */}
            <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="text-6xl animate-float">
                  {selectedVehicle?.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900">{selectedVehicle?.name}</h4>
                  <div className="flex gap-3 mt-1 text-sm text-gray-600">
                    <span className="flex items-center gap-1">👥 {selectedVehicle?.capacity}</span>
                    <span className="flex items-center gap-1">🧳 {selectedVehicle?.luggage}</span>
                    <span className="flex items-center gap-1">⭐ 4.9</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedVehicle?.features.map((feature, idx) => (
                      <span key={idx} className={`text-xs px-2 py-1 rounded-full ${selectedVehicle.bgColor} ${selectedVehicle.textColor}`}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">${totalFare}</p>
                  <p className="text-xs text-gray-500">total fare</p>
                </div>
              </div>
            </div>

            {/* Trip Route */}
            <div className="p-6 border-b border-gray-100">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Trip Details</h4>
              
              <div className="relative">
                {/* Pickup */}
                <div className="flex gap-3 mb-6">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5"></div>
                    <div className="absolute top-5 left-1.5 w-0.5 h-16 bg-gray-300"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">PICKUP LOCATION</p>
                    <p className="font-medium text-gray-900">{pickupLocation}</p>
                    <p className="text-xs text-gray-400 mt-1">Now • Today</p>
                  </div>
                </div>

                {/* Destination */}
                <div className="flex gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-1.5"></div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">DESTINATION</p>
                    <p className="font-medium text-gray-900">{destinationLocation}</p>
                    <p className="text-xs text-gray-400 mt-1">Est. arrival: {estimatedTime || '15-20'} min</p>
                  </div>
                </div>
              </div>

              {/* Distance & Time */}
              <div className="mt-4 flex gap-4 p-3 bg-gray-50 rounded-xl">
                <div className="flex-1 text-center">
                  <p className="text-xs text-gray-500">Distance</p>
                  <p className="font-semibold text-gray-900">{estimatedDistance || '8.5'} km</p>
                </div>
                <div className="w-px bg-gray-200"></div>
                <div className="flex-1 text-center">
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="font-semibold text-gray-900">{estimatedTime || '20'} min</p>
                </div>
                <div className="w-px bg-gray-200"></div>
                <div className="flex-1 text-center">
                  <p className="text-xs text-gray-500">Peak Time</p>
                  <p className="font-semibold text-gray-900">Normal</p>
                </div>
              </div>
            </div>

            {/* Fare Breakdown */}
            <div className="p-6 border-b border-gray-100">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Fare Breakdown</h4>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Base fare</span>
                  <span className="text-gray-900">${baseFare}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Distance charge</span>
                  <span className="text-gray-900">${Math.floor(baseFare * 0.6)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Time charge</span>
                  <span className="text-gray-900">${Math.floor(baseFare * 0.3)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="text-gray-900">${tax}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Platform fee</span>
                  <span className="text-gray-900">${platformFee}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-xl">${totalFare}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Including all taxes and fees</p>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="p-6 border-b border-gray-100">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Payment Method</h4>
              
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-300
                      ${paymentMethod === method.id 
                        ? 'border-black bg-gray-50' 
                        : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <div className="text-2xl">{method.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{method.name}</p>
                      <p className="text-xs text-gray-500">{method.description}</p>
                    </div>
                    {paymentMethod === method.id && (
                      <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add new card */}
              <button className="w-full mt-3 flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-black py-2 rounded-xl border border-dashed border-gray-300 hover:border-black transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add new payment method
              </button>
            </div>

            {/* Ride Options */}
            <div className="p-6 border-b border-gray-100">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Ride Options</h4>
              
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
                  <span className="text-sm text-gray-700">Share ride status with emergency contacts</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
                  <span className="text-sm text-gray-700">Send ride details via SMS</span>
                </label>
              </div>
            </div>

            {/* Promo Code */}
            <div className="p-6">
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎟️</span>
                  <span className="text-sm font-medium text-gray-700">Apply promo code</span>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
              >
                Edit
              </button>
              <button
                onClick={handleConfirmRide}
                disabled={isConfirming}
                className={`flex-1 py-3 rounded-xl font-semibold text-white transition-all duration-300
                  ${isConfirming 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-gray-900 to-gray-800 hover:scale-[1.02] shadow-lg hover:shadow-xl'
                  }`}
              >
                {isConfirming ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Confirming...
                  </div>
                ) : (
                  'Confirm Ride'
                )}
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-3">
              By confirming, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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
        
        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-bounceIn {
          animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .animate-float {
          animation: float 2s ease-in-out infinite;
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

export default ConfirmRide
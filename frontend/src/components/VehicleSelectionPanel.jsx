import React, { useState, useEffect, useRef } from 'react'




const VehicleSelectionPanel = ({ isOpen, onClose, onSelectVehicle, pickupLocation, destinationLocation }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [estimatedDistance] = useState(() => Math.floor(Math.random() * 15) + 3)
  
  const vehicles = [
    {
      id: 'auto',
      name: 'Auto Rickshaw',
      icon: '🛺',
      price: Math.floor(estimatedDistance * 12),
      capacity: '3 passengers',
      luggage: 'Small bags',
      time: Math.floor(estimatedDistance * 1.5),
      features: ['Open air', 'Best for short trips', 'Budget friendly'],
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-600'
    },
    {
      id: 'car',
      name: 'Uber Go',
      icon: '🚗',
      price: Math.floor(estimatedDistance * 20),
      capacity: '4 passengers',
      luggage: '2 suitcases',
      time: Math.floor(estimatedDistance * 1.2),
      features: ['AC', 'Comfortable seats', 'Music system'],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600'
    },
    {
      id: 'bike',
      name: 'Bike Taxi',
      icon: '🏍️',
      price: Math.floor(estimatedDistance * 8),
      capacity: '1 passenger',
      luggage: 'Small bag',
      time: Math.floor(estimatedDistance * 0.9),
      features: ['Fastest option', 'Skip traffic', 'Cheapest ride'],
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-600'
    }
  ]

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

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
        onClick={onClose}
      />
      
      <div 
        ref={panelRef}
        className="fixed bottom-0 left-0 right-0 z-50
                   bg-white rounded-t-3xl shadow-2xl 
                   animate-slideUp
                   max-h-[90vh] overflow-hidden"
      >
        <div className="w-full flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="px-6 pt-2 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Choose your ride</h3>
              <p className="text-sm text-gray-500 mt-1">Select a vehicle that suits your needs</p>
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
          
          {/* Trip summary */}
          <div className="bg-gray-50 rounded-xl p-3 mt-2">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex-1">
                <p className="text-gray-500 text-xs">PICKUP</p>
                <p className="font-medium text-gray-900 truncate">{pickupLocation || 'Not selected'}</p>
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="flex-1">
                <p className="text-gray-500 text-xs">DESTINATION</p>
                <p className="font-medium text-gray-900 truncate">{destinationLocation || 'Not selected'}</p>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-500">📏 Estimated distance: {estimatedDistance} miles • ⏱️ ~{estimatedDistance * 2} mins</p>
            </div>
          </div>
        </div>

        {/* Vehicle options */}
        <div className="overflow-y-auto max-h-[55vh] custom-scrollbar p-4 space-y-3">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              onClick={() => setSelectedVehicle(vehicle.id)}
              className={`relative bg-white border-2 rounded-2xl p-4 cursor-pointer transition-all duration-300
                ${selectedVehicle === vehicle.id 
                  ? `${vehicle.bgColor} ${vehicle.borderColor} shadow-lg scale-[1.02]` 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
            >
              {selectedVehicle === vehicle.id && (
                <div className="absolute top-3 right-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
              
              <div className="flex items-start gap-4">
                <div className={`text-5xl transition-transform duration-300 ${selectedVehicle === vehicle.id ? 'scale-110' : ''}`}>
                  {vehicle.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`text-lg font-bold ${selectedVehicle === vehicle.id ? vehicle.textColor : 'text-gray-900'}`}>
                      {vehicle.name}
                    </h4>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">${vehicle.price}</p>
                      <p className="text-xs text-gray-500">total ride</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mb-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <span>👥</span> {vehicle.capacity}
                    </div>
                    <div className="flex items-center gap-1">
                      <span>🧳</span> {vehicle.luggage}
                    </div>
                    <div className="flex items-center gap-1">
                      <span>⏱️</span> {vehicle.time} mins
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {vehicle.features.map((feature, idx) => (
                      <span key={idx} className={`text-xs px-2 py-1 rounded-full ${vehicle.bgColor} ${vehicle.textColor}`}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer with action button */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <button
            onClick={() => {
              if (selectedVehicle) {
                const selected = vehicles.find(v => v.id === selectedVehicle)
                onSelectVehicle(selected)
                onClose()
              }
            }}
            disabled={!selectedVehicle}
            className={`w-full py-4 rounded-2xl font-semibold text-white transition-all duration-300
              ${selectedVehicle 
                ? 'bg-gradient-to-r from-gray-900 to-gray-800 hover:scale-[1.02] shadow-lg hover:shadow-xl' 
                : 'bg-gray-300 cursor-not-allowed'
              }`}
          >
            {selectedVehicle ? 'Confirm Ride 🚀' : 'Select a vehicle to continue'}
          </button>
          <p className="text-xs text-gray-400 text-center mt-3">
            ✓ Cash payments • ✓ 24/7 support • ✓ Cancel anytime
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
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
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

export default VehicleSelectionPanel
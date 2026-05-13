import React, { useState } from "react";

const VehicleSelectionPanel = ({
  isOpen,
  onClose,
  onSelectVehicle,
  pickupLocation,
  destinationLocation,
  fareData, // Receive fareData as a prop from backend
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const vehicles = [
    {
      id: "bike",
      name: "Bike",
      icon: "🏍️",
      description: "Fast & affordable for solo rides",
    },
    {
      id: "auto",
      name: "Auto",
      icon: "🛺",
      description: "Best for short distances",
    },
    {
      id: "car",
      name: "Car",
      icon: "🚗",
      description: "Comfortable for family & groups",
    },
  ];

  // Get the exact fare from backend data - NO calculation here
  const getPriceFromBackend = (vehicleId) => {
    if (!fareData?.fares) return null;
    return fareData.fares[vehicleId];
  };

  // Format currency for display
  const formatCurrency = (amount) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fadeIn"
        onClick={onClose}
      />

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl animate-slideUp max-h-[90vh] overflow-hidden">
        <div className="w-full flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="px-6 pt-2 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Choose your ride
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Select a vehicle that suits your needs
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Trip summary */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 mt-2">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex-1">
                <p className="text-gray-500 text-xs flex items-center gap-1">
                  <span>📍</span> PICKUP
                </p>
                <p className="font-semibold text-gray-900 truncate text-sm">
                  {pickupLocation || "Not selected"}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-gray-500 text-xs flex items-center gap-1">
                  <span>🎯</span> DESTINATION
                </p>
                <p className="font-semibold text-gray-900 truncate text-sm">
                  {destinationLocation || "Not selected"}
                </p>
              </div>
            </div>

            {/* Trip Details - Display backend data */}
            {fareData && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">📏 Distance:</span>
                    <span className="font-medium">
                      {fareData.distance?.toFixed(1)} km
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">⏱️ Est. time:</span>
                    <span className="font-medium">
                      {Math.round(fareData.duration)} min
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Vehicle options - Showing real backend fares */}
        <div className="overflow-y-auto max-h-[55vh] custom-scrollbar p-4 space-y-3">
          {vehicles.map((vehicle) => {
            const fare = getPriceFromBackend(vehicle.id);
            return (
              <div
                key={vehicle.id}
                onClick={() => fare && setSelectedVehicle(vehicle.id)}
                className={`relative bg-white border-2 rounded-2xl p-4 cursor-pointer transition-all duration-300 transform
                  ${
                    !fare
                      ? "opacity-50 cursor-not-allowed border-gray-200"
                      : selectedVehicle === vehicle.id
                      ? "border-green-500 shadow-lg scale-[1.02]"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-md hover:scale-[1.01]"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{vehicle.icon}</div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">
                        {vehicle.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {vehicle.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {fare ? (
                      <>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatCurrency(fare)}
                        </p>
                        <p className="text-xs text-gray-500">total fare</p>
                      </>
                    ) : (
                      <p className="text-sm text-gray-400">Not available</p>
                    )}
                  </div>
                </div>
                
                {/* Available badge */}
                {/* {fare && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                      Available
                    </div>
                  </div>
                )} */}
              </div>
            );
          })}
        </div>

        {/* Footer with action button */}
        <div className="p-4 border-t border-gray-100 bg-white">
          <button
            onClick={() => {
              if (selectedVehicle) {
                onSelectVehicle(selectedVehicle);
              }
            }}
            disabled={!selectedVehicle}
            className={`w-full py-4 rounded-2xl font-semibold text-white transition-all duration-300 transform
              ${
                selectedVehicle
                  ? "bg-gradient-to-r from-gray-900 to-gray-800 hover:scale-[1.02] shadow-lg hover:shadow-xl active:scale-95"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            {selectedVehicle
              ? `Confirm ${vehicles.find((v) => v.id === selectedVehicle)?.name} Ride 🚀`
              : "Select a vehicle to continue"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </>
  );
};

export default VehicleSelectionPanel;
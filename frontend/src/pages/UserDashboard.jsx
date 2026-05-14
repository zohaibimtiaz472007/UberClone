import React, { useState, useRef, useEffect, useContext } from "react";
import VehicleSelectionPanel from "../components/VehicleSelectionPanel";
import ConfirmRide from "../components/ConfirmRide";
import WaitingForDriver from "../components/WaitingForDriver";
import LookingForDriver from "../components/LookingForDriver";
import { SocketContext } from "../context/SocketContext";
import { userDataContext} from "../context/UserContext";
import axios from "axios";
import gsap from "gsap";

// Utility functions for display only
const formatDistance = (distance) => {
  if (!distance) return "0 km";
  return `${distance.toFixed(1)} km`;
};

const formatDuration = (duration) => {
  if (!duration) return "0 min";
  const minutes = Math.round(duration); 
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

// Create axios instance with auth interceptor
const getAuthToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const UserDashboard = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [pickupDisplay, setPickupDisplay] = useState("");
  const [destinationDisplay, setDestinationDisplay] = useState("");
  const [isVehiclePanelOpen, setIsVehiclePanelOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isLookingOpen, setIsLookingOpen] = useState(false);
  const [isWaitingOpen, setIsWaitingOpen] = useState(false);
  const [currentRideDetails, setCurrentRideDetails] = useState(null);

  // contexts
  const { socket } = useContext(SocketContext);
  const { user } = useContext(userDataContext);
  console.log("User data in dashboard:", user);

  // Fare data from backend
  const [fareData, setFareData] = useState(null);
  const [isFetchingFare, setIsFetchingFare] = useState(false);
  const [fareError, setFareError] = useState(null);

  // Refs for GSAP animations
  const mainCardRef = useRef(null);
  const searchContainerRef = useRef(null);
  const pickupInputRef = useRef(null);
  const destinationInputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const overlayRef = useRef(null);
  const debounceTimerRef = useRef(null);

  // Check authentication on mount
  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      window.location.href = '/login';
    }
  }, []);

  // Fetch fare from backend
  const fetchFareFromBackend = async (origin, destination) => {
    if (!origin || !destination) return;

    setIsFetchingFare(true);
    setFareError(null);

    try {
      const originAddress =
        typeof origin === "object" ? origin.address || origin.name : origin;

      const destinationAddress =
        typeof destination === "object"
          ? destination.address || destination.name
          : destination;

      const response = await api.get('/rides/fare', {
        params: {
          origin: originAddress,
          destination: destinationAddress,
        },
      });

      if (response.data.success) {
        setFareData({
          distance: response.data.data.distance,
          duration: response.data.data.duration,
          fares: response.data.data.fares,
        });
      } else {
        throw new Error(response.data.message || "Failed to fetch fare");
      }
    } catch (err) {
      console.error("Error fetching fare:", err);
      if (err.response?.status === 401) {
        setFareError("Session expired. Please login again.");
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setFareError(err.response?.data?.message || "Failed to fetch fare");
      }
      setFareData(null);
    } finally {
      setIsFetchingFare(false);
    }
  };

  useEffect(() => {
    if (socket && user) {
      socket.emit("join", { userType: "user", userId: user._id });
    }
  }, [socket, user]);

  // Auto fetch fare when both locations are selected
  useEffect(() => {
    if (pickupLocation && destinationLocation) {
      fetchFareFromBackend(pickupLocation, destinationLocation);
    } else {
      setFareData(null);
      setFareError(null);
    }
  }, [pickupLocation, destinationLocation]);

  // GSAP Animations
  useEffect(() => {
    if (isSearchActive) {
      gsap.to(overlayRef.current, {
        duration: 0.5,
        opacity: 1,
        visibility: "visible",
        ease: "power2.inOut",
      });

      gsap.to(searchContainerRef.current, {
        duration: 0.6,
        top: "0%",
        left: "0%",
        width: "100%",
        height: "100%",
        borderRadius: "0px",
        padding: "80px 20px 20px 20px",
        ease: "back.out(0.7)",
        onComplete: () => {
          if (activeInput === "pickup") {
            pickupInputRef.current?.focus();
          } else {
            destinationInputRef.current?.focus();
          }
        },
      });

      gsap.to(mainCardRef.current, {
        duration: 0.4,
        opacity: 0,
        scale: 0.95,
        pointerEvents: "none",
        ease: "power2.in",
      });
    } else {
      gsap.to(overlayRef.current, {
        duration: 0.5,
        opacity: 0,
        visibility: "hidden",
        ease: "power2.inOut",
      });

      gsap.to(searchContainerRef.current, {
        duration: 0.6,
        top: "auto",
        left: "auto",
        width: "90%",
        maxWidth: "500px",
        height: "auto",
        borderRadius: "24px",
        padding: "24px",
        ease: "back.in(0.7)",
      });

      gsap.to(mainCardRef.current, {
        duration: 0.5,
        opacity: 1,
        scale: 1,
        pointerEvents: "auto",
        ease: "power2.out",
        delay: 0.2,
      });
    }
  }, [isSearchActive]);

  // Fetch suggestions with debounce
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (searchQuery.trim().length > 1) {
      debounceTimerRef.current = setTimeout(() => {
        fetchSuggestions();
      }, 500);
    } else {
      setSuggestions([]);
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery]);

  const fetchSuggestions = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/maps/suggestions', {
        params: { query: searchQuery },
      });
      setSuggestions(Array.isArray(response.data) ? response.data : []);

      if (suggestionsRef.current && response.data.length > 0) {
        gsap.fromTo(
          suggestionsRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "back.out(0.6)",
          }
        );
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      if (error.response?.status === 401) {
        window.location.href = '/login';
      }
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputFocus = (inputType) => {
    setActiveInput(inputType);
    setIsSearchActive(true);
    setSearchQuery("");
    setSuggestions([]);
  };

  const handleSelectLocation = (location) => {
    const locationName = location.name || location.address || location.description;

    const locationObj = {
      name: locationName,
      address: location.address || location.description,
      lat: location.lat,
      lng: location.lng,
      id: location.id,
    };

    if (activeInput === "pickup") {
      setPickupLocation(locationObj);
      setPickupDisplay(locationName);
    } else {
      setDestinationLocation(locationObj);
      setDestinationDisplay(locationName);
    }

    gsap.to(`.${activeInput}-input`, {
      duration: 0.3,
      scale: 1.02,
      backgroundColor: "#f0fdf4",
      borderColor: "#22c55e",
      onComplete: () => {
        gsap.to(`.${activeInput}-input`, {
          duration: 0.3,
          scale: 1,
          backgroundColor: "white",
          borderColor: "#e5e7eb",
        });
      },
    });

    setIsSearchActive(false);
    setSearchQuery("");
    setSuggestions([]);
  };

  const handleFindRide = () => {
    if (pickupLocation && destinationLocation) {
      if (fareError) {
        alert("Please wait while we fetch the fare or try again.");
        return;
      }

      if (!fareData) {
        alert("Fetching fare... Please wait a moment.");
        return;
      }

      gsap.to(mainCardRef.current, {
        duration: 0.5,
        scale: 0.95,
        opacity: 0,
        onComplete: () => {
          setIsVehiclePanelOpen(true);
          gsap.to(mainCardRef.current, { duration: 0, scale: 1, opacity: 1 });
        },
      });
    } else {
      alert("Please select both pickup and destination locations");
    }
  };

  const handleCloseVehiclePanel = () => {
    setIsVehiclePanelOpen(false);
  };

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsVehiclePanelOpen(false);
    setTimeout(() => {
      setIsConfirmOpen(true);
    }, 300);
  };

  const createRide = async () => {
    try {
      if (!pickupLocation || !destinationLocation || !selectedVehicle) {
        throw new Error("All fields are required to create a ride.");
      }

      const response = await api.post('/rides/create', {
        origin: pickupLocation.address || pickupLocation.name,
        destination: destinationLocation.address || destinationLocation.name,
        vehicleType: selectedVehicle,
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || "Failed to create ride");
      }
    } catch (error) {
      console.error("Failed to create ride:", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        window.location.href = '/login';
      } else if (error.response?.status === 400) {
        alert(error.response.data.message || "Invalid ride details");
      } else {
        alert("Failed to create ride. Please try again.");
      }
      throw error;
    }
  };

  const handleConfirmRide = async (bookingDetails) => {
    try {
      const rideData = await createRide();
      
      setCurrentRideDetails({
        ...rideData,
        ...bookingDetails,
        fare: fareData?.fares?.[selectedVehicle],
        distance: fareData?.distance,
        duration: fareData?.duration,
        pickupLocation,
        destinationLocation,
        vehicle: selectedVehicle,
      });
      
      setIsConfirmOpen(false);
      setIsLookingOpen(true);
    } catch (error) {
      console.error("Failed to confirm ride:", error);
    }
  };

  const handleDriverFound = (driver) => {
    setIsLookingOpen(false);
    setTimeout(() => {
      setIsWaitingOpen(true);
      setCurrentRideDetails((prev) => ({
        ...prev,
        driver: driver,
      }));
    }, 1000);
  };

  const handleCancelSearch = () => {
    setIsLookingOpen(false);
    resetRide();
  };

  const handleCancelRide = () => {
    alert("Your ride has been cancelled. We hope to serve you again soon!");
    setIsWaitingOpen(false);
    resetRide();
  };

  const resetRide = () => {
    setPickupLocation(null);
    setDestinationLocation(null);
    setPickupDisplay("");
    setDestinationDisplay("");
    setSelectedVehicle(null);
    setCurrentRideDetails(null);
    setFareData(null);
    setFareError(null);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      {/* Background Map */}
      <div className="h-screen w-screen relative">
        <img
          className="h-full w-full object-cover transition-all duration-700"
          style={{
            filter: `brightness(${isSearchActive ? 0.4 : 0.7}) blur(${isSearchActive ? 4 : 0}px)`,
          }}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTABLUH3RR9WY4ogN9jIsbV0QTaQWXDvEWW1A&s"
          alt="map"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Main Trip Card */}
      <div
        ref={mainCardRef}
        className="absolute bottom-0 left-0 right-0 lg:left-8 lg:bottom-8 lg:right-auto z-10"
      >
        <div className="bg-white/95 backdrop-blur-lg rounded-t-3xl lg:rounded-2xl shadow-2xl p-6 md:p-8 max-w-md mx-auto lg:mx-0">
          <div className="mb-6">
            <h4 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Find a Trip
            </h4>
            <p className="text-gray-500 text-sm mt-1">
              Get where you need to go
            </p>
          </div>

          <div className="space-y-4">
            {/* Pickup Input */}
            <div className="relative group">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <input
                ref={pickupInputRef}
                type="text"
                placeholder="Add a pick-up location"
                value={pickupDisplay}
                readOnly
                onFocus={() => handleInputFocus("pickup")}
                className="pickup-input w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 outline-none transition-all duration-300 bg-white/90 hover:bg-white cursor-pointer"
              />
              {pickupLocation && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              )}
            </div>

            {/* Destination Input */}
            <div className="relative group">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <input
                ref={destinationInputRef}
                type="text"
                placeholder="Enter your destination"
                value={destinationDisplay}
                readOnly
                onFocus={() => handleInputFocus("destination")}
                className="destination-input w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 outline-none transition-all duration-300 bg-white/90 hover:bg-white cursor-pointer"
              />
              {destinationLocation && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
              )}
            </div>

            {/* Fare Preview */}
            {pickupLocation && destinationLocation && (
              <div className="mt-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                {isFetchingFare ? (
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    <span className="text-sm">Fetching fare from server...</span>
                  </div>
                ) : fareError ? (
                  <div className="text-center text-red-600 text-sm">
                    <p>{fareError}</p>
                    <button
                      onClick={() =>
                        fetchFareFromBackend(pickupLocation, destinationLocation)
                      }
                      className="mt-1 text-blue-600 underline text-xs"
                    >
                      Try again
                    </button>
                  </div>
                ) : (
                  fareData && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">
                          Estimated Fare (from ₹):
                        </span>
                        <div className="flex gap-2 text-xs">
                          {fareData.fares?.bike && (
                            <span className="bg-white px-2 py-1 rounded">
                              Bike: ₹{fareData.fares.bike}
                            </span>
                          )}
                          {fareData.fares?.auto && (
                            <span className="bg-white px-2 py-1 rounded">
                              Auto: ₹{fareData.fares.auto}
                            </span>
                          )}
                          {fareData.fares?.car && (
                            <span className="bg-white px-2 py-1 rounded">
                              Car: ₹{fareData.fares.car}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>
                          Distance: {formatDistance(fareData.distance)}
                        </span>
                        <span>•</span>
                        <span>
                          Duration: {formatDuration(fareData.duration)}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            <button
              onClick={handleFindRide}
              disabled={
                !pickupLocation ||
                !destinationLocation ||
                isFetchingFare ||
                !!fareError
              }
              className={`w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                !pickupLocation ||
                !destinationLocation ||
                isFetchingFare ||
                fareError
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:from-gray-800 hover:to-gray-700 transform hover:scale-[1.02]"
              }`}
            >
              {isFetchingFare ? "Fetching fare..." : "Find My Ride"}
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-2">
              <span>✨</span> Your journey, our priority <span>✨</span>
            </p>
          </div>
        </div>
      </div>

      {/* Full Screen Search Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/80 z-20 visibility-hidden opacity-0"
        style={{ visibility: "hidden" }}
      >
        <div
          ref={searchContainerRef}
          className="absolute bg-white rounded-2xl shadow-2xl overflow-hidden"
          style={{
            top: "auto",
            left: "auto",
            width: "90%",
            maxWidth: "500px",
            height: "auto",
            borderRadius: "24px",
            padding: "24px",
          }}
        >
          <button
            onClick={() => setIsSearchActive(false)}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
          >
            <svg
              className="w-6 h-6 text-gray-500"
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

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              {activeInput === "pickup"
                ? "Choose pickup location"
                : "Choose destination"}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Search for a location below
            </p>
          </div>

          <div className="relative mb-4">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for a location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-black focus:ring-2 focus:ring-black/10 outline-none transition-all duration-300"
              autoFocus
            />
            {isLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          <div
            ref={suggestionsRef}
            className="max-h-[60vh] overflow-y-auto custom-scrollbar"
          >
            {suggestions.length === 0 && searchQuery && !isLoading && (
              <div className="text-center py-8">
                <p className="text-gray-500">No locations found</p>
              </div>
            )}
            {suggestions.map((location, index) => (
              <div
                key={location.id || index}
                onClick={() => handleSelectLocation(location)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer rounded-lg transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {location.name || location.address || location.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    {location.address || location.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Other Panels */}
      <VehicleSelectionPanel
        isOpen={isVehiclePanelOpen}
        onClose={handleCloseVehiclePanel}
        onSelectVehicle={handleSelectVehicle}
        pickupLocation={pickupDisplay}
        destinationLocation={destinationDisplay}
        fareData={fareData}
      />

      <ConfirmRide
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmRide}
        pickupLocation={pickupDisplay}
        destinationLocation={destinationDisplay}
        selectedVehicle={selectedVehicle}
        distance={fareData?.distance}
        duration={fareData?.duration}
        fare={selectedVehicle && fareData?.fares?.[selectedVehicle]}
      />

      <LookingForDriver
        isOpen={isLookingOpen}
        onClose={() => setIsLookingOpen(false)}
        rideDetails={{
          ...currentRideDetails,
          pickupLocation: pickupDisplay,
          destinationLocation: destinationDisplay,
          vehicle: selectedVehicle,
          fare: selectedVehicle && fareData?.fares?.[selectedVehicle],
        }}
        onDriverFound={handleDriverFound}
        onCancelSearch={handleCancelSearch}
      />

      <WaitingForDriver
        isOpen={isWaitingOpen}
        onClose={() => setIsWaitingOpen(false)}
        rideDetails={{
          ...currentRideDetails,
          pickupLocation: pickupDisplay,
          destinationLocation: destinationDisplay,
          vehicle: selectedVehicle,
          fare: selectedVehicle && fareData?.fares?.[selectedVehicle],
        }}
        onCancelRide={handleCancelRide}
        onTrackDriver={() => alert("Opening live tracking map...")}
      />

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
      `}</style>
    </div>
  );
};

export default UserDashboard;
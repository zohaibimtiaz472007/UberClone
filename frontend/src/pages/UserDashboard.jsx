import React, { useState, useRef, useEffect } from "react";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehicleSelectionPanel from "../components/VehicleSelectionPanel";
import ConfirmRide from "../components/ConfirmRide";
import WaitingForDriver from "../components/WaitingForDriver";
import LookingForDriver from "../components/LookingForDriver";

const UserDashboard = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isVehiclePanelOpen, setIsVehiclePanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [rideDetails, setRideDetails] = useState(null);
  const [isWaitingOpen, setIsWaitingOpen] = useState(false);
  const [currentRideDetails, setCurrentRideDetails] = useState(null);
  const [isLookingOpen, setIsLookingOpen] = useState(false);

  const cardRef = useRef(null);
  const pickUpRef = useRef(null);
  const destinationRef = useRef(null);

  const handleInputFocus = (inputName) => {
    setActiveInput(inputName);
    setIsInputFocused(true);
    setIsPanelOpen(true);
  };

  const handleSelectLocation = (location) => {
    if (activeInput === "pickup") {
      setPickupLocation(location.name);
      if (pickUpRef.current) {
        pickUpRef.current.value = location.name;
      }
    } else if (activeInput === "destination") {
      setDestinationLocation(location.name);
      if (destinationRef.current) {
        destinationRef.current.value = location.name;
      }
    }
    setIsPanelOpen(false);
    setSearchQuery("");

    // If both locations are selected, show vehicle panel
    if (
      (activeInput === "pickup" && destinationLocation) ||
      (activeInput === "destination" && pickupLocation) ||
      (pickupLocation && destinationLocation)
    ) {
      setTimeout(() => {
        setIsVehiclePanelOpen(true);
        setIsInputFocused(false);
        setActiveInput(null);
      }, 300);
    } else {
      setIsInputFocused(false);
      setActiveInput(null);
    }
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setIsInputFocused(false);
    setActiveInput(null);
    setSearchQuery("");
  };

  const handleCloseVehiclePanel = () => {
    setIsVehiclePanelOpen(false);
  };

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsVehiclePanelOpen(false);
    // Open confirm ride panel
    setTimeout(() => {
      setIsConfirmOpen(true);
    }, 300);
  };

  const handleOpenConfirm = () => {
    setIsConfirmOpen(true);
    setIsVehiclePanelOpen(false);
  };

  const handleConfirmRide = (bookingDetails) => {
    console.log("Ride confirmed:", bookingDetails);
    setCurrentRideDetails(bookingDetails);
    setIsConfirmOpen(false);

    // Open looking for driver panel after confirmation
    setTimeout(() => {
      setIsLookingOpen(true);
    }, 500);
  };

  const handleDriverFound = (driver) => {
    console.log("Driver found:", driver);
    setIsLookingOpen(false);

    // Open waiting for driver panel
    setTimeout(() => {
      setIsWaitingOpen(true);
      // Store driver info in currentRideDetails
      setCurrentRideDetails((prev) => ({
        ...prev,
        driver: driver,
      }));
    }, 1000);
  };

  const handleCancelSearch = () => {
    alert("Search cancelled. You can try again later.");
    setIsLookingOpen(false);
    setCurrentRideDetails(null);
    // Reset locations
    setPickupLocation("");
    setDestinationLocation("");
    setSelectedVehicle(null);
    if (pickUpRef.current) pickUpRef.current.value = "";
    if (destinationRef.current) destinationRef.current.value = "";
  };
  const handleTrackDriver = () => {
    alert("Opening live tracking map...");
    // Here you would open a fullscreen map or navigate to tracking page
  };

  const handleCancelRide = () => {
    alert("Your ride has been cancelled. We hope to serve you again soon!");
    setCurrentRideDetails(null);
    // Reset all states to start over
    setPickupLocation("");
    setDestinationLocation("");
    setSelectedVehicle(null);
    if (pickUpRef.current) pickUpRef.current.value = "";
    if (destinationRef.current) destinationRef.current.value = "";
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      {/* Logo */}
      <div
        className={`absolute top-6 left-6 z-20 transition-all duration-700 ${isInputFocused || isVehiclePanelOpen ? "opacity-0 scale-75" : "opacity-100 scale-100"}`}
      >
        <img
          src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
          alt="uber logo"
          className="h-12 w-auto brightness-0 invert hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Map Container */}
      <div className="h-screen w-screen relative">
        <img
          className="h-full w-full object-cover transition-all duration-700 ease-in-out"
          style={{
            filter:
              isInputFocused || isVehiclePanelOpen
                ? "brightness(0.7) blur(2px)"
                : "brightness(1) blur(0px)",
          }}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTABLUH3RR9WY4ogN9jIsbV0QTaQWXDvEWW1A&s"
          alt="map"
        />

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Trip Finder Card */}
      <div
        ref={cardRef}
        className={`absolute transition-all duration-700 ease-in-out z-10
          ${
            isInputFocused || isVehiclePanelOpen
              ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[500px]"
              : "bottom-0 left-0 right-0 lg:left-8 lg:bottom-8 lg:right-auto lg:max-w-md"
          }
          ${isVehiclePanelOpen ? "opacity-0 pointer-events-none" : "opacity-100"}
          bg-white/95 backdrop-blur-lg rounded-t-3xl lg:rounded-2xl shadow-2xl p-6 md:p-8
        `}
      >
        <div
          className={`transition-all duration-500 ${isInputFocused ? "mb-4" : "mb-6"}`}
        >
          <h4
            className={`font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent transition-all duration-500 ${isInputFocused ? "text-2xl" : "text-3xl"}`}
          >
            Find a Trip
          </h4>
          {!isInputFocused && (
            <p className="text-gray-500 text-sm mt-1">
              Get where you need to go
            </p>
          )}
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="relative group">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
              <svg
                className="w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors duration-300"
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
              ref={pickUpRef}
              type="text"
              placeholder="Add a pick-up location"
              defaultValue={pickupLocation}
              onFocus={() => handleInputFocus("pickup")}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 outline-none transition-all duration-300 bg-white/90 hover:bg-white cursor-pointer"
              readOnly
            />
            {pickupLocation && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            )}
          </div>

          <div className="relative group">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
              <svg
                className="w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors duration-300"
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
              ref={destinationRef}
              type="text"
              placeholder="Enter your destination"
              defaultValue={destinationLocation}
              onFocus={() => handleInputFocus("destination")}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 outline-none transition-all duration-300 bg-white/90 hover:bg-white cursor-pointer"
              readOnly
            />
            {destinationLocation && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3 rounded-xl font-semibold hover:from-gray-800 hover:to-gray-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl
              ${isInputFocused ? "opacity-100 translate-y-0" : "opacity-100"}
            `}
            onClick={() => {
              if (pickupLocation && destinationLocation) {
                setIsVehiclePanelOpen(true);
                setIsInputFocused(false);
              }
            }}
          >
            {isInputFocused ? "Continue to Ride" : "Find My Ride"}
          </button>
        </form>

        {/* Recent Trips Section */}
        <div
          className={`mt-6 pt-4 border-t border-gray-200 transition-all duration-500 ${isInputFocused ? "opacity-0 h-0 mt-0 p-0 overflow-hidden" : "opacity-100"}`}
        >
          <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-2">
            <span>✨</span> Your journey, our priority <span>✨</span>
          </p>
        </div>
      </div>

      {/* Location Search Panel */}
      <LocationSearchPanel
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        onSelectLocation={handleSelectLocation}
        inputType={activeInput}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Vehicle Selection Panel */}
      <VehicleSelectionPanel
        isOpen={isVehiclePanelOpen}
        onClose={handleCloseVehiclePanel}
        onSelectVehicle={handleSelectVehicle} // This now opens confirm panel
        pickupLocation={pickupLocation}
        destinationLocation={destinationLocation}
      />

      <ConfirmRide
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmRide}
        pickupLocation={pickupLocation}
        destinationLocation={destinationLocation}
        selectedVehicle={selectedVehicle}
        estimatedDistance="8.5"
        estimatedTime="20"
      />

      <WaitingForDriver
        isOpen={isWaitingOpen}
        onClose={() => setIsWaitingOpen(false)}
        rideDetails={{
          ...currentRideDetails,
          pickupLocation,
          destinationLocation,
          vehicle: selectedVehicle,
        }}
        onCancelRide={handleCancelRide}
        onTrackDriver={handleTrackDriver}
      />
      <LookingForDriver
        isOpen={isLookingOpen}
        onClose={() => setIsLookingOpen(false)}
        rideDetails={{
          ...currentRideDetails,
          pickupLocation,
          destinationLocation,
          vehicle: selectedVehicle,
        }}
        onDriverFound={handleDriverFound}
        onCancelSearch={handleCancelSearch}
      />
    </div>
  );
};

export default UserDashboard;

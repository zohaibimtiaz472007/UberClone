const Ride = require('../models/ride.model')
const mapsService = require('./maps.service')
const crypto = require('crypto')

function getOtp(num) {
  return crypto.randomInt(
    Math.pow(10, num - 1),
    Math.pow(10, num)
  ).toString();
}


// FARE CALCULATION LOGIC


module.exports.calculateFare = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination required");
  }

  const rideData = await mapsService.getDistanceTime(origin, destination);

  if (!rideData) {
    throw new Error("Unable to calculate distance");
  }

  const distance = Number(rideData.distanceInKm);
  const duration = Number(rideData.durationInMinutes);

  const fares = {
    auto: Math.round(40 + distance * 12 + duration * 2),
    bike: Math.round(20 + distance * 8 + duration * 1.5),
    car: Math.round(80 + distance * 20 + duration * 3),
  };

  return { distance, duration, fares };
};

// CREATE RIDE

module.exports.createRide = async ({
  user,
  origin,
  destination,
  vehicleType
}) => {
  if (!user || !origin || !destination || !vehicleType) {
    throw new Error("Enter all the fields");
  }

  const fareData = await module.exports.calculateFare(origin, destination);

  const ride = await Ride.create({
    user,
    origin,
    destination,
    vehicleType,
    fare: fareData.fares[vehicleType], // ✅ FIXED
    distance: fareData.distance,
    duration: fareData.duration,
    otp: getOtp(6) // Generate and store OTP for the ride
    
  });

  return ride;
};

// GET SINGLE RIDE

module.exports.getRideById = async (
  rideId
) => {

  return await Ride.findById(rideId)
    .populate('user')
    .populate('captain')
}

// UPDATE RIDE STATUS

module.exports.updateRideStatus = async (rideId, status) => {
  const validStatuses = [
    "pending",
    "accepted",
    "ongoing",
    "completed",
    "cancelled",
  ];

  if (!validStatuses.includes(status)) {
    throw new Error("Invalid status");
  }

  const ride = await Ride.findByIdAndUpdate(
    rideId,
    { status },
    { new: true }
  );

  return ride;
};
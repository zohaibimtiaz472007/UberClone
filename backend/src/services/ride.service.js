const Ride = require('../models/ride.model')
const mapsService = require('./maps.service')

// FARE CALCULATION LOGIC

module.exports.calculateFare = async (
  origin,
  destination
) => {

  if (!origin || !destination) {
    throw new Error(
      'Origin and destination required'
    )
  }

  // DISTANCE + TIME
  const rideData =
    await mapsService.getDistanceTime(
      origin,
      destination
    )

  if (!rideData) {
    throw new Error(
      'Unable to calculate distance'
    )
  }

  const distance =
    Number(rideData.distanceInKm)

  const duration =
    Number(rideData.durationInMinutes)

 // UBER LIKE PRICING LOGIC

  const baseFare = 100

  const perKmRate = 25

  const perMinuteRate = 3

  const fare = Math.round(
    baseFare +
    (distance * perKmRate) +
    (duration * perMinuteRate)
  )

  return {

    fare,

    distance,

    duration
  }
}

// CREATE RIDE

module.exports.createRide = async ({
  user,
  origin,
  destination
}) => {

  if (!user || !origin || !destination) {

    throw new Error(
      'All fields are required'
    )
  }

  // CALCULATE FARE
  const fareData =
    await module.exports.calculateFare(
      origin,
      destination
    )

  // CREATE RIDE
  const ride = await Ride.create({

    user,

    origin,

    destination,

    fare: fareData.fare,

    distance: fareData.distance,

    duration: fareData.duration
  })

  return ride
}

// GET SINGLE RIDE

module.exports.getRideById = async (
  rideId
) => {

  return await Ride.findById(rideId)
    .populate('user')
    .populate('captain')
}

// UPDATE RIDE STATUS

module.exports.updateRideStatus = async (
  rideId,
  status
) => {

  const validStatuses = [
    'pending',
    'accepted',
    'ongoing',
    'completed',
    'cancelled'
  ]

  if (!validStatuses.includes(status)) {

    throw new Error('Invalid status')
  }

  const ride = await Ride.findByIdAndUpdate(

    rideId,

    { status },

    { new: true }

  )

  return ride
}
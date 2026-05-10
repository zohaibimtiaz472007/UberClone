const axios = require('axios')

module.exports.searchPlaces = async (input) => {
  try {
    const response = await axios.get(
      'https://nominatim.openstreetmap.org/search',
      {
        params: {
          q: input,
          format: 'json',
          limit: 1
        },
        headers: {
          'User-Agent': 'UberCloneApp'
        }
      }
    )

    return response.data[0]

  } catch (error) {
    console.log(error)
    return null
  }
}

module.exports.getDistanceTime = async (
  originText,
  destinationText
) => {

  try {

    // GET ORIGIN COORDINATES
    const originData =
      await module.exports.searchPlaces(originText)

    // GET DESTINATION COORDINATES
    const destinationData =
      await module.exports.searchPlaces(destinationText)

    if (!originData || !destinationData) {
      return null
    }

    const response = await axios.post(
      'https://api.openrouteservice.org/v2/matrix/driving-car',

      {
        locations: [
          [
            parseFloat(originData.lon),
            parseFloat(originData.lat)
          ],

          [
            parseFloat(destinationData.lon),
            parseFloat(destinationData.lat)
          ]
        ],

        metrics: ['distance', 'duration']
      },

      {
        headers: {
          Authorization: process.env.ORS_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    )

    const distance =
      response.data.distances[0][1]

    const duration =
      response.data.durations[0][1]

    return {

      origin: originText,
      destination: destinationText,

      distanceInKm:
        (distance / 1000).toFixed(2),

      durationInMinutes:
        (duration / 60).toFixed(0)

    }

  } catch (error) {
    console.log(error)
    return null
  }
}

module.exports.getSuggestions = async (query) => {
  try {
    const response = await axios.get(
      'https://nominatim.openstreetmap.org/search',
      {
        params: {
          q: query,

          format: 'json',
          addressdetails: 1,
          limit: 5,

          // 🔥 FORCE PAKISTAN ONLY
          countrycodes: 'pk',

          // 🔥 FOCUS ON KHYBER PAKHTUNKHWA REGION
          viewbox: '70.0,36.0,74.0,33.0',
          bounded: 1
        },
        headers: {
          'User-Agent': 'ZonixSchoolManagementSystem'
        }
      }
    )

    return response.data.map((place) => ({
      name: place.display_name,
      lat: place.lat,
      lng: place.lon
    }))

  } catch (error) {
    console.log(error)
    return []
  }
}

module.exports.getRoute = async (origin, destination) => {
  try {
    const response = await axios.post(
      'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
      {
        coordinates: [
          [origin.lng, origin.lat],
          [destination.lng, destination.lat]
        ]
      },
      {
        headers: {
          Authorization: process.env.ORS_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data

  } catch (error) {
    console.log(error)
    return null
  }
}
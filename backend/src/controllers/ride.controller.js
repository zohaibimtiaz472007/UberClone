const rideService = require('../services/ride.service')

/*
|--------------------------------------------------------------------------
| GET FARE
|--------------------------------------------------------------------------
*/

module.exports.getFare = async (
  req,
  res
) => {

  try {

    const {
      origin,
      destination
    } = req.query

    if (!origin || !destination) {

      return res.status(400).json({
        success: false,
        message:
          'Origin and destination required'
      })
    }

    const fareData =
      await rideService.calculateFare(
        origin,
        destination
      )

    return res.status(200).json({

      success: true,

      data: fareData
    })

  } catch (error) {

    console.log(error)

    return res.status(500).json({

      success: false,

      message: error.message
    })
  }
}

/*
|--------------------------------------------------------------------------
| CREATE RIDE
|--------------------------------------------------------------------------
*/

module.exports.createRide = async (
  req,
  res
) => {

  try {

    const {
      origin,
      destination
    } = req.body

    // USER FROM AUTH MIDDLEWARE
    const user = req.user

    if (!origin || !destination) {

      return res.status(400).json({

        success: false,

        message:
          'Origin and destination required'
      })
    }

    const ride =
      await rideService.createRide({

        user: user._id,

        origin,

        destination
      })

    return res.status(201).json({

      success: true,

      message: 'Ride created successfully',

      data: ride
    })

  } catch (error) {

    console.log(error)

    return res.status(500).json({

      success: false,

      message: error.message
    })
  }
}

/*
|--------------------------------------------------------------------------
| GET SINGLE RIDE
|--------------------------------------------------------------------------
*/

module.exports.getRide = async (
  req,
  res
) => {

  try {

    const { rideId } = req.params

    const ride =
      await rideService.getRideById(
        rideId
      )

    if (!ride) {

      return res.status(404).json({

        success: false,

        message: 'Ride not found'
      })
    }

    return res.status(200).json({

      success: true,

      data: ride
    })

  } catch (error) {

    console.log(error)

    return res.status(500).json({

      success: false,

      message: error.message
    })
  }
}

/*
|--------------------------------------------------------------------------
| UPDATE RIDE STATUS
|--------------------------------------------------------------------------
*/

module.exports.updateRideStatus = async (
  req,
  res
) => {

  try {

    const {
      rideId,
      status
    } = req.body

    if (!rideId || !status) {

      return res.status(400).json({

        success: false,

        message:
          'Ride ID and status required'
      })
    }

    const ride =
      await rideService.updateRideStatus(

        rideId,

        status
      )

    return res.status(200).json({

      success: true,

      message:
        'Ride status updated',

      data: ride
    })

  } catch (error) {

    console.log(error)

    return res.status(500).json({

      success: false,

      message: error.message
    })
  }
}
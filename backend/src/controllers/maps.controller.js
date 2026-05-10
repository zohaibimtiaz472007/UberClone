const mapsService = require('../services/maps.service')

module.exports.searchLocation = async (
  req,
  res
) => {
  const { input } = req.query

  if (!input) {
    return res.status(400).json({
      message: 'Input is required'
    })
  }

  const suggestions =
    await mapsService.searchPlaces(input)

  res.json(suggestions)
}

module.exports.getDistanceTime = async (
  req,
  res
) => {

  const { origin, destination } = req.body

  if (!origin || !destination) {

    return res.status(400).json({
      message: 'Origin and destination required'
    })
  }

  const data =
    await mapsService.getDistanceTime(
      origin,
      destination
    )

  res.json(data)
}


module.exports.getSuggestions = async (req, res) => {
  const { query } = req.query

  if (!query) {
    return res.status(400).json({
      message: 'Query is required'
    })
  }

  const results =
    await mapsService.getSuggestions(query)

  res.json(results)
}

module.exports.getRoute = async (req, res) => {
  const { origin, destination } = req.body

  const route =
    await mapsService.getRoute(origin, destination)

  res.json(route)
}
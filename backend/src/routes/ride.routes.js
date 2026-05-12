const express = require("express");

const router = express.Router();

const { body } = require("express-validator");

const rideController = require("../controllers/ride.controller");
const authMiddleware = require("../middlewares/auth.middleware");

/*
|--------------------------------------------------------------------------
| CREATE RIDE
|--------------------------------------------------------------------------
*/

router.post(
  "/create",
  authMiddleware.authUser,

  [
    body("origin").notEmpty().withMessage("Origin is required"),

    body("destination").notEmpty().withMessage("Destination is required"),
  ],

  rideController.createRide,
);

/*
|--------------------------------------------------------------------------
| GET FARE
|--------------------------------------------------------------------------
*/

router.get(
  "/fare",

  rideController.getFare,
);

/*
|--------------------------------------------------------------------------
| GET SINGLE RIDE
|--------------------------------------------------------------------------
*/

router.get(
  "/:rideId",
  authMiddleware.authUser,

  rideController.getRide,
);

/*
|--------------------------------------------------------------------------
| UPDATE STATUS
|--------------------------------------------------------------------------
*/

router.put(
  "/:rideId/status",
  authMiddleware.authUser,
  rideController.updateRideStatus
);

module.exports = router;

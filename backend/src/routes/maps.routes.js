const express = require("express");

const router = express.Router();

const mapsController = require("../controllers/maps.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/search", authMiddleware.authUser, mapsController.searchLocation);

router.post(
  "/distance-time",
  authMiddleware.authUser,
  mapsController.getDistanceTime,
);

router.get("/suggestions", mapsController.getSuggestions);
router.post('/route', mapsController.getRoute)

module.exports = router;

import express from "express"
import ToursCtrl from "./tours.controller.js"
import ItinerariesCtrl from "./itineraries.controller.js"

const router = express.Router()

router.route("/").get(ToursCtrl.apiGetTours)
router.route("/id/:id").get(ToursCtrl.apiGetTourById)
router.route("/regions").get(ToursCtrl.apiGetRegions)

router
    .route("/itinerary")
    .post(ItinerariesCtrl.apiPostItineraryItem)
    .put(ItinerariesCtrl.apiUpdateItineraryItem)
    .delete(ItinerariesCtrl.apiDeleteItineraryItem)

export default router
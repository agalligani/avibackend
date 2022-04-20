import itinerariesDAO from "../dao/itinerariesDAO.js"

export default class itinerariesCtrl {
    static async apiPostItineraryItem(req, res, next) {

        try {
            let reqBody = req.body
            console.log(reqBody)
            const tourId = req.body.tour_id
            const title = req.body.title
            const description = req.body.description
            const ItineraryResponse = await itinerariesDAO.addItineraryItem(
                tourId,
                title,
                description
            )

            res.json({status: "success"})

        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateItineraryItem(req, res, next) {

        try {
            const itineraryId = req.body._id
            const itineraryTitle = req.body.title
            const itineraryDesc = req.body.description
            const ItineraryResponse = await itinerariesDAO.updateItineraryItem(
                itineraryId,
                itineraryDesc
            )
            res.json({status: "success"})
        } catch (e) {
            res.status(500).json({ error: e.message })
        }

    }

    static async apiDeleteItineraryItem(req, res, next) {
        try {
            console.log(`Request: ${req.body._id}`);
            const itineraryId = req.body._id
            const itineraryResponse = await itinerariesDAO.deleteItineraryItem(
                itineraryId
            )
            res.json({ status: "success"})
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }
}
import toursDAO from "../dao/toursDAO.js";

export default class ToursCtrl {
    static async apiGetTours (req, res, next) {
        const toursPerPage = req.query.toursPerPage ? parseInt(req.query.toursPerPage, 10) : 10 
        const page = req.query.page ? req.query.page : 0

        let filters = {}

        if (req.query.region) {
            filters.region = req.query.region
        } else if (req.query.title) {
            filters.title = req.query.title
        } else if (req.query.country) {
            filters.country = req.query.country
        }

        const {toursList, totalNumTours } = await toursDAO.getTours({
            filters: filters,
            page: page,
            toursPerPage: toursPerPage,
        })

        let response = {
            tours: toursList,
            page: page,
            filters: filters,
            entries_per_page: toursPerPage,
            total_results: totalNumTours
        }
        res.json(response)
    }

    static async apiGetTourById (req, res, next) {

        try {
            let id = req.params.id || {}
            let tour = await toursDAO.getTourById(id)
            if (!tour) {
                console.log({"error": "Unable to retrieve matching tour by id"})
                return
            }
            res.json(tour)

        } catch (e) {
            console.log(`Api: ${e}`)
            res.status(500).json({ error: e })
        }        
    }

    static async apiGetRegions (req, res, next) {

        try {
            let regions = await toursDAO.getRegions()
            if(!regions) {
                console.log({"error": "Unable to retrieve regions"})
                return                
            }
            res.json(regions)

        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })            
        }
    }
}
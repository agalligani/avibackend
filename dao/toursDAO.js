import mondodb from "mongodb"

const ObjectId = mondodb.ObjectId
let tours

export default class toursDAO {
    static async injectDB(conn) {
        if (tours) {
            return
        } 
        try {
            tours = await conn.db(process.env.TOURS_NS).collection("tours")
        } catch (e) {
            console.error(`Unable to connect to database: ${e}`)
        }
    }

    static async getTours({
        filters=null,
        page=0,
        toursPerPage=10} = {})
    {
        let query
        if (filters) {
            if ("title" in filters) {
                query = {"title": {$eq: filters["title"]}}
            }
            if ("region" in filters) {
                query = {"region": {$eq: filters["region"]}}
            }
        }

        let cursor

        try {
            cursor = await tours.find(query)

        } catch (e) {
            console.error(`Error with retrieving documents: ${e}`)
            return {toursList: [], totalNumTours: 0}
        }

        const displayCursor = cursor.limit(toursPerPage).skip(toursPerPage * page)

        try {
            const toursList = await displayCursor.toArray()
            const totalNumTours = await tours.countDocuments(query)
            return {toursList: toursList, totalNumTours: totalNumTours}

        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting document ${e}`)
            return {toursList: [], totalNumTours: 0}
        
        }
    }

    static async getTourById (id) {

        try {
            const pipeline = [
                { 
                    $match: { 
                        _id: new ObjectId(id),},
                },
                {
                    $lookup: {
                        from: "itineraries",
                        let: {
                            id: "$_id",
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$tourId", "$$id"],
                                    },
                                },
                            },
                        ],
                        as: "itinerary"
                    },
                },
                {
                    $addFields: {
                        itinerary: "$itinerary"
                    }
                },
            ]
        return await tours.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Something went wrong in getToursById: ${e} `)
            throw e
        }
    }

    static async getRegions () {
        let regions = []
        try {
            regions = tours.distinct("region")
            return regions
        } catch (e) {
            console.error(`Unable to get regions: ${e}`)
            return regions
        }
    }
}
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let itineraries

export default class itinerariesDAO {
    static async injectDB(conn) {
        if (itineraries) {
            return
        } 
        try {
            itineraries = await conn.db("tours").collection("itineraries")
        } catch (e) {
            console.error(`Unable to connect to database: ${e}`)
        }
    }

    static async addItineraryItem( tourId, itineraryDesc) {

        try {
            const itineraryItemDoc = {
                itineraryDesc: itineraryDesc,
                tourId: ObjectId(tourId)    
            }
            return await itineraries.insertOne(itineraryItemDoc)
        } catch (e) {
            console.error(`Unable to post itinerary item: ${e}`)
            return { error: e }
        }
    } 

    static async updateItineraryItem( itineraryId, itineraryDesc) {

        try {
            console.log(`itineraryDesc: ${itineraryDesc}`);
            const updateResponse = await itineraries.updateOne(
                {_id: ObjectId(itineraryId)},
                {$set: { itineraryDesc: itineraryDesc}}
            )
            return updateResponse
        } catch (e) {
            console.error(`Unable to post itinerary item: ${e}`)
            return { error: e }
        }
    } 

    static async deleteItineraryItem( itinerary_id ) {
        try {
        const itineraryId = itinerary_id
        return await itineraries.deleteOne({_id: ObjectId(itineraryId)})
        } catch (e) {
            console.error(`Unable to delete itinerary item: ${e}`)
            return { error: e }
        }
    }
        
}
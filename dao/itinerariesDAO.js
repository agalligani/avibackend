import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let itineraries

export default class itinerariesDAO {
    static async injectDB(conn) {
        if (itineraries) { return } 
        try {
            itineraries = await conn.db("tours").collection("itineraries")
        } catch (e) {
            console.error(`Unable to connect to database: ${e}`)
        }
    }

    static async addItineraryItem( tourId, title, description) {
        try {
            const itineraryItemDoc = {
                title: title,
                description: description,
                tourId: ObjectId(tourId)    
            }
            return await itineraries.insertOne(itineraryItemDoc)
        } catch (e) {
            console.error(`Unable to post itinerary item: ${e}`)
            return { error: e }
        }
    } 

    static async updateItineraryItem( itineraryId, title, description) {
        try {
            console.log(`itineraryId: ${itineraryId}, title: ${title}, description: ${description}`);
            const updateResponse = await itineraries.updateOne(
                {_id: ObjectId(itineraryId)},
                {$set: { title: title}},
                {$set: { description: description}}
            )
            return updateResponse
        } catch (e) {
            console.error(`Unable to post itinerary item: ${e}`)
            return { error: e }
        }
    } 

    static async deleteItineraryItem( itineraryId ) {
        console.log(`Deleting itinerary ${itineraryId}`);
        try {
        return await itineraries.deleteOne({_id: ObjectId(itineraryId)})
        } catch (e) {
            console.error(`Unable to delete itinerary item: ${e}`)
            return { error: e }
        }
    }       
}
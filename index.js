import app from "./server.js"
import mondodb from "mongodb"
import dotenv from "dotenv"
import toursDAO from "./dao/toursDAO.js"
import itinerariesDAO from "./dao/itinerariesDAO.js"

dotenv.config()

const MongoClient = mondodb.MongoClient
const port = process.env.PORT || 8000 

MongoClient.connect(process.env.TOURS_DB_URI, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true
}
).catch( err => {
    console.error(err.stack)
    process.exit(1)
}
).then(
    async client => {
        await toursDAO.injectDB(client)
        await itinerariesDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    }
)

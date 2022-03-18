import express from "express"
import cors from "cors"
import tours from "./api/tours.route.js"

const app = express()
app.use(cors())
app.use(express.json())

// app.use(express.json({extended: false}))

app.use((req, res, next) => {
    if(req.query.name) {
        console.log('Name:', req.query.name || "no name")
    }
    next()
})

app.use("/api/v1/tours", tours)
// app.use("/tours/:id", (req, res) => res.send(req.params.id))
app.use("*", (req, res) => res.status(404).json({error: "route not found"}))

export default app

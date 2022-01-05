import express from 'express'
import cors from 'cors'
import router from './routes'

const app = express()
const port = 3001

// Enable CORS. This allows us to send requests across origins. Should be disabled once we implement bundling.
app.use(cors())
// Parse all request bodies as JSON
app.use(express.json())
// Add routes to the app
app.use(router)

// Launch the app on the specified port
app.listen(port, () => console.log(`Running on port ${port}`))
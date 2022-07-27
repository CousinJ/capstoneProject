require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed} = require('./controller.js')
app.use(express.json())
app.use(cors())


app.post('/seed', seed)

app.listen(SERVER_PORT, () => console.log(`server up on ${SERVER_PORT}`))

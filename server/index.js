require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed, sendbuy, totalcost, totalvalue, sendsell} = require('./controller.js')
app.use(express.json())
app.use(cors())


app.post('/seed', seed)
app.get('/buys', sendbuy)
app.get('/cost', totalcost)
app.get('/value', totalvalue)
app.post('/sell', sendsell)
app.listen(SERVER_PORT, () => console.log(`server up on ${SERVER_PORT}`))

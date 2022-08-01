require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed, sendbitbuy, totalbitcost, totalbitvalue, sendbitsell, sendEthbuy, totalEthcost, totalEthvalue, sendEthsell, pieDataBit, pieDataEth, getGains, getLosses} = require('./controller.js')
app.use(express.json())
app.use(cors())


app.post('/seed', seed)
app.get('/pieEth', pieDataBit)
app.get('/pieBit', pieDataEth)
app.get('/gains', getGains)
app.get('/losses', getLosses)

app.get('/buybit', sendbitbuy)
app.get('/bitcost', totalbitcost)
app.get('/bitvalue', totalbitvalue)
app.post('/bitsell', sendbitsell)
//==========ETHERUM===========
app.get('/buyeth', sendEthbuy)
app.get('/ethcost', totalEthcost)
app.get('/ethvalue', totalEthvalue)
app.post('/ethsell', sendEthsell)
app.listen(SERVER_PORT, () => console.log(`server up on ${SERVER_PORT}`))

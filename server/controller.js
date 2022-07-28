const axios = require("axios");
require('dotenv').config()
const Sequelize = require('sequelize')
const {CONNECTION_STRING} = process.env
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false
            }
    }
})


//database needs to contain....
//coin information on psuedo buys...
//coin name
// price 
//timestamp 


//also will need to contain total money (points) gained from the system

module.exports = {
    seed: (req, res) => {
        // Axios request to API
        // Inside .then of Axios, set up Sequelize query
        // Once SQL finishes, send data with res.data(200).send(infothatyouwanttosendback)
        sequelize.query(`

        drop table if exists buys;
        drop table if exists myCoins;
        drop table if exists myStats;


        CREATE TABLE buys (
            buyid SERIAL PRIMARY KEY,
            coinName VARCHAR(255),
            timeStamp INTEGER,
            price DECIMAL,
            quantity INTEGER,
            cost DECIMAL

        );

        CREATE TABLE myCoins (
            coinsid SERIAL PRIMARY KEY,
            name VARCHAR,
            quantity INTEGER
        );
        
        CREATE TABLE myStats (
            
            points INTEGER
                
        );

        
        
        
        
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))


    },

      sendbuy: (req, res) => {
        const optionsCoinPrice = {
            method: 'GET',
            url: 'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/price',
            params: {referenceCurrencyUuid: 'yhjMzLPhuIDl'},
            headers: {
              'X-RapidAPI-Key': '7ef8096cd4mshb8b1d3e4ea83e07p146aa5jsn5fe7a8d917f4',
              'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
            }
          };
          
             axios.request(optionsCoinPrice).then(function(response) {

                let price = parseFloat(response.data.data.price)
                let time = response.data.data.timestamp
                sequelize.query(`
                
                    INSERT INTO buys(coinName, timeStamp, price, quantity, cost)
                    VALUES('bitcoin','${time}','${price}','1','${price}')
                
                
                
                `)

          })
            
            
              
          
          
        },  
        totalcost: (req, res) => {

        sequelize.query(`
            SELECT SUM(price)
            FROM buys
            
        
        
        `).then((dbres) => {res.status(200).send(dbres[0])})

        }, 
        totalvalue: (req, res) => {

            sequelize.query(`
                SELECT SUM(quantity)
                FROM buys

            `).then((dbres) => {res.status(200).send(dbres[0])})
        }, 
        sendsell: (req, res) => {
            let {points} = req.body
            sequelize.query(`
                INSERT INTO myStats
                VALUES('${points}');

                DELETE FROM buys WHERE coinName ='bitcoin'
            
            `)
        }
        
    }

    
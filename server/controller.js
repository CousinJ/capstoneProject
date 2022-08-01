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
            
            statid SERIAL PRIMARY KEY,
            losses DECIMAL,
            gains DECIMAL
                
        );

        
        
        
        
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))


    },

      sendbitbuy: (req, res) => {
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
        totalbitcost: (req, res) => {

        sequelize.query(`
            SELECT SUM(price)
            FROM buys
            WHERE coinName = 'bitcoin'
            
        
        
        `).then((dbres) => {res.status(200).send(dbres[0])})

        }, 
        totalbitvalue: (req, res) => {

            sequelize.query(`
                SELECT SUM(quantity)
                FROM buys
                WHERE coinName = 'bitcoin'

            `).then((dbres) => {res.status(200).send(dbres[0])})
        }, 
        sendbitsell: (req, res) => {
            let {points} = req.body
            if(points <= 0) { sequelize.query(`
                INSERT INTO myStats(losses)
                VALUES('${points}');

                DELETE FROM buys WHERE coinName ='bitcoin'
            
            `)} else if(points > 0) { sequelize.query(`
            INSERT INTO myStats(gains)
            VALUES('${points}');

            DELETE FROM buys WHERE coinName ='bitcoin'
        
        `)}
        },
        //=======================ETHEREUM=========================
        sendEthbuy: (req, res) => {
            const optionsCoinPrice = {
                method: 'GET',
                url: 'https://coinranking1.p.rapidapi.com/coin/razxDUgYGNAdQ/price',
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
                        VALUES('ethereum','${time}','${price}','1','${price}')
                    
                    
                    
                    `)
    
              })
                
                
                  
              
              
            },  
            totalEthcost: (req, res) => {
    
            sequelize.query(`
                SELECT SUM(price)
                FROM buys
                WHERE coinName = 'ethereum'
                
            
            
            `).then((dbres) => {res.status(200).send(dbres[0])})
    
            }, 
            totalEthvalue: (req, res) => {
    
                sequelize.query(`
                    SELECT SUM(quantity)
                    FROM buys
                    WHERE coinName = 'ethereum'
    
                `).then((dbres) => {res.status(200).send(dbres[0])})
            }, 
            sendEthsell: (req, res) => {
                let {points} = req.body
                if(points <= 0) { sequelize.query(`
                    INSERT INTO myStats(losses)
                    VALUES('${points}');
    
                    DELETE FROM buys WHERE coinName ='ethereum'
                
                `)} else if(points > 0) { sequelize.query(`
                INSERT INTO myStats(gains)
                VALUES('${points}');

                DELETE FROM buys WHERE coinName ='ethereum'
            
            `)}
            },

            pieDataEth: (req, res) => {
                sequelize.query(`
                    SELECT SUM(quantity)
                    FROM buys
                    WHERE coinName = 'ethereum'
                `).then((dbres) => {res.status(200).send(dbres[0])})
            }, 
            pieDataBit: (req, res) => {
                sequelize.query(`
                    SELECT SUM(quantity)
                    FROM buys
                    WHERE coinName = 'bitcoin'
                `).then((dbres) => {res.status(200).send(dbres[0])})
            }, 
            getGains: (req, res) => {
                sequelize.query(`
                    SELECT SUM(gains)
                    FROM myStats
                    
                `).then((dbres) => {res.status(200).send(dbres[0])})
            },
            getLosses: (req, res) => {
                sequelize.query(`
                    SELECT SUM(losses)
                    FROM myStats
                    
                `).then((dbres) => {res.status(200).send(dbres[0])})
            }
        
        
    }

    
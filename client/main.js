//const axios = require("axios");
// get coinS

//comenting out other requests for time being...
/*
const optionsCoins = {
  method: 'GET',
  url: 'https://coinranking1.p.rapidapi.com/coins',
  params: {
    referenceCurrencyUuid: 'yhjMzLPhuIDl',
    timePeriod: '24h',
    'tiers[0]': '1',
    orderBy: 'marketCap',
    orderDirection: 'desc',
    limit: '50',
    offset: '0'
  },
  headers: {
    'X-RapidAPI-Key': '7ef8096cd4mshb8b1d3e4ea83e07p146aa5jsn5fe7a8d917f4',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  }
};

axios.request(optionsCoins).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
// get coin 


const optionsCoin = {
  method: 'GET',
  url: 'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd',
  params: {referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod: '24h'},
  headers: {
    'X-RapidAPI-Key': '7ef8096cd4mshb8b1d3e4ea83e07p146aa5jsn5fe7a8d917f4',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  }
};

axios.request(optionsCoin).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});


*/

//get coin price 


const optionsCoinPrice = {
  method: 'GET',
  url: 'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/price',
  params: {referenceCurrencyUuid: 'yhjMzLPhuIDl'},
  headers: {
    'X-RapidAPI-Key': '7ef8096cd4mshb8b1d3e4ea83e07p146aa5jsn5fe7a8d917f4',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  }
};

axios.request(optionsCoinPrice).then(function (response) {
	
  const priceElement = document.getElementById('bitPrice')
  priceElement.textContent = response.data.data.price
  
}).catch(function (error) {
	console.error(error);
});


//get past 30 days price history 


const optionsHistory = {
  method: 'GET',
  url: 'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/history',
  params: {referenceCurrencyUuid: 'yhjMzLPhuIDl', timePeriod: '30d'},
  headers: {
    'X-RapidAPI-Key': '7ef8096cd4mshb8b1d3e4ea83e07p146aa5jsn5fe7a8d917f4',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  }
};

 const pricehistory = axios.request(optionsHistory).then(function (response) {
  pricehis = [] 
  for(i = 0; i < 30; i++) {
   
   
    pricehis.push(response.data.data.history[i].price)
  }
    const chart = document.getElementById("lineChart")

let lineChart = new Chart(chart, {
    type: 'line',
    data: {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 25, 26, 27, 28, 29, 30],
        datasets: [
            {
                label: "30d prices",
                fill: false,
                data: pricehis,
                borderColor: 'rgb(255, 0, 255)',
                tension: 0.1

            }
        ]
    }
    
})
  
	
}).catch(function (error) {
	console.error(error);
});


function pseudobuy() {
  axios.get('http://localhost:4005/buys')
      .then(() => {
        console.log('successfully purchased bitcoin')
          //conformation that data went into database
      })
}



 buyButton = document.querySelector('#buyBtn')

buyButton.addEventListener('click', pseudobuy)





  



  
 




axios.request(optionsCoinPrice).then(function (response) {

  let currentPrice = parseFloat(response.data.data.price)
  axios.get('http://localhost:4005/cost').then((res) => {
    //getting the money spent for the coin
    let totalcost = parseFloat(res.data[0].sum)

    axios.get('http://localhost:4005/value').then((res) => {
      // getting the value of the coins you bought
        let quantity = parseInt(res.data[0].sum)
        
        let value = quantity * currentPrice
        
        const chart = document.getElementById("bargraph")

        let lineChart = new Chart(chart, {
            type: 'bar',
            data: {
                labels: ['cost', 'value'],
                datasets: [
                    {
                        label: "comparisson",
                        fill: false,
                        data: [totalcost, value],
                        borderColor: 'rgb(255, 0, 255)',
                        backgroundColor: ['rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)']
                        
        
                    }
                ]
            }
            
        })
      
      }) 





  })

	
    
}).catch(function (error) {
	console.error(error);
});


function sellFunction() {
  axios.request(optionsCoinPrice).then(function (response) {

    let currentPrice = parseFloat(response.data.data.price)
    axios.get('http://localhost:4005/cost').then((res) => {
      //getting the money spent for the coin
      let totalcost = parseFloat(res.data[0].sum)
  
      axios.get('http://localhost:4005/value').then((res) => {
        // getting the value of the coins you bought
          let quantity = parseInt(res.data[0].sum)
          
          let value = quantity * currentPrice

          body= {
            points: Math.floor(value - totalcost)
          }
  axios.post('http://localhost:4005/sell', body)




      })
    })
  })



}
sellButton = document.querySelector('#sellbtn')

sellButton.addEventListener('click', sellFunction)

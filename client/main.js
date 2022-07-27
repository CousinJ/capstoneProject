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
	console.log(response.data.data.price);
  const priceElement = document.getElementById('bitPrice')
  priceElement.textContent = response.data.data.price
  console.log(response.data.data.timestamp)
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
  axios.post('http://localhost:4005/buys')
      .then(() => {
        console.log('successfully purchased bitcoin')
          //conformation that data went into database
      })
}

 buyButton = document.querySelector('#buyBtn')

buyButton.addEventListener('click', pseudobuy)




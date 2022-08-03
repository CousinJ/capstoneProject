
//conprice options
const optionsbitCoinPrice = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/price',
    params: {referenceCurrencyUuid: 'yhjMzLPhuIDl'},
    headers: {
      'X-RapidAPI-Key': '7ef8096cd4mshb8b1d3e4ea83e07p146aa5jsn5fe7a8d917f4',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };
axios.request(optionsbitCoinPrice).then(function (response) {

    let currentPrice = parseFloat(response.data.data.price)
    axios.get('http://localhost:4005/bitcost').then((res) => {
      //getting the money spent for the coin
      let totalcost = parseFloat(res.data[0].sum)
  
      axios.get('http://localhost:4005/bitvalue').then((res) => {
        // getting the value of the coins you bought
          let quantity = parseInt(res.data[0].sum)
          
          let value = quantity * currentPrice
          
          const chart = document.getElementById("bitbargraph")
  
          let lineChart = new Chart(chart, {
              type: 'bar',
              options: {responsive: false},
              data: {
                  labels: ['cost', 'value'],
                  datasets: [
                      {
                          label: "Bitcoin",
                          fill: false,
                          data: [totalcost, value],
                          borderColor: ['rgb(0, 0, 0)', 'rgb(0, 0, 0)', ],
                          borderWidth: 1,
                          backgroundColor: ['rgba(255, 50, 0, 0.7)', 'rgba(0, 255, 50, 0.7)']

                          
          
                      }
                  ]
              }
              
          })
        
        }) 
  
  
  
  
  
    })
  
      
      
  }).catch(function (error) {
      console.error(error);
  });
  
  
  function sellbitFunction() {
    axios.request(optionsbitCoinPrice).then(function (response) {
  
      let currentPrice = parseFloat(response.data.data.price)
      axios.get('http://localhost:4005/bitcost').then((res) => {
        //getting the money spent for the coin
        let totalcost = parseFloat(res.data[0].sum)
    
        axios.get('http://localhost:4005/bitvalue').then((res) => {
          // getting the value of the coins you bought
            let quantity = parseInt(res.data[0].sum)
            
            let value = quantity * currentPrice
  
            body= {
              points: Math.floor(value - totalcost)
            }
    axios.post('http://localhost:4005/bitsell', body).then(()=>{alert(`Bitcoin x${quantity} successfully sold. net profit: $${Math.floor(value - totalcost)}`)})
  
  
  
  
        })
      })
    })
  
  
  
  }
  sellbitButton = document.querySelector('#sellBitbtn')
  
  sellbitButton.addEventListener('click', sellbitFunction)
  //=========ETHEREUM===================================================================

  const optionsEthCoinPrice = {
    method: 'GET',
    url: 'https://coinranking1.p.rapidapi.com/coin/razxDUgYGNAdQ/price',
    params: {referenceCurrencyUuid: 'yhjMzLPhuIDl'},
    headers: {
      'X-RapidAPI-Key': '7ef8096cd4mshb8b1d3e4ea83e07p146aa5jsn5fe7a8d917f4',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };
axios.request(optionsEthCoinPrice).then(function (response) {

    let currentPrice = parseFloat(response.data.data.price)
    axios.get('http://localhost:4005/ethcost').then((res) => {
      //getting the money spent for the coin
      let totalcost = parseFloat(res.data[0].sum)
  
      axios.get('http://localhost:4005/ethvalue').then((res) => {
        // getting the value of the coins you bought
          let quantity = parseInt(res.data[0].sum)
          
          let value = quantity * currentPrice
          
          const chart = document.getElementById("ethbargraph")
  
          let lineChart = new Chart(chart, {
              type: 'bar',
              options: {responsive: false},
              data: {
                  labels: ['cost', 'value'],
                  datasets: [
                      {
                          label: 'Ethereum',
                          fill: false,
                          data: [totalcost, value],
                          borderColor: ['rgb(0, 0, 0)', 'rgb(0, 0, 0)', ],
                          borderWidth: 1,
                          backgroundColor: ['rgba(255, 50, 0, 0.7)', 'rgba(0, 255, 50, 0.7)']
                          

                          
          
                      }
                  ]
              }
              
          })
        
        }) 
  
  
  
  
  
    })
  
      
      
  }).catch(function (error) {
      console.error(error);
  });
  
  
  function sellEthFunction() {
    axios.request(optionsEthCoinPrice).then(function (response) {
  
      let currentPrice = parseFloat(response.data.data.price)
      axios.get('http://localhost:4005/ethcost').then((res) => {
        //getting the money spent for the coin
        let totalcost = parseFloat(res.data[0].sum)
    
        axios.get('http://localhost:4005/ethvalue').then((res) => {
          // getting the value of the coins you bought
            let quantity = parseInt(res.data[0].sum)
            
            let value = quantity * currentPrice
  
            body= {
              points: Math.floor(value - totalcost)
            }
           
    axios.post('http://localhost:4005/ethsell', body).then(()=>{alert(`Ethereum x${quantity} successfully sold. net profit: $${Math.floor(value - totalcost)}`)})
  
  
  
  
        })
      })
    })
  
  
  
  }
  sellEthButton = document.querySelector('#sellEthbtn')
  
  sellEthButton.addEventListener('click', sellEthFunction)  
  //=======================PIE CHART====================
  axios.get('http://localhost:4005/pieBit').then((res) => {
    let numberOBit = res.data[0].sum
    axios.get('http://localhost:4005/pieEth').then((res) => {
      let numberOEth = res.data[0].sum
    //getting the money spent for the coin
    
  const pie = document.getElementById("pie")
  console.log(numberOBit, numberOEth)
  let lineChart = new Chart(pie, {
      type: 'pie',
      options: {responsive: false},
      data: {
          labels: ['bitcoin', 'ethereum'],
          datasets: [
              {
                  label: "portfolio",
                  fill: false,
                  data: [numberOEth, numberOBit],
                  borderColor: ['rgb(0, 0, 0)', ],
                  borderWidth: 2,
                  backgroundColor: ['rgb(255,100,62)', 'rgb(0, 255, 250)'],
                  


                  
  
              }
          ]
      }
      
  })
})
})
  //=====================GAINS AND LOSSES DISPLAY========================
axios.get('http://localhost:4005/gains').then((res) => {
  let gains = res.data[0].sum
  axios.get('http://localhost:4005/losses').then((res) => {
  let losses = res.data[0].sum

  //=========gains===========
  const gainsP = document.querySelector('#gains')
  gainsP.textContent = gains
  //======losses=============
  const lossesP = document.querySelector('#losses')
  lossesP.textContent = losses
})
})
  

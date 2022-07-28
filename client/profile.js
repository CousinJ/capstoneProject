
//conprice options
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
  

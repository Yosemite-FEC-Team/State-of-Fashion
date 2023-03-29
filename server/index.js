const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const axios = require('axios');
const config = require('../config.js')


const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../public')));

// app.get('/products/37311/related', (req, res) => {
//   console.log('app.get enpoint test for related for 37315');
//   dataServices.testFunction()
//   .then(result => {
//     console.log('app.get test returning result from dataServices', result.data.length);
//     res.send(result.data);
//   }).catch(err => console.log(err));
  // const options = {
  //   url: `https://app-hrsei-api.herokuapp.com/api/fec2/:${config.CAMPUS_CODE}/products`,
  //   headers: {
  //     'User-Agent': 'request',
  //     'Authorization': `token ${config.TOKEN}`
  //   }
  // }

  // axios(options)
  // .then(result => {
  //   console.log('result from axios call in testFunction', result);
  //   res.send(result.data);
  // })
  // .catch(err => console.log('failed to get results from testFunction', err));
// })


app.get('/products/styles', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/37315/styles', { headers: {'Authorization': `${config.TOKEN}` } })
    .then(data => {
      res.send(data.data);
    })
    .catch(err => {
      console.log(err, 'Error getting products from API');
    })
})

app.get('/products', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/37315', { headers: {'Authorization': `${config.TOKEN}` } })
    .then(data => {
      res.send(data.data);
    })
    .catch(err => {
      console.log(err, 'Error getting products from API');
    })
})

//Lizz, do not modify this endpoint if you decide to use another product, cause Xiao Wen is using this MAY NEED TO REFORMAT CAUSE SHE IS JUST USING THE RATINGS!!!!
app.get('/products/reviews', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/meta', { params: {product_id: '37315' }, headers: {'Authorization': `${config.TOKEN}` } })
    .then(data => {
      res.send(data.data.ratings);
    })
    .catch(err => {
      console.log(err, 'error making call for review metadata');
      res.end();
    })
})

app.get('/products/review', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/', { params: {product_id: '37315', count: 1000 }, headers: {'Authorization': `${config.TOKEN}` } })
    .then(data => {
      res.send(data.data.results);
    })
    .catch(err => {
      console.log(err, 'error making call for reviews');
      res.end();
    })
})

app.listen(config.PORT, function() {
  console.log(`listening on port ${config.PORT}`);
});



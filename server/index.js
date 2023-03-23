const express = require('express');
const path = require('path');
const config = require('../config.js');
const axios = require('axios');
let app = express();

app.use(express.static(path.join(__dirname, '../public/')));
app.use(express.json());


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

app.get('/products/reviews', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/meta', { params: {product_id: '37315' }, headers: {'Authorization': `${config.TOKEN}` } })
    .then(data => {
      res.send(data.data.ratings);
    })
    .catch(err => {
      console.log(err, 'error making call for reviews');
      res.end();
    })
})


app.listen(config.PORT, function() {
  console.log(`listening on port ${config.PORT}`);
});
const express = require('express');
const path = require('path');
const config = require('../config.js');
const axios = require('axios');
let app = express();

app.use(express.static(path.join(__dirname, '../public/')));

app.get('/products/styles', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/37315/styles', { headers: {'Authorization': `${config.TOKEN}` } })
    .then(data => {
     //console.log(data.data);
      res.send(data.data);
    })
    .catch(err => {
      console.log(err, 'Error getting products from API');
    })
})

app.get('/products', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/37315', { headers: {'Authorization': `${config.TOKEN}` } })
    .then(data => {
     console.log(data.data);
      res.send(data.data);
    })
    .catch(err => {
      console.log(err, 'Error getting products from API');
    })
})


let port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
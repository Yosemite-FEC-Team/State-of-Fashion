const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const dataServices = require('../helpers/dataServices.js');
const axios = require('axios');
const config = require('../config.js');
const Promise = require('bluebird');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../public')));

let currentId = 37311;

app.get('/products/related', (req, res) => {
  dataServices.retrieveRelatedProductIds(currentId)
  .then(ids => {
    const cardPromises = [];
    const uniqueIds = [...new Set(ids.data)];
    for (let i = 0; i < uniqueIds.length; i++) {
      cardPromises.push(dataServices.generateProductCardData(uniqueIds[i]));
    }
    return cardPromises;
  })
  .then(cardPromises => {
    return Promise.all(cardPromises);
  })
  .then(cards => {
    // console.log('product cards', cards);
    res.send(cards);
  })
  .catch(err => console.log(err));
})

app.get('/products/styles', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${currentId}/styles`, { headers: {'Authorization': `${config.TOKEN}` } })
    .then(data => {
     //console.log(data.data);
      res.send(data.data);
    })
    .catch(err => {
      console.log(err, 'Error getting products from API');
    })
})

app.get('/products', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${currentId}`, { headers: {'Authorization': `${config.TOKEN}` } })
    .then(data => {
      //console.log(data.data);
      res.send(data.data);
    })
    .catch(err => {
      console.log(err, 'Error getting products from API');
    })
})

app.get('/products/reviews', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/meta', { params: {product_id: currentId }, headers: {'Authorization': `${config.TOKEN}` } })
    .then(data => {
     //console.log(data.data);
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

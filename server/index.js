const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const axios = require('axios');
const Promise = require('bluebird');
const config = require('./config.js');
const dataServices = require('../helpers/dataServices.js');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../public')));

let currentId = 37311;
const outfitIds = ['37311', '37319', '37312', '37313'];

app.post('/products', (req, res) => {
  currentId = req.body.id;
  res.send(currentId);
});

// app.get('/products/related', (req, res) => {
//   const idWithPromises = {};
//   const idWithProductCards = {};
//   dataServices.retrieveRelatedProductIds(currentId)
//   .then(ids => {
//     const cardPromises = [];
//     const uniqueIds = [...new Set(ids.data)];
//     for (let i = 0; i < uniqueIds.length; i++) {
//       cardPromises.push(dataServices.generateProductCardData(uniqueIds[i]));
//     }
//     return cardPromises;
//   })
//   .then(cardPromises => {
//     idWithPromises[currentId] = cardPromises;
//     return idWithPromises;
//   })
//   .then(idWithPromises => {
//     return Promise.all(idWithPromises[currentId]);
//   })
//   .then(productCards => {
//     idWithProductCards[currentId] = productCards;
//     return idWithProductCards;
//   })
//   .then(idWithProductCards => {
//     // console.log('id with product cards', idWithProductCards);
//     res.send(idWithProductCards);
//   })
//   .catch(err => console.log(err));
// })

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
  .then(productCards => {
    return productCards;
  })
  .then(productCards => {
    res.send(productCards);
  })
  .catch(err => console.log(err));
})

app.post('/products/outfit', (req, res) => {
  console.log('req.body in post request', req.body);
  if (!outfitIds.includes(req.body.id)) {
    outfitIds.push(req.body.id);
    console.log('outfit ids after adding one', outfitIds);
    res.send(outfitIds);
  } else {
    console.log('outfit ids after adding a duplicate', outfitIds);
    res.send(outfitIds);
  }
})

app.get('/products/outfits', (req, res) => {
  const cardPromises = [];
  for (let i = 0; i < outfitIds.length; i++) {
    cardPromises.push(dataServices.generateProductCardData(outfitIds[i]));
  }
  return Promise.all(cardPromises)
  .then(productCards => {
    // console.log('productCards from app.get /products/outfits', productCards);
    res.send(productCards);
  })
  .catch(err => console.log(err));
})

app.post('/products/delete-outfit', (req, res) => {
  console.log('request body from delete in server', req.body);
  const indexToDelete = outfitIds.indexOf(req.body.id);
  outfitIds.splice(indexToDelete, 1);
  console.log('after deletion ids', outfitIds);
  res.send(outfitIds);
})

app.get('/products/styles', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${currentId}/styles`, { headers: {'Authorization': `${config.TOKEN}` } })
    .then(data => {
      res.send(data.data);
    })
    .catch(err => {
      console.log(err, 'Error getting products from API');
    })
})

app.get('/products', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${currentId}`, { headers: {'Authorization': `${config.TOKEN}` } })
    .then(data => {
      res.send(data.data);
    })
    .catch(err => {
      console.log(err, 'Error getting products from API');
    })
})

//Lizz, do not modify this endpoint if you decide to use another product, cause Xiao Wen is using this MAY NEED TO REFORMAT CAUSE SHE IS JUST USING THE RATINGS!!!!
app.get('/products/reviews', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/meta', { params: {product_id: currentId }, headers: {'Authorization': `${config.TOKEN}` } })
    .then(data => {
      res.send(data.data.ratings);
    })
    .catch(err => {
      console.log(err, 'error making call for review metadata');
      res.end();
    })
})

//HAVE SARAH CHANGE THIS IS MERGE TO USE CURRENT ID
app.get('/products/review', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/', { params: {product_id: currentId, count: 1000 }, headers: {'Authorization': `${config.TOKEN}` } })
    .then(data => {
      res.send(data.data.results);
    })
    .catch(err => {
      console.log(err, 'error making call for reviews');
      res.end();
    })
})


//HAVE SARAH CHANGE THIS IS MERGE TO USE CURRENT ID
app.get('/products/reviews/meta', (req, res) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/reviews/meta', { params: {product_id: currentId }, headers: {'Authorization': `${config.TOKEN}` } })
    .then(data => {
      res.send(data.data);
    })
    .catch(err => {
      console.log(err, 'error making call for review metadata');
      res.end();
    })
})

app.listen(config.PORT, function() {
  console.log(`listening on port ${config.PORT}`);
});



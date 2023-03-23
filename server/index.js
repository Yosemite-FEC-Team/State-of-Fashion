const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const dataServices = require('../helpers/dataServices.js');
const axios = require('axios');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/products/37311/related', (req, res) => {
  console.log('app.get enpoint test for related for 37315');
  dataServices.testFunction()
  .then(result => {
    console.log('app.get test returning result from dataServices', result.data.length);
    res.send(result.data);
  }).catch(err => console.log(err));
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
})

app.listen(3000, () => console.log(`listening on port 3000`));
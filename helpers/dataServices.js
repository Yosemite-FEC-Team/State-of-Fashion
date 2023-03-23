const axios = require ('axios');
const config = require ('../config.js');

const testFunction = () => {
  const options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/${config.CAMPUS_CODE}/products?count=500`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `${config.TOKEN}`
    }
  }

  return axios(options)
  .then(result => {
    // console.log('result from axios call in testFunction', result.data);
    return result;
  })
  .catch(err => console.log('failed to get results from testFunction', err));
}

module.exports = {
  testFunction
}
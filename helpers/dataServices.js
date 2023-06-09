const config = require('../config.js');
const axios = require('axios');
const Promise = require('bluebird');
const options = { headers: { 'Authorization': `${config.TOKEN}` } };
let urlStart = `https://app-hrsei-api.herokuapp.com/api/fec2/${config.CAMPUS_CODE}`;

const getData = (url) => {
  options.url = url;
  return axios.get(url, options)
    .then(result => {
      return result;
    })
    .catch(err => console.log(err));
};

const retrieveRelatedProductIds = (id) => {
  id = id || 37317;
  let url = `${urlStart}/products/${id}/related`;
  return getData(url);
};

const retrieveProductById = (id) => {
  let url = `${urlStart}/products/${id}`;
  return getData(url);
};

const retrieveProductStylesById = (id) => {
  let url = `${urlStart}/products/${id}/styles`;
  return getData(url);
};

const retrieveProductRatingsById = (id) => {
  let url = `${urlStart}/reviews/meta?product_id=${id}`;
  return getData(url);
};

const calculateStarRatingById = (id) => {
  const roundToValue = (value, toNearest, fixed) => {
    return (Math.ceil(value / toNearest) * toNearest);
  }
  return retrieveProductRatingsById(id)
    .then(result => {
      return result.data.ratings;
    })
    .then(result => {
      let ratingsSum = 0;
      let numberOfRatings = 0;
      if (!Object.keys(result).length) {
        return 'No star ratings yet for this product!';
      }
      for (let key in result) {
        result[key] = parseInt(result[key]);
        ratingsSum += key * result[key];
        numberOfRatings += result[key];
      }
      let averageRating = Math.round((ratingsSum / numberOfRatings + Number.EPSILON) * 100) / 100;
      let roundedToNearestFourth = roundToValue(Number(averageRating), 0.25);
      return roundedToNearestFourth;
    })
    .catch(err => console.log(err));
};

const generateProductCardData = (id) => {
  return Promise.all([
    retrieveProductStylesById(id),
    retrieveProductById(id),
    calculateStarRatingById(id)
  ])
  .then(elements => {
    const productStyles = elements[0].data.results[0];
    const product = elements[1].data;
    const starRating = elements[2];
    const defaultPrice = `$${Math.round(product.default_price)}`;
    const originalPrice = `$${Math.round(productStyles.original_price)}`;
    let salePrice;

    if (productStyles.sale_price) {
      salePrice = `$${Math.round(productStyles.sale_price)}`;
    } else {
      salePrice = null;
    }

    const productCardData = {
      id: product.id,
      styleInfo: {
        styleId: productStyles.style_id,
        styleName: productStyles.name,
        photoUrl: productStyles.photos[0].url
      },
      category: product.category,
      name: product.name,
      defaultPrice: defaultPrice,
      salePrice: salePrice,
      originalPrice: originalPrice,
      starRating: starRating,
      features: product.features
    };
    return productCardData;
  })
  .catch(err => console.log(err));
};

module.exports = {
  retrieveRelatedProductIds,
  generateProductCardData
};
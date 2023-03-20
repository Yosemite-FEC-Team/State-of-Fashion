const mongoose = require('mongoose'); //I will need to create dependencies and install

//Do I need to establish a connection to API in this file?
//I can save data in any way I see fit, but if it doesnt match up with the format of the dat from the API, I will have to create a separate function to "mold" the data into the way I want it.
const reviewSchema = new mongoose.Schema (
  { product_id : Number,
    rating: Number,
    summary: String,
    body: String,
    recommend: Boolean,
    name: String,
    email: String,
    photos: [ ]
    characteristics:
  }
);

const Review = new mongoose.model('Review', reviewSchema);





module.exports = Review;
//export schemas at the end
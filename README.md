# State of Fashion E-commerce Site

> FEC is a Hack Reactor front-end project that simulates the product page of a typical e-commerce webpage. The user can view the product information, taken from a sample API, and interact with the products styles, images, related products, ratings, reviews, and more.

Given a business document and visual design, we worked as a group of three software engineering students to build out this front-end project.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Trello](https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)


## Table of Contents

1. [Site Demo Video](#sitedemovideo)
2. [Team Members](#teammembers)
3. [Project Description](#projectdescription)
4. [Installation Requirements](#requirements)
5. [Future Improvements](#futureimprovements)

## Site Demo Video

[![Thumbnail Image of Site Demo Video](http://img.youtube.com/vi/Bx5o28-Y3EI/0.jpg)](http://www.youtube.com/watch?v=Bx5o28-Y3EI "State of Fashion E-commerce Site Demo")

## Team Members
Group Name: Yosemite

* Xiao Wen Wu - Product Overview Module

![screenshot of Overview module](https://github.com/Yosemite-FEC-Team/fec/blob/main/public/assets/Overview.png "Product Overview")


* Sarah Folk - Related Products Module

![screenshot of Related Products module](https://github.com/Yosemite-FEC-Team/fec/blob/main/public/assets/Related-Products.png "Related Products")


* Lizz Mullowney - Ratings and Reviews Module

![screenshot of Ratings and Reviews module](https://github.com/Yosemite-FEC-Team/fec/blob/main/public/assets/Ratings-and-Reviews.png "Ratings and Reviews")


## Installation Requirements

This project utilizes webpack, babel, React, Express, Axios

From within the root directory:
1. Run the following command in the terminal to install all necessary packages.
```
npm install webpack
npm install
```
2. Compile webpack.
```
npm run react-dev
```
3. Start the server.
```
npm run server-dev
```
4. Create a copy of example.config.js file and name it config.js
5. Add your personal GitHub token
6. Look at the page on localhost:3000

## Future Improvements

Future Enhancements for Product Overview:
* Enhance image gallery using prebuilt carousel frameworks
* Configure CSS to accommodate based on screen size (mobile devices)
* Performance optimization

Future enhancements for Related Products and Your Outfit sections:

* Add "Quick Look" button to each Product Card that brings up a modal with that product's main details
* Automatically add all items in "Your Outfit" to cart (if in stock) with "Add All to Cart" button. This would entail saving specific style, size, and quantity details to the Outfit list so that they can be automatically added (or with "Add to Cart" button on each product card).

Future enhancements for Ratings & Reviews:

* Enhance filtering to include filtering by number of stars
* Make reviews searchable
* Enhance review form using Cloudify for image submission
* Create POST request to API endpoint for review form
* Create PUT requests to indicate helpfulness and to report reviews
* Experiment with dynamic product breakdown factors in the Characteristics component
* Make reviews scrollable

Additional further enhancements:
* Create a dark mode using Tailwind
* User login and signup authentication

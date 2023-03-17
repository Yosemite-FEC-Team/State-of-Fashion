import React from 'react';
const axios = require('axios');

const Gallery = () => {
  // lets make a state for the incoming gallery list
  // Might move this to an overarching components since the styles need this as well
  const [galleryList, setGalleryList] = React.useState([]);

  React.useEffect(() => {
    getGallery();
  }, []);

  let getGallery = () => {
    axios.get('/products/styles')
      .then(data => {
      console.log(data.data.results[1].photos);
      // this has all the styles and the photos for those styles
      setGalleryList(data.data.results[1].photos);
      })
      .catch(err => {
      console.log(err, 'Error getting products from server');
      });
  }

  // Took a long time to get a hang of the sizing of the pictures and making them fit into the contraints of the carousel
  let galleryCarousel = galleryList.map(image => {
    let index = galleryList.indexOf(image);
    let imageID = `slide${index}`;
    let slideNext = `#slide${index + 1}`;
    let slidePrevious = `#slide${index -1}`;
    return (
      <div id={imageID} className="carousel-card card">
        <img className='object-contain w-full h-550' src={image.url}></img>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-1 right-1 top-1/2">
            <a href={slidePrevious} className="btn btn-ghost">❮</a>
            <a href={slideNext} className="btn btn-ghost">❯</a>
          </div>
        </div>)
  })

  let galleryThumbnails = galleryList.map(image => {
    return (<img className='mini-thumbnail object-contain p-1' src={image.thumbnail_url}></img>)
  })

  // ideas:
  // use index of the response data (in array) to determine which picture and format it into the carousel format below
  return (
    <div>
      <div className='mini-thumbnail-flex'>
        {galleryThumbnails}
      </div>
      <div className="carousel-container bg-white">
        {galleryCarousel}
      </div>
    </div>
  )
}

export default Gallery;
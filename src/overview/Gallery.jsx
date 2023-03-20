import React from 'react';
import { StyleContext } from './Overview.jsx'
const axios = require('axios');

const Gallery = () => {
  // lets make a state for the incoming gallery list
  // Might move this to an overarching components since the styles need this as well
  const [galleryList, setGalleryList] = React.useState([]);
  const [mainImage, setMainImage] = React.useState(0);

  const currentStyle = React.useContext(StyleContext);

  // Rerender with the new information every time a different style is clicked
  // Current problem: The mini carousel overlay does not update back to the first picture as default
  React.useEffect(() => {
    getGallery();
  }, [currentStyle]);

  let getGallery = () => {
    axios.get('/products/styles')
      .then(data => {
      console.log(data.data.results[currentStyle].photos);
      // this has all the styles and the photos for those styles
      setGalleryList(data.data.results[currentStyle].photos);
      })
      .catch(err => {
      console.log(err, 'Error getting products from server');
      });
  }

  let handleMiniClick = (index) => {
    setMainImage(index);
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
    let index = galleryList.indexOf(image);
    let ref = `#slide${index}`;
    return (
    <a href={ref}><img onClick={() => {handleMiniClick(index);}} className={index === mainImage ? 'mini-thumbnail object-contain p-1 isSelected' : 'mini-thumbnail object-contain p-1'} src={image.thumbnail_url} ></img>
    </a>)
  })

  // ideas:
  // use index of the response data (in array) to determine which picture and format it into the carousel format below
  return (
    <div>
      <nav className='mini-thumbnail-flex items-center'>
        {galleryThumbnails}
      </nav>
      <div className="carousel-container bg-white">
        {galleryCarousel}
      </div>
    </div>
  )
}

export default Gallery;
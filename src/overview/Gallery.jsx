import React from 'react';
import { StyleContext } from './Overview.jsx';
const axios = require('axios');

const Gallery = () => {
  // lets make a state for the incoming gallery list
  // Might move this to an overarching components since the styles need this as well
  const [galleryList, setGalleryList] = React.useState([]);
  const [mainImage, setMainImage] = React.useState(0);

  const currentStyle = React.useContext(StyleContext);

  // Rerender with the new information every time a different style is clicked
  // Current problem: The mini carousel overlay does not update back to the first picture as default, solved by setting the image index back to 0 on new style pick
  React.useEffect(() => {
    getGallery();
    setMainImage(0);
  }, [currentStyle]);

  React.useEffect(() => {

  });

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


  // Took a long time to get a hang of the sizing of the pictures and making them fit into the contraints of the carousel
  let galleryCarousel = galleryList.map(image => {
    let index = galleryList.indexOf(image);

    const nextSlide = () => {
      setMainImage(index === galleryList.length -1 ? index : index + 1);
    }

    const prevSlide = () => {
      setMainImage(index === 0 ? 0 : index - 1);
    }

    let imageID = `slide${index}`;
    return (
      <div id={imageID} className={ index === mainImage ? 'carousel-card' : 'inactive-card'}>
          <button className="right-arrow btn btn-ghost" onClick={nextSlide}>{mainImage === galleryList.length - 1 ? '' : '❯'}</button>
          <button className="left-arrow btn btn-ghost" onClick={prevSlide}>{mainImage === 0 ? '' : '❮'}</button>
          {index === mainImage && (<img className='object-contain w-full h-550' src={image.url}></img>)}
      </div>)
  })


  let galleryThumbnails = galleryList.map(image => {
    let index = galleryList.indexOf(image);
    let ref = `#slide${index}`;
    return (
    <span><img onClick={() => {handleMiniClick(index);}} className={index === mainImage ? 'mini-thumbnail object-contain p-1 isSelected' : 'mini-thumbnail object-contain p-1'} src={image.thumbnail_url} ></img>
    </span>)
  })

  // ideas:
  // use index of the response data (in array) to determine which picture and format it into the carousel format below
  return (
    <>
      <div className='mini-thumbnail-flex items-center'>
        {galleryThumbnails}
      </div>
      <div className="carousel-container bg-white">
        {galleryCarousel}
      </div>
    </>
  )
}

export default Gallery;
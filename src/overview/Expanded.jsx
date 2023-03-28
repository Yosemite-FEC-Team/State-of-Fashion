import React from 'react';

const Expanded = ({galleryThumbnails, revert, galleryList, mainImage, setMainImage}) => {

  const [position, setPosition] = React.useState('0% 0%');
  const [zoom, setZoom] = React.useState(false);


  const handleMouseEvent = (event) => {
    const {left, top, width, height} = event.target.getBoundingClientRect();
    const x = (event.pageX - left ) / width * 100;
    console.log('working?');
    const y = (event.pageY - top) / height * 100;
    setPosition(`${x}% ${y}%`);
  }

  let expandedCarousel = galleryList.map(image => {
    let index = galleryList.indexOf(image);

    const nextSlide = () => {
      setMainImage(index === galleryList.length -1 ? index : index + 1);
    }

    const prevSlide = () => {
      setMainImage(index === 0 ? 0 : index - 1);
    }

    const handleZoomClick = () => {
      setZoom(!zoom);
    }



    let imageID = `slide${index}`;
    let imageStyle = {backgroundImage: `url(${image.url})`, backgroundSize: '3750px', backgroundPosition: position}
    return (
      <div id={imageID} className={ index === mainImage ? 'expanded-card' : 'inactive-card'}>
          {mainImage !== galleryList.length - 1 ? <button className="right-arrow btn btn-accent" onClick={nextSlide}>❯</button> : ''}
          {mainImage !== 0 ? <button className="left-arrow btn btn-accent" onClick={prevSlide}>❮</button> : ''}
          {index === mainImage && (zoom ? <div className='zoom-window cursor-zoom-out' style={imageStyle} onMouseMove={handleMouseEvent}><img onClick={handleZoomClick} src={image.url}></img></div> : <img className='cursor-zoom-in' onClick={handleZoomClick} src={image.url}></img>)}
      </div>)
  })

  return(
    <div className='expanded-view'>
      <div className='mini-thumbnail-flex2 items-center ml-2'>
        {galleryThumbnails}
      </div>
      <button className='expanded-button btn btn-square btn-outline btn-sm' onClick={revert}>x</button>
      {expandedCarousel}
    </div>
  )
}

export default Expanded;
import React from 'react';

const Expanded = ({revert, galleryList, mainImage, setMainImage}) => {

  let expandedCarousel = galleryList.map(image => {
    let index = galleryList.indexOf(image);

    const nextSlide = () => {
      setMainImage(index === galleryList.length -1 ? index : index + 1);
    }

    const prevSlide = () => {
      setMainImage(index === 0 ? 0 : index - 1);
    }


    let imageID = `slide${index}`;
    return (
      <div id={imageID} className={ index === mainImage ? 'expanded-card' : 'inactive-card'}>
          {mainImage !== galleryList.length ? <button className="right-arrow btn btn-accent" onClick={nextSlide}>❯</button> : ''}
          {mainImage !== 0 ? <button className="left-arrow btn btn-accent" onClick={prevSlide}>❮</button> : ''}
          {index === mainImage && (<img className='expanded-image' src={image.url}></img>)}
      </div>)
  })

  return(
    <div className='expanded-view w-full'>
      <button className='expanded-button btn btn-square btn-outline btn-sm' onClick={revert}>x</button>
      {expandedCarousel}
    </div>
  )
}

export default Expanded;
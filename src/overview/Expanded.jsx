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
          <button className="right-arrow btn btn-ghost" onClick={nextSlide}>{mainImage === galleryList.length - 1 ? '' : '❯'}</button>
          <button className="left-arrow btn btn-ghost" onClick={prevSlide}>{mainImage === 0 ? '' : '❮'}</button>
          {index === mainImage && (<img className='expanded-image' src={image.url}></img>)}
      </div>)
  })

  return(
    <div className='expanded-view'>
      <button className='expanded-button btn btn-square btn-outline btn-sm' onClick={revert}>X</button>
      {expandedCarousel}
    </div>
  )
}

export default Expanded;
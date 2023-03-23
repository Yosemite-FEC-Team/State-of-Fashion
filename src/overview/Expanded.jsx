import React from 'react';

const Expanded = ({revert, galleryList, mainImage, setMainImage}) => {

  const [position, setPosition] = React.useState('0% 0%');


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



    let imageID = `slide${index}`;
    let imageStyle = {backgroundImage: `url(${image.url})`, backgroundSize: '3750px', backgroundPosition: position}
    return (
      <div id={imageID} className={ index === mainImage ? 'expanded-card' : 'inactive-card'}>
          {mainImage !== galleryList.length - 1 ? <button className="right-arrow btn btn-accent" onClick={nextSlide}>❯</button> : ''}
          {mainImage !== 0 ? <button className="left-arrow btn btn-accent" onClick={prevSlide}>❮</button> : ''}
          {index === mainImage && (<div className='zoom-window' style={imageStyle} onMouseMove={handleMouseEvent}><img src={image.url}></img></div>)}
      </div>)
  })

  return(
    <div className='expanded-view'>
      <button className='expanded-button btn btn-square btn-outline btn-sm' onClick={revert}>x</button>
      {expandedCarousel}
    </div>
  )
}

export default Expanded;
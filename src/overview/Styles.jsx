import React from 'react';
import { StyleContext } from './Overview.jsx'
const axios = require('axios');

const Styles = () => {

  const [styles, setStyles] = React.useState([]);

  React.useEffect(() => {
    getGallery();
  }, []);

  const [sizes, setSizes] = React.useState([]);

  const {currentStyle, setCurrentStyle} = React.useContext(StyleContext);


  let getGallery = () => {
    axios.get('/products/styles')
      .then(data => {
      console.log(data.data.results,'For styles');
      // this has all the styles and the photos for those styles
      setStyles(data.data.results);
      // replaced the basic 0 with currentStyle from Overview
      setSizes(Object.values(data.data.results[currentStyle].skus))
      })
      .catch(err => {
      console.log(err, 'Error getting products from server');
      });
  }

  const handleStyleClick = (index) => {
    //console.log(index);
    setCurrentStyle(index);
  }

  let styleList = styles.map(style => {
    let index = styles.indexOf(style);
    return(<img id='style-image' className={currentStyle === index ?  'selectedStyle h-10 w-10 rounded-full' :' h-10 w-10 rounded-full'} onClick={()=> {handleStyleClick(index)}} src={style.photos[0].thumbnail_url}></img>)
  })

  //console.log(sizes);
  let sizeList = sizes.map(size => {
    return (<option>{size.quantity !== 0 ? size.size : ''}</option>)
  })

  return (
    <>
    <p>${styles[currentStyle] && styles[currentStyle].original_price}</p>
    <p className='category mt-10'>Style > {styles[currentStyle] && styles[currentStyle].name}</p>
  <div className='flex flex-row mt-5'>
    {styleList}
  </div>
  <div className='mb-5'>
  <select className='select w-full max-w-xs bg-white mt-5'>
    <option defaultValue>Pick a size</option>
    {sizeList}
  </select>
  <select className='select w-full max-w-xs bg-white mt-5'>
    <option>1</option>
    <option>2</option>
    <option>3</option>
  </select>
</div>
</>)
}

export default Styles;
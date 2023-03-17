import React from 'react';
const axios = require('axios');

const Styles = () => {

  const [styles, setStyles] = React.useState([]);

  React.useEffect(() => {
    getGallery();
  }, []);

  const [style, setStyle] = React.useState({});
  const [sizes, setSizes] = React.useState([]);

  let getGallery = () => {
    axios.get('/products/styles')
      .then(data => {
      console.log(data.data.results,'For styles');
      // this has all the styles and the photos for those styles
      setStyles(data.data.results);
      setStyle(data.data.results[0]);
      setSizes(Object.values(data.data.results[0].skus))
      })
      .catch(err => {
      console.log(err, 'Error getting products from server');
      });
  }

  let styleList = styles.map(style => {
    return(<img id='style-image' className=' h-10 w-10 rounded-full' src={style.photos[0].thumbnail_url}></img>)
  })

  console.log(sizes);
  let sizeList = sizes.map(size => {
    return (<option>{size.quantity !== 0 ? size.size : ''}</option>)
  })

  return (
    <>
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
import React from 'react';
const axios = require('axios');

const Styles = () => {

  const [styles, setStyles] = React.useState([]);

  React.useEffect(() => {
    getGallery();
  }, []);

  let getGallery = () => {
    axios.get('/products/styles')
      .then(data => {
      console.log(data.data.results,'For styles');
      // this has all the styles and the photos for those styles
      setStyles(data.data.results);
      })
      .catch(err => {
      console.log(err, 'Error getting products from server');
      });
  }

  let styleList = styles.map(style => {
    return(<img id='style-image' className=' h-10 w-10 rounded-full' src={style.photos[0].thumbnail_url}></img>)
  })

  return (
  <div className='flex flex-row mt-5'>
    {styleList}
  </div>)
}

export default Styles;
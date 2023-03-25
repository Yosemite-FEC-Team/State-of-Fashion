import React from 'react';
import { StyleContext } from './Overview.jsx';
import Checkout from './Checkout.jsx';
const axios = require('axios');


const Styles = ({ checkout, productDetails }) => {

  const [styles, setStyles] = React.useState([]);
  const [added, setAdded] = React.useState(false);
  const [pickedSize, setPickedSize] = React.useState('Pick a size');
  const [amount, setAmount] = React.useState(1);
  const [noSize, setNoSize] = React.useState(false);

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

  const handleStyleSelectChange = (event) => {
    setPickedSize(event.target.value);
    setNoSize(false);
  }

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  }

  let handleAddToBagClick = (event) => {
    event.preventDefault();
    if (pickedSize !== 'Pick a size') {
      console.log(productDetails);
      let productToAdd = [productDetails.name, pickedSize, styles[currentStyle].name];
      let currentItems = JSON.parse(localStorage.getItem('products')) || {};
      if (currentItems[productToAdd] === undefined) {
        currentItems[productToAdd] = amount;
      } else {
        currentItems[productToAdd]+= amount;
      }
      console.log(currentItems);
      localStorage.setItem('products', JSON.stringify(currentItems));
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
      }, 3000);
    } else {
      setNoSize(true);
    }
  }

  let styleList = styles.map(style => {
    let index = styles.indexOf(style);
    return(<img id='style-image' className={currentStyle === index ?  'selectedStyle h-10 w-10 rounded-full' :' h-10 w-10 rounded-full'} onClick={()=> {handleStyleClick(index)}} src={style.photos[0].thumbnail_url}></img>)
  })

  //console.log(sizes);
  let sizeList = sizes.map(size => {
    return (<option>{size.quantity !== 0 ? size.size : size.size + ' OUT OF STOCK'}</option>)
  })



  return (
    <>
    {checkout && <div>
      <Checkout styles={styles}/>
    </div>}
    <p>${styles[currentStyle] && styles[currentStyle].original_price}</p>
    <p className='category mt-10'>Style > {styles[currentStyle] && styles[currentStyle].name}</p>
  <div className='flex flex-row mt-5 flex-wrap'>
    {styleList}
  </div>
  <div className='mb-5'>
    <div>
      <select className='select w-32 max-w-xs bg-white mt-5' onChange={handleStyleSelectChange}>
        <option defaultValue>Pick a size</option>
        {sizeList}
      </select>
      {noSize && <p className='ml-1 text-sm text-red-600'>Please pick a size!</p>}
    </div>
    <div >
      <select className='select w-40 max-w-xs bg-white mt-5' onChange={handleAmountChange}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
    </div>
  </div>
  <div>
    <button className='btn w-52' onClick={handleAddToBagClick}>Add to Bag</button>
    {added && <p className='text-sm text-red-600'>Added to cart!</p>}
  </div>
</>)
}

export default Styles;
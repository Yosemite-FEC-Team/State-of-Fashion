import React from 'react';
import { StyleContext } from './Overview.jsx';
import Checkout from './Checkout.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
const axios = require('axios');


const Styles = ({ currentId, setCheckout, checkout, productDetails }) => {

  const [styles, setStyles] = React.useState([]);
  const [added, setAdded] = React.useState(false);
  const [pickedSize, setPickedSize] = React.useState('Select size');
  const [amount, setAmount] = React.useState(1);
  const [noSize, setNoSize] = React.useState(false);
  const [stockArr, setStockArr] = React.useState([]);
  // for if the product has no stock at all
  const [noStock, setNoStock] = React.useState(false);
  const {currentStyle, setCurrentStyle} = React.useContext(StyleContext);

  const [sizes, setSizes] = React.useState([]);

  //sizes for initial load, currentStyle for future loads
  React.useEffect(() => {
    allStock();
  }, [currentStyle, sizes]);

  React.useEffect(() => {
    getGallery();
  }, [currentId]);

  React.useEffect(() => {
    quantityList();
  }, [pickedSize]);


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
    setAmount(Number(event.target.value));
  }

  let handleAddToBagClick = (event) => {
    event.preventDefault();
    if (pickedSize !== 'Select size') {
      //console.log(productDetails);
      let price = 0;
      if (styles[currentStyle].sale_price !== null) {
        price = styles[currentStyle].sale_price;
      } else {
        price = styles[currentStyle].original_price;
      }
      let productToAdd = [productDetails.name, pickedSize, styles[currentStyle].name, price, styles[currentStyle].photos[0].thumbnail_url];
      let currentItems = JSON.parse(localStorage.getItem('products')) || {};
      if (currentItems[productToAdd] === undefined) {
        currentItems[productToAdd] = amount;
      } else {
        currentItems[productToAdd]+= amount;
      }
      //console.log(currentItems);
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
    let url = style.photos[0].thumbnail_url || './assets/placeholder.png'
    return(<>{currentStyle === index ? <div><img id='style-image' className='selectedStyle mb-2 h-12 w-12 rounded-full' src={url}></img><span className='absolute z-4 check' ><FontAwesomeIcon icon={faCircleCheck} style={{color: "#daa520",}} /></span></div> : <img id='style-image' className='mb-2 h-12 w-12 rounded-full' onClick={() => {handleStyleClick(index)}} src={url}></img>}</>
    )
  })

  //console.log(sizes);
  let sizeList = sizes.map(size => {
    return (<option>{size.quantity !== 0 ? size.size : size.size + ' OUT OF STOCK'}</option>)
  })

  const quantityList = () => {
    if (sizes.length !== 0) {
      let stock = 0;
      for (let i = 0; i < sizes.length; i++) {
        if (sizes[i].size === pickedSize) {
          stock = Number(sizes[i].quantity);
        }
      }
      if (stock > 15) {
        stock = 15;
      }
      let temp = [];
      for (let i  = 1; i < stock + 1; i++) {
        temp.push(i);
      }
      setStockArr(temp);
    }
  }

  // This is for if the ENTIRE STOCK is out
  const allStock = () => {
    // so it wont lag and say out of stock before sizes updates :)
    if (sizes.length !== 0) {
      let stockValues = Object.values(sizes);
      let totalStock = 0;
      for (let i = 0; i < stockValues.length; i++) {
        totalStock += (stockValues[i].quantity);
      }
      if (totalStock === 0) {
        setNoStock(true);
      } else {
        setNoStock(false);
      }
    }
  }

  let quantitySelector = stockArr.map(quantity => {
    return (<option>{quantity}</option>)
  })


  return (
    <>
    {checkout && <div>
      <Checkout added={added} setCheckout={setCheckout} styles={styles}/>
    </div>}
    {styles[currentStyle] && styles[currentStyle].sale_price === null ? styles[currentStyle] && <p>${styles[currentStyle].original_price}</p> : styles[currentStyle] && <p><span className='line-through'>${styles[currentStyle].original_price}</span><span className='ml-2 text-red-400'>${styles[currentStyle].sale_price}</span></p>}
    <p className='category mt-10'>Style > {styles[currentStyle] && styles[currentStyle].name}</p>
  <div className='grid grid-cols-4 mt-5 items-center flex-wrap'>
    {styleList}
  </div>
  {!noStock ? <div className='mb-5'>
    <div>
      {noSize ? <p className='mt-5 ml-1 text-sm text-red-600'>Please pick a size!</p> : <p className='mt-10'> </p>}
      <select className='select w-32 max-w-xs bg-white pr-2' onChange={handleStyleSelectChange}>
        <option defaultValue>Select size</option>
        {sizeList}
      </select>
    </div>
    <div >
      <select className='select w-40 max-w-xs bg-white mt-5' onChange={handleAmountChange}> { stockArr.length !== 0 ? quantitySelector : <option>-</option>}
      </select>
    </div>
  </div> : <div className='text-red-400 mt-10 mb-10'>OUT OF STOCK</div>}
  <div>
    {added ? <button className='btn w-52'><p className='mr-2'>Added to bag!</p><FontAwesomeIcon icon={faBagShopping} /></button> : <button className='btn w-52' onClick={handleAddToBagClick}>Add to Bag</button>}
  </div>
</>)
}

export default Styles;
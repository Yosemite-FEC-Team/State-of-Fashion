import React from 'react';
import { StyleContext } from './Overview.jsx';
import Checkout from './Checkout.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
const axios = require('axios');


const Styles = ({ setCheckout, checkout, productDetails }) => {

  const [styles, setStyles] = React.useState([]);
  const [added, setAdded] = React.useState(false);
  const [pickedSize, setPickedSize] = React.useState('Pick a size');
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
  }, []);

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
    return(<img id='style-image' className={currentStyle === index ?  'selectedStyle h-12 w-12 rounded-full' :' h-10 w-10 rounded-full'} onClick={()=> {handleStyleClick(index)}} src={style.photos[0].thumbnail_url}></img>
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
        console.log(sizes[i], pickedSize, 'SIZE COMPARE');
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
      <Checkout setCheckout={setCheckout} styles={styles}/>
    </div>}
    <p>${styles[currentStyle] && styles[currentStyle].original_price}</p>
    <p className='category mt-10'>Style > {styles[currentStyle] && styles[currentStyle].name}</p>
  <div className='flex flex-row mt-5 items-center flex-wrap'>
    {styleList}
  </div>
  {!noStock ? <div className='mb-5'>
    <div>
      <select className='select w-32 max-w-xs bg-white mt-5 pr-2' onChange={handleStyleSelectChange}>
        <option defaultValue>Select size</option>
        {sizeList}
      </select>
      {noSize && <p className='ml-1 text-sm text-red-600'>Please pick a size!</p>}
    </div>
    <div >
      <select className='select w-40 max-w-xs bg-white mt-5' onChange={handleAmountChange}> { stockArr.length !== 0 ? quantitySelector : <option>-</option>}
      </select>
    </div>
  </div> : <div className='text-red-400 mt-10 mb-10'>OUT OF STOCK</div>}
  <div>
    <button className='btn w-52' onClick={handleAddToBagClick}>Add to Bag</button>
    {added && <p className='text-sm text-red-600'>Added to bag! <FontAwesomeIcon icon={faBagShopping} /></p>}
  </div>
</>)
}

export default Styles;
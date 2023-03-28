import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';

const Checkout = ({ styles, setCheckout }) => {

  const [bought, setBought] = React.useState(false);

  const handleBuyClick = () => {
    localStorage.clear();
    setBought(true);
  }

  const handleStartShoppingClick = () => {
    setCheckout(false);
  }

  const handleRemoveClick = (item) => {
    let itemObj = JSON.parse(localStorage.getItem('products'));
    console.log(itemObj);
    delete itemObj[`${item.mainName},${item.pickedSize},${item.styleName}`];
    if (Object.keys(itemObj).length === 0) {
      localStorage.clear();
    } else {
      localStorage.setItem('products', JSON.stringify(itemObj));
    }
    checkoutList();
  }

  const checkoutList = () => {
    let cart = JSON.parse(localStorage.getItem('products'));
    if (cart === null) {
      return (!bought && <div className='flex flex-col justify-items-center'><p className='text-center '>No products have been added to cart!</p>
      <button className='btn btn-primary self-center mt-5 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"' onClick={handleStartShoppingClick}>Start shopping!</button></div>)
    } else {
      let cartItems = Object.keys(cart);
      let cartAmounts = Object.values(cart);
      for (let i = 0; i < cartItems.length; i++) {
        cartItems[i] = cartItems[i].split(',');
        cartItems[i].push(cartAmounts[i]);
      }
      // cartItems format [NAME OF ITEM, SIZE, STYLE, AMOUNT]
      let checkoutStyles = {};
      console.log(cartItems, 'ITEMS IN CART');
      let checkoutItems = [];
      for (let key in styles) {
        for (let i = 0; i < cartItems.length; i++) {
          if (cartItems[i].indexOf(styles[key].name) !== -1) {
            checkoutStyles[i] = {};
            checkoutStyles[i].mainName = cartItems[i][0];
            checkoutStyles[i].image = styles[key].photos[0].thumbnail_url;
            checkoutStyles[i].styleName = styles[key].name;
            checkoutStyles[i].price = styles[key].original_price;
            checkoutStyles[i].pickedSize = cartItems[i][1];
            checkoutStyles[i].amount = cartItems[i][3];
            checkoutItems.push(checkoutStyles[i]);
          }
        }
      }
      let total = 0;
      for (let i = 0; i < checkoutItems.length; i++) {
        total+= (checkoutItems[i].amount * checkoutStyles[i].price);
      }
      total = (Math.ceil(100 * total)/100).toFixed(2);
      console.log(checkoutItems, 'CHECKOUT ITEMS');
      let itemList = checkoutItems.map(item => {
        return (<div className='flex'>
          <img className='mt-2 ml-5 bg-gray-200 object-contain w-32 h-32' src={item.image}></img>
          <div className='mt-2 ml-3 text-sm'>
            <p>Product: {item.mainName}</p>
            <p>Style: {item.styleName}</p>
            <p>Size: {item.pickedSize}</p>
            <p>Price: ${item.price}</p>
            <p>Amount: {item.amount}</p>
          </div>
          <button className='btn btn-sm btn-accent bg-green-200 ml-5 mt-5' onClick={() => {
            handleRemoveClick(item)}}>Remove</button>
        </div>)
      })
      return (<><div className='flex flex-col'>{itemList}</div>
      <div className='flex justify-between items-center mt-10 ml-5'>
      <p>Total: ${total} <span className='text-xs'>(Not including tax and shipping fee)</span></p>
     <button className='checkout-button btn btn-sm btn-primary mr-5 text-white' onClick={handleBuyClick}>Checkout</button>
    </div></>);

    }
  }

  return(<div className='checkout-window bg-gray-300 shadow-lg'>
    <h1 className="text-center mt-0 mb-2 bg-white text-3xl font-medium leading-tight text-primary">Your Bag <FontAwesomeIcon icon={faBagShopping} /></h1>
    {checkoutList()}
    {bought && <p className='items-center'>Purchase successful!</p>}
    </div>)
}

export default Checkout;
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';

const Checkout = ({ added, styles, setCheckout }) => {

  const [bought, setBought] = React.useState(false);
  const [checkoutCart, setCheckoutCart] = React.useState([]);
  const [totalCost, setTotalCost] = React.useState(0);
  const [regCart, setRegCart] = React.useState({});

  React.useEffect(() => {
    checkoutList();
  }, [added]);

  const handleBuyClick = () => {
    localStorage.removeItem('products');
    setBought(true);
  }

  const handleStartShoppingClick = () => {
    setCheckout(false);
  }

  const handleRemoveClick = (item) => {
    let itemObj = JSON.parse(localStorage.getItem('products'));
    if (Object.keys(itemObj).length === 1) {
      localStorage.removeItem('products');
    } else {
      delete itemObj[`${item.mainName},${item.pickedSize},${item.styleName},${item.price},${item.image}`];
      localStorage.setItem('products', JSON.stringify(itemObj));
    }
    checkoutList();
  }

  const checkoutList = () => {
    let cart = JSON.parse(localStorage.getItem('products'));
    setRegCart(cart);
    console.log(regCart);
    if (cart !== null && cart !== undefined) {
      let cartItems = Object.keys(cart);
      let cartAmounts = Object.values(cart);
      for (let i = 0; i < cartItems.length; i++) {
        cartItems[i] = cartItems[i].split(',');
        cartItems[i].push(cartAmounts[i]);
      }
      // cartItems format [NAME OF ITEM, SIZE, STYLE, PRICE, PICTURE, AMOUNT]
      let checkoutStyles = {};
      //console.log(cartItems, 'ITEMS IN CART');
      let checkoutItems = [];
      for (let key in styles) {
        for (let i = 0; i < cartItems.length; i++) {
          if (cartItems[i].indexOf(styles[key].name) !== -1) {
            checkoutStyles[i] = {};
            checkoutStyles[i].mainName = cartItems[i][0];
            checkoutStyles[i].image = cartItems[i][4];
            checkoutStyles[i].styleName = cartItems[i][2];
            checkoutStyles[i].price = cartItems[i][3];
            checkoutStyles[i].pickedSize = cartItems[i][1];
            checkoutStyles[i].amount = cartItems[i][5];
            checkoutItems.push(checkoutStyles[i]);
          }
        }
      }
      let total = 0;
      for (let i = 0; i < checkoutItems.length; i++) {
        total+= (checkoutItems[i].amount * checkoutStyles[i].price);
      }
      total = (Math.ceil(100 * total)/100).toFixed(2);
      setTotalCost(total);
      setCheckoutCart(checkoutItems);
      //console.log(checkoutItems, 'CHECKOUT ITEMS');
    }
  }

  let itemList = checkoutCart.map(item => {
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

  return(<div className='checkout-window bg-gray-300 shadow-lg'>
    <h1 className="text-center mt-0 mb-2 bg-white text-3xl font-medium leading-tight text-primary">Your Bag <FontAwesomeIcon icon={faBagShopping} /></h1>
    {!bought && regCart === null && <div className='flex flex-col justify-items-center'><p className='text-center '>No products have been added to cart!</p>
      <button className='btn btn-primary self-center mt-5 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"' onClick={handleStartShoppingClick}>Start shopping!</button></div>}
    {!bought && regCart !== null && <div className='flex flex-col'>{itemList}</div>}
      {!bought && regCart !== null && <div className='flex justify-between items-center mt-10 ml-5'>
      <p>Total: ${totalCost} <span className='text-xs'>(Not including tax and shipping fee)</span></p>
     <button className='checkout-button btn btn-sm btn-primary mr-5 text-white' onClick={handleBuyClick}>Checkout</button>
    </div>}
    {bought && <p className='text-center'>Purchase successful!</p>}
    </div>)
}

export default Checkout;
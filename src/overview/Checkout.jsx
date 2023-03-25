import React from 'react';

const Checkout = ({ styles }) => {

  const checkoutList = () => {
    let cart = JSON.parse(localStorage.getItem('products'));
    console.log(cart, 'CART');
    console.log(styles, 'STYLES');
    if (cart === null) {
      return (<p>No products have been added to cart!</p>)
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
      console.log(checkoutItems, 'CHECKOUT ITEMS');
      let itemList = checkoutItems.map(item => {
        return (<div className='flex'>
          <img className='mt-2 ml-5 bg-white object-contain w-32 h-32' src={item.image}></img>
          <div className='mt-2 ml-3 text-sm'>
            <p>Product: {item.mainName}</p>
            <p>Style: {item.styleName}</p>
            <p>Size: {item.pickedSize}</p>
            <p>Price: ${item.price}</p>
            <p>Amount: {item.amount}</p>
          </div>
          <button className='btn btn-sm btn-accent'>Remove</button>
        </div>)
      })
      return (<div className='flex flex-col'>{itemList}</div>);

    }
  }
  return(<div className='checkout-window shadow-lg'>
    <h1 className="text-center mt-0 mb-2 bg-white text-3xl font-medium leading-tight text-primary">Checkout</h1>
    {checkoutList()}
    <div className='flex justify-between items-center'>
      <p>Total:</p>
     <button className='checkout-button btn btn-sm btn-primary mr-5 text-white'>Checkout</button>
    </div>
    </div>)
}

export default Checkout;
import React, { useState, useEffect } from 'react'

import alanBtn from '@alan-ai/alan-sdk-web';

function App() {
  const [cart, setCart] = useState([])
  const [menuItems, setMenuItems] = useState([])
  useEffect(() => {
    alanBtn({
      key: 'c4c94b27368ed44c21bdb2121769be922e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData) => {
       if(commandData.command === 'getMenu'){
        // console.log(commandData)
        setMenuItems(commandData.data)
       } else if(commandData.command === 'addToCart'){
        // console.log(commandData)
        addToCart(commandData.data)
       }
      }
    });
  }, [])
  

  const addToCart = (menuItem) => {
    setCart((oldCart) => {
      return [...oldCart, menuItem]
    })
  }
  return (
    <div className='app'>
      {menuItems.map(menuItem => (
        <li key={menuItem.name}>
          {menuItem.name} - ${menuItem.price} - {menuItem.category}
          {/* <button onClick={() => addToCart(menuItem)}>Add to cart</button> */}
          </li>
      ))}
      <h2>Cart</h2>
      {cart.map(cartItem => (
        <li key={cartItem.name}>{cartItem.name} - ${cartItem.price} - {cartItem.category}</li>
      ))}
    </div>
  )
}

export default App
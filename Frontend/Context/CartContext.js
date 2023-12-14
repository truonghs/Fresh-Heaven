import {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import Ip from '../constants/ipAddress';
const cartContext = createContext();
const CartProvider = ({children}) => {
  const [cartData, setCartData] = useState({cart: {}, isLoading: true});
  const [fetchCartError, setFetchCartError] = useState(null);

  const FetchCart = async userId => {
    console.log('Fetching cart with userId: ', userId);
    await axios
      .get(`http://${Ip}:3000/getcart/${userId}`)
      .then(response => {
        setCartData({
          cart: response.data,
          isLoading: false,
        });
      })
      .catch(error => {
        setFetchCartError(error);
      })
      .finally(() => {
        console.log('Cart fetched!');
      });
  };

  const data = {
    FetchCart,
    cart: cartData.cart,
    isLoadingCart: cartData.isLoading,
    fetchCartError,
    setCartData,
  };

  return <cartContext.Provider value={data}>{children}</cartContext.Provider>;
};

export {cartContext, CartProvider};

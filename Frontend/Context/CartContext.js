import {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import Ip from '../constants/ipAddress';
const cartContext = createContext();
const CartProvider = ({children}) => {
  const [cartData, setCartData] = useState({
    cart: {},
    totalProduct: 0,
    isLoading: true,
  });
  const [fetchCartError, setFetchCartError] = useState(null);
  const FetchCart = async (userId) => {
    await axios
      .get(`http://${Ip}:3000/api/cart/getcart/${userId}`)
      .then((response) => {
        console.log('Cart fetched successfully!');
        var total = 0;

        response.data.products.forEach((item) => {
          total = total + parseInt(item.quantity);
        });
        console.log("total cart là:", total)
        setCartData({
          cart: response.data,
          totalProduct: total,
          isLoading: false,
        });
      })
      .catch((error) => {
        setFetchCartError(error);
        console.log('Cart fetched with error!!!!! ');
      })
      .finally(() => {});
  };
  const data = {
    FetchCart,
    cartData: cartData,
    fetchCartError,
    setCartData,
  };
  return <cartContext.Provider value={data}>{children}</cartContext.Provider>;
};

export {cartContext, CartProvider};

import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartReducer, {setCartState} from './redux/CartReducer';
const dispatchAction = (action, payload) => {
  store.dispatch(action(payload));
};

AsyncStorage.getItem('Cart')
  .then(item => {
    dispatchAction(setCartState, JSON.parse(item));
  })
  .catch(error => {
    console.error('error: ', error);
  });

const store = configureStore({
  reducer: {
    cart: CartReducer,
  },
});

export default store;

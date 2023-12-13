import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
const saveCart = value => {
  AsyncStorage.setItem('Cart', value)
    .then(() => {
      console.log('add success: ', value);
    })
    .catch(error => {
      console.error('error: ', error);
    });
};
export const CartSlice = createSlice({
  name: 'cart',
  initialState: {total: 0, cart: []},
  reducers: {
    setCartState: (state, action) => {
      console.log('setState: ', action.payload.cart);
      state.cart = action.payload.cart;
      state.total = action.payload.total;
    },
    addToCart: (state, action) => {
      const itemPresent = state.cart.find(
        item => item._id === action.payload._id,
      );
      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.cart.push({...action.payload, quantity: 1});
      }
      state.total++;
      saveCart(JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const removeItem = state.cart.filter(
        item => item._id !== action.payload._id,
      );
      state.total = state.total - action.payload.quantity;
      state.cart = removeItem;
    },
    incementQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        item => item._id === action.payload._id,
      );
      itemPresent.quantity++;
      state.total++;
      saveCart(JSON.stringify(state));
    },
    decrementQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        item => item._id === action.payload._id,
      );
      if (itemPresent.quantity === 1) {
        itemPresent.quantity = 0;
        const removeItem = state.cart.filter(
          item => item._id !== action.payload._id,
        );
        state.cart = removeItem;
      } else {
        itemPresent.quantity--;
      }
      state.total--;
      saveCart(JSON.stringify(state));
    },
    cleanCart: state => {
      state.cart = [];
      state.total = 0;
      saveCart(JSON.stringify(state));
    },
  },
});
export const {
  setCartState,
  addToCart,
  removeFromCart,
  incementQuantity,
  decrementQuantity,
  cleanCart,
} = CartSlice.actions;

export default CartSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [
    /* 
    {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    }
    */
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      //payload = newItem / object
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = itemID / int
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // payload = itemId / int

      // finds the pizza first where pizzaId matches
      // item = pointer / reference to the pizza item on the cart
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.totalPrice = item.quantity * item.totalPrice;
      item.quantity++;
    },
    decreaseItemQuantity(state, action) {
      // payload = itemId / int

      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.totalPrice = item.quantity * item.totalPrice;
      item.quantity--;

      // calling other reducers, we just pass in the same shit
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// these functions returns a function because useSelector arguments must be a function

// using derived state para makatipid and shit
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
// breakdown of this shit, so the reduce method takes in a callback function
// sum = accumulator value, item = current element of the cart array
// for each iteration it will  => sum + item.quantity, 0) add the item quantity to the sum, which initial value is 0

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCart = (state) => state.cart.cart;

// get the id first then derives a state
// This function attempts to find an item in the cart array with a matching pizzaId.
// If found, it returns the quantity of that item. if not found or the quantity is undefined, it returns 0.
export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

// alt
// export function getCurrentQuantityById(id) {
//   return function (state) {
//     return state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
//   };
// }

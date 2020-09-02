import React, { createContext, useReducer } from 'react';

const productsIds = localStorage.getItem('cartItems');

const initialState = productsIds ? JSON.parse(productsIds) : [];
const store = createContext(initialState);
const { Provider } = store;

const cartActions = {
  ADD(payload) {
    return { type: 'add product', payload };
  },
  REMOVE(payload) {
    return { type: 'remove product', payload };
  },
  CLEARALL() {
    return { type: 'clear' };
  },
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case cartActions.ADD().type:
        if (state.some((item) => item === action.payload)) return state;

        const stateWithNewProduct = [...state, action.payload];

        localStorage.setItem('cartItems', JSON.stringify(stateWithNewProduct));

        return stateWithNewProduct;

      case cartActions.REMOVE().type:
        const stateWithoutRemovedProduct = state.filter(
          (item) => item !== action.payload
        );

        localStorage.setItem(
          'cartItems',
          JSON.stringify(stateWithoutRemovedProduct)
        );

        return stateWithoutRemovedProduct;

      case cartActions.CLEARALL().type:
        localStorage.removeItem('cartItems');

        return [];

      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, CartProvider, cartActions };

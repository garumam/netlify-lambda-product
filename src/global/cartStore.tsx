import React, { createContext, useReducer } from 'react';

const productsIds = localStorage.getItem('cartItems');

interface DispatchFormat extends Object {
  type: string;
  payload?: string;
}

interface MyContext {
  state: string[];
  dispatch?: React.Dispatch<DispatchFormat>;
}

const initialState = productsIds ? JSON.parse(productsIds) : [];

const store = createContext<MyContext>({ state: initialState });
const { Provider } = store;

const cartActions = {
  ADD(payload: DispatchFormat['payload']) {
    return { type: 'add product', payload };
  },
  REMOVE(payload: DispatchFormat['payload']) {
    return { type: 'remove product', payload };
  },
  CLEARALL() {
    return { type: 'clear' };
  },
};

const CartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer<
    (state: string[], action: DispatchFormat) => string[]
  >((state, action) => {
    switch (action.type) {
      case cartActions.ADD('').type:
        if (state.some((item) => item === action.payload)) return state;

        const stateWithNewProduct = [...state, action.payload];

        localStorage.setItem('cartItems', JSON.stringify(stateWithNewProduct));

        return stateWithNewProduct;

      case cartActions.REMOVE('').type:
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

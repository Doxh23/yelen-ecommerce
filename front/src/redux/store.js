import { configureStore } from "@reduxjs/toolkit";
import {productSlice,productDetailSlice,cart} from './products'


export const store = configureStore({
    reducer: {
      products: productSlice.reducer,
      ProductDetails: productDetailSlice.reducer,
      cart: cart.reducer

    },
  });
  
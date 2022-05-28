import {  createSlice } from "@reduxjs/toolkit";
 export const productSlice = createSlice({
  name: "Products",
  initialState: [],
  reducers: {
   productRequest: (state,action)=>{
    return {
      loading:true,
      product: []
    }
   },
    productSuccess: (state, action) => {
      return {
        loading:false,
        products: action.payload.products,
        productsCount: action.payload.products.count()
      }
    },
    productFail: (state,action)=>{
      return {
        loading: false,
        error: action.payload
      }
    },
    ClearError: (state,action)=>{
      return {
        ...state,
        error: null
      }
    }
  },
});

export const {productRequest,productFail,productSuccess,ClearError} = todoSlice.actions
export {productSlice}


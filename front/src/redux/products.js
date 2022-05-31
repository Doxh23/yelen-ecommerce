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
        products: action.payload.result,
      }
    },
    productFail: (state,action)=>{
      return {
        loading: false,
        error: action.payload
      }
    },
    clearError: (state,action)=>{
      return {
        ...state,
        error: null
      }
    }
  },
});
export const productDetailSlice = createSlice({
  name: "ProductDetails",
  initialState: [],
  reducers: {
   productDetailsRequest: (state,action)=>{
    return {
      loading:true,
      product: []
    }
   },
    productDetailsSuccess: (state, action) => {
      return {
        loading:false,
        products: action.payload.product,
      }
    },
    productDetailsFail: (state,action)=>{
      return {
        loading: false,
        error: action.payload
      }
    },
    clearDetailsError: (state,action)=>{
      return {
        ...state,
        error: null
      }
    }
  },
});

export const {productRequest,productFail,productSuccess,clearError} = productSlice.actions
export const {productDetailsFail,productDetailsRequest,productDetailsSuccess} = productDetailSlice.actions




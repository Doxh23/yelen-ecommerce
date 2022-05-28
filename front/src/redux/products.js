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

export const {productRequest,productFail,productSuccess,clearError} = productSlice.actions


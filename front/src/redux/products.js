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

// export const panier = createSlice({
//   name: "Panier",
//   initialState: {cartItem: []},
//   reducers: {
//     addToCart: (state, action) => {
//       let item = action.payload

//       let isItemExist = state.cartItem.find((i)=>{
//         i.product === item.product
//       })
//       if(isItemExist){
//         return {
//           ...state, 
//           carItem: state.cartItem.map((i)=>{
//             i.product === item.payload? item : i
//           }),
//         }
//       }else{
//         return {
//           ...state,
//           cartItem
//         }
//       }
      
//     },
//     removeToCard: (state, action) => {
//       return {
//         cartItem: state.filter((i)=> i.product !== action.payload)
//       }
//     },
//   }
// });

// export const {addToPanier,removeToCard} = panier.actions
export const {productRequest,productFail,productSuccess,clearError} = productSlice.actions
export const {productDetailsFail,productDetailsRequest,productDetailsSuccess} = productDetailSlice.actions




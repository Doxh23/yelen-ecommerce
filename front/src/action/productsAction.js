import axios from "axios";
import {
  productFail,
  productRequest,
  productSuccess,
  clearError,
  productDetailsSuccess,
  productDetailsFail,
  addToCart,
} from "../redux/products";

export const addCart = (product, number) => async (dispatch) => {
  try {
    let newProduct ={...product}
    newProduct.quantity = number
    dispatch(addToCart(newProduct));
  } catch (err) {
    console.log(err);
  }
};

export const getProductsFilter =
  (word = "", page = 1, price = null, categorie = "") =>
  async (dispatch) => {
    let fetching = async () => {
      try {
        let api = `/api/v1/products?${
          Object.keys(categorie).length === 0 ? "" : "category=" + categorie
        }&page=${page}${
          Object.keys(price).length === 0
            ? ""
            : "&numericFilter=price" + price.filter + price.price
        }`;
        let data = await axios
          .get(api)
          .then((res) => dispatch(productSuccess(res.data)));
      } catch (error) {
        dispatch(productFail(error));
      }
    };
    fetching();
  };
export const getProducts = () => async (dispatch) => {
  let fetching = async () => {
    try {
      let api = `/api/v1/products`;
      let data = await axios
        .get(api)
        .then((res) => dispatch(productSuccess(res.data)));
    } catch (error) {
      dispatch(productFail(error));
    }
  };
  fetching();
};
export const getProductsSearch = (word) => async (dispatch) => {
  let fetching = async () => {
    try {
      let data = await axios
        .get(`/api/v1/products?category=${word}`)
        .then((res) => dispatch(productSuccess(res.data)));
    } catch (error) {
      dispatch(productFail(error));
    }
  };
  fetching();
};
export const getProductDetails = (id) => async (dispatch) => {
  let fetching = async () => {
    try {
      let data = await axios
        .get(`/api/v1/product/${id}`)
        .then((res) => dispatch(productDetailsSuccess(res.data)));
    } catch (error) {
      dispatch(productDetailsFail(error));
    }
  };
  fetching();
};
export const ClearError = () => async (dispatch) => {
  dispatch(clearError());
};

import axios from "axios";
import {
  productFail,
  productRequest,
  productSuccess,
  clearError,
  productDetailsSuccess,
  productDetailsFail,
} from "../redux/products";

export const addToCart = (id) => async (dispatch) => {
  let fetching = async () => {
    try {
      let data = await axios
        .get("/api/v1/products")
        .then((res) => dispatch(res.data));
    } catch (error) {
      dispatch(productFail(error));
    }
    fetching();
  };
};

export const getProducts = (word = "",page = 1) => async (dispatch) => {
  let fetching = async () => {
    try {
      let data = await axios
        .get(`/api/v1/products?category=${word}&page=${page}`)
        .then((res) => dispatch(productSuccess(res.data))
          );
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

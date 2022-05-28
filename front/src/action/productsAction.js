import axios from "axios";
import { productFail, productRequest, productSuccess } from "../redux/products";

export const getProduct = () => async (dispatch) => {
  try {
    dispatch(productRequest());
    const { data } = axios.get("/api/v1/products");
    dispatch(productSuccess(data));
  } catch {
    dispatch(productFail());
  }
};

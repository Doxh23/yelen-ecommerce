import axios from "axios";
import { productFail, productRequest, productSuccess,clearError } from "../redux/products";

export const getProduct = () => async (dispatch) => {
    const fetching = async () => {
        try {
          let data = await axios
            .get("/api/v1/products")
            .then((res) => dispatch(productSuccess(res.data)));
        } catch (error) {
          dispatch(productFail(error));
        }
      };
      fetching()
};
export const ClearError = ()=> async(dispatch)=>{
    dispatch(clearError())
}
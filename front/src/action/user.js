import axios from "axios";
import { logged } from "../redux/user";
export const checkLogin =  () => async(dispatch) => {
  try {
    const data = await axios
      .get("/api/v1/user/checkUser")
      .then(res => dispatch(logged(res.data))
      )
  } catch (err) {
      dispatch(logged())
  }
};

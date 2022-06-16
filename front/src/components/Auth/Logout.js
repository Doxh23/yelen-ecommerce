import React from "react";
import axios from "axios";
const Logout = () => {
  React.useEffect(() => {
  const  Logout = async() =>(axios.post("/api/v1/user/logout").then((res) => res.data));
  Logout()
  window.location = "/"
  }, []);
  return null;
};
export default Logout;

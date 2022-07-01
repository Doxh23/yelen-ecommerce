import React,{useEffect} from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const Logout = () => {
  useEffect(() => {
  const  Logout = async() =>(axios.post("/api/v1/user/logout").then((res) =>  window.location = "/signIn"));
  Logout()
  }, []);
  return null;
};
export default Logout;

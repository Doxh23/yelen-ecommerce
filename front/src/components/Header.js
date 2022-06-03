import React, { useEffect,useState } from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../logo.png";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../action/productsAction";
import axios from "axios";
import {
  productFail,
  productRequest,
  productSuccess,
  clearError,
} from "../redux/products";
export default function Header() {
  console.log(document.cookie.jwt)
  return (
    <>
      <div className="header">
        <NavLink to="/"> home</NavLink>
        <NavLink to="/Product"> product</NavLink>
        <NavLink to="/Contact"> contact</NavLink>
        <NavLink to="/About"> about</NavLink>
        
        {document.cookie.jwt? ( <NavLink to="/logout"> logout</NavLink> ) 
: (  <NavLink to="/signIn"> SignIn</NavLink>)}

      </div>
    </>
  );
}

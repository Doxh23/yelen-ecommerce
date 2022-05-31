import React, { useEffect } from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../logo.png";
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
 
  return (
    <>
      <div className="header">
        <NavLink to="/"> home</NavLink>
        <NavLink to="/Product"> product</NavLink>
        <NavLink to="/Contact"> contact</NavLink>
        <NavLink to="/About"> about</NavLink>
      </div>
    </>
  );
}

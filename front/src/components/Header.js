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
  const [category, setcategory] = useState("")
  const [state, setstate] = useState()
  
  const search = (e) =>{
    e.preventDefault()
    window.location = `/products/${category}`
  }
  console.log(category)
  const handleChange = (e) =>{
      let value = e.target.value
      setcategory(value)
  }
  return (
    <>
      <div className="header">
        <NavLink to="/"> home</NavLink>
        <NavLink to="/Products"> product</NavLink>
        <NavLink to="/Contact"> contact</NavLink>
        <NavLink to="/About"> about</NavLink>
        
        {document.cookie.jwt? ( <NavLink to="/logout"> logout</NavLink> ) 
: (  <NavLink to="/signIn"> SignIn</NavLink>)}
    <form  onSubmit={search} >
      <input type="text" value={category} placeholder="choose a category" onChange={handleChange} name="category" id="" />
    </form>
      </div>
    </>
  );
}

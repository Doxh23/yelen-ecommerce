import React, { useEffect,useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../action/user";

export default function Header() {
  const test = useSelector(state => console.log(state))
  const [category, setcategory] = useState("")
  const search = (e) =>{
    e.preventDefault()
    window.location = `/products/${category}`
  }
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

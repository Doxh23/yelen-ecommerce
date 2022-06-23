import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../action/user";

export default function Header() {
  const logged = useSelector((state) => state.logged)
  const [category, setcategory] = useState("")
  console.log(logged)
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
        <NavLink className="navbar" to="/"> home</NavLink>
        <NavLink className="navbar" to="/Products"> product</NavLink>
        <NavLink className="navbar" to="/Contact"> contact</NavLink>
        <NavLink className="navbar" to="/About"> about</NavLink>
        
        {logged? (<> 
        <div className="profile">
        <NavLink className="navbar Profile-trigger" to="/Profile"> Me</NavLink>
          <div className="navbar-profile-box">
          <NavLink className="profile-navbar" to="/profile/orders"> My commands</NavLink>
          <NavLink className="profile-navbar" to="/profile/informations"> my Information</NavLink>
          <NavLink className="profile-navbar" to="/logout"> Disconnect</NavLink>

          </div>
        </div>
        <NavLink className="navbar" to="/logout"> logout</NavLink>
        </>
         ) 
: ( <><NavLink className="navbar" to="/signIn"> SignIn</NavLink>
    </> 
)}
    <form  onSubmit={search} >
      <input type="text" value={category} placeholder="choose a category" onChange={handleChange} name="category" id="" />
    </form>
      </div>
    </>
  );
}

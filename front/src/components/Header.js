import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from '../logo.png'
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Header() {
  const task = useSelector((state)=>{console.log(state.todo)})

  return (
    <>
    <div className="header">
     <NavLink  to="/"> home</NavLink>
     <NavLink to="/Product"> product</NavLink>
     <NavLink to="/Contact"> contact</NavLink>
     <NavLink to="/About"> about</NavLink>
     </div>
    </>
  );
}

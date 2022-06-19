import React from 'react'
import { NavLink, useLocation } from "react-router-dom";


 const Profile = () => {
  return (
    <>
    <div className='profile-sidebar'>
      <NavLink to="/profile" className="navigation"></NavLink>
      <NavLink to="/profile"  className="navigation"></NavLink>
      <NavLink to="/profile"  className="navigation"></NavLink>
      <NavLink to="/profile"  className="navigation"></NavLink>
      <NavLink to="/profile"  className="navigation"></NavLink>
      <NavLink to="/profile"  className="navigation"></NavLink>
    </div>
    <div className='information'></div>
    </>
  )
}
export default Profile

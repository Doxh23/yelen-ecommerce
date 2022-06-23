import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
const Information = () => {
  const {user} = useSelector((state)=> state.logged)
  console.log(user)
  return (
    <>
    <div className='username'>{user.username}</div>
    <div className='email'>{user.email}</div>
    <div className="role">{user.role}</div>
    <div className='password'>
      <label htmlFor="changePassword"> want to change password ?</label>
    <NavLink name="ChangePassword" to="/changePassword"> click Here</NavLink>
    </div>
    </>
  )
}

export default Information

import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children,isAdmin,...rest}) => {
    const {success,user} = useSelector((state)=> state.logged)
    console.log(success)
    if (typeof success !== "undefined" ){
    if(!success){
      return <Navigate to="/SignIn" />
    }
    else if (isAdmin === true && user.role !== "admin"){
      return <Navigate to="/SignIn" />
    }
    return children
  }
}

export default ProtectedRoute
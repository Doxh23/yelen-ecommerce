import React, { useEffect, useState ,SetStateAction } from "react";
import Header from "./components/Header";
import { Routes, Route, useLocation } from "react-router-dom";
import About from "./components/About";
import Logout from './components/Auth/Logout'
import Contact from "./components/Contact";
import Products from './components/product/products'
import Home from "./components/Home/Home";
import SignIn from './components/Auth/SignIn'
import ProductDetails from './components/product/Product'
import WebFont from 'webfontloader'
import Profile from './components/profile/Profile'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {checkLogin} from "./action/user"
function App() {
  const dispatch = useDispatch();
  const location = useLocation()
  useEffect(() => {
    dispatch(checkLogin())

  }, [location])
  useEffect(()=>{
    WebFont.load({

      google:{
        families:["roboto","Droid Sans","Chilanka"]
      }
    })
  },[])
  return (
    <>
      <Header />
      <Routes>
      <Route  path="/product/:id" element={<ProductDetails/>} />
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Products/:category" element={<Products />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />


      </Routes>
    </>

  );
}

export default App;

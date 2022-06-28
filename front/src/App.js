import React, { useEffect } from "react";
import Header from "./components/Header";
import {
  Routes,
  Route,
} from "react-router-dom";
import About from "./components/About";
import Logout from "./components/Auth/Logout";
import Contact from "./components/Contact";
import Products from "./components/product/products";
import Home from "./components/Home/Home";
import SignIn from "./components/Auth/SignIn";
import ProductDetails from "./components/product/Product";
import WebFont from "webfontloader";
import Profile from "./components/profile/Profile";
import { useDispatch} from "react-redux";
import { checkLogin } from "./action/user";
import ProtectedRoute from "./components/Route/ProtectedRoute";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin());
  }, []);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Products/:category" element={<Products />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/logout" element={<Logout />} />
        {/* --------------------------------PrivateRoute---------------------------------------------------*/}


        <Route path="/profile/:information" element={<Profile />} />
        <Route path="/profile/:adress" element={<Profile />} />
        <Route path="/profile/:orders" element={<Profile />} />
        <Route
          path="/profile"
          isAdmin={false}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
         <Route
          path="/profile/:information"
          isAdmin={false}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        /> <Route
        path="/profile/:adress"
        isAdmin={false}
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      /> <Route
      path="/profile/:orders"
      isAdmin={false}
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile/:orders"
      isAdmin={false}
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile/:ChangePassword"
      isAdmin={false}
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />
      </Routes>
    </>
  );
}

export default App;

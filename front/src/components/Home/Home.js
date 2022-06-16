import React, { useEffect,useState } from "react";
import Product from "./products";
import Loader from '../layout/loader/loader'
import { useDispatch, useSelector } from "react-redux";
import { getProducts,ClearError } from "../../action/productsAction";
import {useAlert} from 'react-alert'
export default function Home() {
  const { loading,error, products,productsCount,resultPerPage } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(ClearError())
    }
    dispatch(getProducts());
  }, []);
 
  return (
    <div className="content">
      {!loading ? (
        <React.Fragment>
          <div className="Banner">
            <p>Welcome to Yelen-Ecommerce</p>
            <h1>Find amazing Stuff</h1>
          </div>
          <div className="container">
          {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </React.Fragment>
      ) : <Loader/>}
    </div>
  );
}

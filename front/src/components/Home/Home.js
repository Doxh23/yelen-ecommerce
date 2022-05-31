import React, { useEffect,useState } from "react";
import Product from "./products";
import Loader from '../layout/loader/loader'
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../action/productsAction";

export default function Home() {
  const { loading,error, products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
 
  return (
    <div className="home">
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

import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails,addCart } from "../../action/productsAction";
import { useParams } from "react-router-dom";
import {
  Picture,
  Content,
  DivQuantity,
  ButtonCart,
  ButtonQuantity,
  InputQuantity
} from "./style";
import Carousel from "react-material-ui-carousel";

export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.ProductDetails);
  const test = useSelector((state) => state.cart)
  const [quantity, setquantity] = useState(1);
  const addProduct = (stock) => {
    if(stock > quantity){
    setquantity(quantity + 1);
    }
  };
  const removeProduct = () => {
    if (quantity > 0) {
      setquantity(quantity - 1);
    }
    
  };
  console.log(test)
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, []);
  const addToCart = () =>{
dispatch(addCart(products,quantity))
  }
  return (
    <>
        {!loading
          ? products && (
              <div className="product-content">
                <div className="Products" >
                  <div className="PictureContent">
                    <Carousel height={"400px"}>
                      <Picture src={products.images[0].url} />
                      <Picture src={products.images[0].url} />
                    </Carousel>
                  </div>
                  <Content>
                    <div style={{fontSize: "25px",fontFamily:"fantasy"}}>{products.name}</div>
                    <div className="Id" style={{color:"grey",fontSize:"12px"}}> Product # {products._id}</div>
                    <hr style={{color:"grey"}}/>
                    <div style={{fontSize:"40px"}}>{products.price}€</div>
                    <DivQuantity>
                      <ButtonQuantity onClick={()=> addProduct(products.stock)}>+</ButtonQuantity>
                      <InputQuantity
                        id="quantity"
                        value={quantity}
                        min="1"
                        type="number"
                        name=""
                        readOnly
                        style={{ textAlign: "center" }}
                      />

                      <ButtonQuantity
                        onClick={removeProduct}
                        style={
                          quantity > 0
                            ? { backgroundColor: "tomato  " }
                            : { backgroundColor: "grey" }
                        }
                      >
                        -
                      </ButtonQuantity>
                    </DivQuantity>
                    <ButtonCart onClick={addToCart} ><span>add to cart</span></ButtonCart>
                    <hr style={{color:"grey"}} />
                    <div className="status">
                      Status:{" "}
                      <span
                        style={
                          products.stock > 0 ? {color:"green",fontWeight:600} : {color:"red",fontWeight:600}
                        }
                      >
                        {" "}
                        {products.stock > 0 ? "In stock" : "out of stock"}
                      </span>
                    </div>
                    <div>{products.description}</div>
                  </Content>
                </div>
                <div className="review">
                      
                </div>
              </div>
            )
          : null}
    </>
  );
}

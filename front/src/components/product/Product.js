import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../action/productsAction";
import { useParams } from "react-router-dom";
import {
  Picture,
  PictureContent,
  Products,
  ProductContent,
  Content,
  DivQuantity,
  ButtonCart,
} from "./style";
import Carousel from "react-material-ui-carousel";

export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.ProductDetails);
  const [quantity, setquantity] = useState(1);
  const addProduct = () => {
    setquantity(quantity + 1);
  };
  const removeProduct = () => {
    if (quantity > 0) {
      setquantity(quantity - 1);
    } else {
    }
  };
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, []);
  const handleChange = (e) => {};
  return (
    <>
      <React.Fragment>
        {!loading
          ? products && (
              <ProductContent className="product-content">
                <Products>
                  <PictureContent>
                    <Carousel height={"400px"}>
                      <Picture src={products.images[0].url} />
                      <Picture src={products.images[0].url} />
                    </Carousel>
                  </PictureContent>
                  <Content>
                    <div>{products.name}</div>
                    <div>{products.price}</div>
                    <DivQuantity>
                      <button onClick={addProduct}>+</button>
                      <input
                        id="quantity"
                        value={quantity}
                        min="1"
                        type="number"
                        name=""
                        readOnly
                        style={{ textAlign: "center" }}
                      />

                      <button
                        onClick={removeProduct}
                        style={
                          quantity > 0
                            ? { backgroundColor: "#141414  " }
                            : { backgroundColor: "red" }
                        }
                      >
                        -
                      </button>
                    </DivQuantity>
                    <ButtonCart><div>add to cartgit </div></ButtonCart>
                    <div className="status">
                      Status:{" "}
                      <span
                        className={
                          products.stock > 0 ? "greenColor" : "RedColor"
                        }
                      >
                        {" "}
                        {products.stock > 0 ? "In stock" : "out of stock"}
                      </span>
                    </div>
                    <div>{products.description}</div>
                  </Content>
                </Products>
                <div className="content"></div>
              </ProductContent>
            )
          : null}
      </React.Fragment>
    </>
  );
}

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../action/productsAction";
import { useParams } from "react-router-dom";
import { Picture, PictureContent, Products, ProductContent,Content } from "./style";
import Carousel from "react-material-ui-carousel";

export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.ProductDetails);
  console.log(products);
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, []);
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
                      <div>test</div>
                      <div>test</div>
                      <div>test</div>
                      <div>test</div>

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

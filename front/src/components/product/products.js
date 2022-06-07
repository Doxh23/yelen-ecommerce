import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsFilter, ClearError } from "../../action/productsAction";
import { useParams } from "react-router-dom";
import Products from "../Home/products";
import { useAlert } from "react-alert";
import Loader from "../layout/loader/loader";
import Pagination from "react-js-pagination";
import Typography from "@mui/material/Typography/Typography"
export default function Product() {
  const { loading, error, products, productsCount, resultPerPage } =
    useSelector((state) => state.products);
  const [currentPage, setcurrentPage] = React.useState(1);
  const [submit, setsubmit] = React.useState({ price: "1", filter: ">" });
  const [price, setprice] = React.useState({})
  const [categorie, setcategorie] = React.useState({})
  const categories = [
    "laptop",
    "chemise",
    'test'
  ]
  console.log(productsCount);
  function setcurrentPageNo(e) {
    setcurrentPage(e);
  }
  console.log(currentPage);
  let { category } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const handleChangePrice = (e) =>{
    setsubmit({...submit,[e.target.name]:e.target.value})
  }
const handleSubmit = (e) =>{
  e.preventDefault()
  setprice(submit)
} 
  console.log(categorie)
  React.useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    dispatch(getProductsFilter(category, currentPage, price,categorie));
  }, [dispatch, category, currentPage,price,categorie]);

  return (
    <div className="content">
      {!loading ? (
        <React.Fragment>
          <div className="container">
            {products &&
              products.map((product) => (
                <Products key={product._id} product={product} />
              ))}
          </div>
          <form action="" onSubmit={handleSubmit}>
          <select onChange={handleChangePrice} value=">" name="filter" id="">
            <option value="<">plus petit </option>
            <option value=">">plus grand </option>
            <option value="<=">plus petit ou égale </option>
            <option value=">=">plus grand ou égale </option>
            <option value="=">égale </option>
          </select>
                <input type="text" onChange={handleChangePrice} name="price" id="" />
                </form>
                <Typography>typographie</Typography>
                <ul>
                  {categories.map((el)=>(
                    <li className="category-link" key={el} onClick={()=>setcategorie(el)}>
                     { el}
                    </li>
                  )
                  )}
                </ul>
          {resultPerPage < productsCount && (
            <div className="paginationBox">
              
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setcurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
              
            </div>
          )}
        </React.Fragment>
      ) : (
        <Loader />
      )}
    </div>
  );
}

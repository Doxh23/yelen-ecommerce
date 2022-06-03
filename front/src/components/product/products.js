import React from 'react'
import { useDispatch, useSelector, } from "react-redux";
import { getProducts,ClearError } from "../../action/productsAction";
import {useParams} from 'react-router-dom'
import Products from '../Home/products'
import {useAlert} from 'react-alert'
import Loader from '../layout/loader/loader';
import Pagination from "react-js-pagination"
export default function Product() {
  const { loading,error, products,productsCount,resultPerPage } = useSelector((state) => state.products);
  const [currentPage, setcurrentPage] = React.useState(1)
console.log(productsCount)
 function setcurrentPageNo(e){
    setcurrentPage(e)
  }
  console.log(currentPage)
  let {category} = useParams()
  console.log(category)
  console.log(loading)
 const dispatch = useDispatch();
 const alert = useAlert()
  React.useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(ClearError())
    }
    dispatch(getProducts(category,currentPage));
  }, [dispatch,category,currentPage]);

  return (

    <div className="content">
    {!loading?  (<React.Fragment>
      <div className="container">
      {products &&
        products.map((product) => (
          <Products key={product._id} product={product} />
        ))}
        </div>
        <div className="paginationBox">
        /* <Pagination
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
              /> */
        </div>
        </React.Fragment>):(<Loader/>)}
        </div>
  )
}

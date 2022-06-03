import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getProducts,ClearError } from "../../action/productsAction";
import {useParams} from 'react-router-dom'


export default function Product() {
  const {products,loading,error} = useSelector((state=>state.products))
  console.log(products)
  return (
    <div>Product</div>
  )
}

import React from 'react'
import {Link} from "react-router-dom"
export default function products({product}) {
  return (
    <Link className='ProductCard' to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <span>{product.price}€</span>
    </Link>
  )
}

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'

import Paginate from '../components/Paginate'


import { listProducts } from '../actions/productActions'
import ProductCarousel from '../components/ProductCarousel'
//import axios from 'axios'
// import products from '../products'

const HomeScreen = () => {
    const { keyword } = useParams()
    const { pageNumber } = useParams() || 1

    
  
   // const [products, setProducts] = useState([])
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading,error,products,page,pages} = productList
    
    useEffect(() => {
        // const fetchProducts= async () => { 
        //     const {data}= await axios.get('api/products')
        //     setProducts(data)
        // }
        // fetchProducts()

        dispatch(listProducts(keyword,pageNumber))
        
        
    }, [dispatch,keyword,pageNumber])
   
  return (
      <>
          {!keyword &&<ProductCarousel/>}
          <h1>latest Product</h1>
          {loading ? (<Loader/>)
              : error ? (
                  <Message varirant='danger'>{error}</Message>) :
                  (<>
                      <Row>
              {products?.map(product => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                  </Col>
              ))}
                      </Row>
                  <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}></Paginate>
                  </> ) }
         
          
    </>
  )
}

export default HomeScreen
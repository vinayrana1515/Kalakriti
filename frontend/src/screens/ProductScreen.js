import React,{useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import {useDispatch, useSelector} from'react-redux'
import { Row, Col, Image, ListGroup, Card, Button,Form ,FormControl} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails,createProductReview } from '../actions/productActions'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'
import {PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
// import products from '../products'

const ProductScreen = ({ match }) => {
    const [qty,setQty] =useState(1)
    const [rating,setRating] =useState(0)
    const [comment,setComment] =useState('')
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { error: errorProductReview, success: successProductReview } = productReviewCreate
    
    const history=useNavigate()
    //const params = useParams();
   
    //   const product = products.find((p) => String(p._id) === id);
    
    //   if (!product) return null; // or fallback UI
    // const [product, setProduct] = useState([])
    const { id } = useParams();
    
    useEffect(()=>{
        // async function fetchProduct(){
        //      const {data}= await axios.get('/api/products/'+id)
        //      setProduct(data)
        //  }
        //  fetchProduct()
        if ( successProductReview ) { 
            alert( 'Review Submitted' )
            setRating( 0 )
            setComment( '' )
            dispatch( { 
                type:PRODUCT_CREATE_REVIEW_RESET
            })
        }
        dispatch(listProductDetails(id))

    }, [dispatch,successProductReview])

    const addToCartHandler = () => {
       history(`/cart/${id}?qty=${qty}`)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch( createProductReview( id,
            {
                rating,
                comment
            } ) )
    }

    
      return (
        <>
             
              <Link className='btn btn-light my-3' to='/'>Go Back</Link>
              {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (<>
               <Row>
               <Col md={4}>
                   <Image src={product.image} alt={product.name} fluid />
               </Col>
               <Col md={3}>
                   <listGroup variant='flush'>
                       <ListGroup.Item>
                           <h3>{ product.name}</h3>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           Price: Rs {product.price}
                       </ListGroup.Item>
                       <ListGroup.Item>
                           Description: {product.description}
                       </ListGroup.Item>
                   </listGroup>
               </Col>
               <Col md={3}>
                   <Card>
                       <ListGroup variant='flush'>
                           <ListGroup.Item>
                               <Row>
                                   <Col>
                                       Price:
                                   </Col>
                                   <Col>
                                       <strong>Rs { product.price}</strong></Col>
                               </Row>
                           </ListGroup.Item>
                           <ListGroup.Item>
                               <Row>
                                   <Col>
                                       Status:
                                   </Col>
                                   <Col>
                                        { product.countInStock>0? 'In stock' : 'Out of stock'}</Col>
                               </Row>
                                  </ListGroup.Item>
                                  {product.countInStock > 0 && (
                                      <ListGroup.Item>
                                          <Row>
                                              <Col> Qty</Col>
                                              <Col>
                                                  <Form.Control
                                                      as="select"
                                                      value={qty}
                                                      onChange={(e) =>
                                                      setQty(e.target.value)} >
                                                     { [...Array(product.countInStock).keys()].map((x)=>(
                                                      <option key={x + 1} value={x + 1}>
                                                          {x +1}
                                                      </option>
                                                      ))}
                                                </Form.Control>
                                              </Col>
                                                  
                                              
                                          </Row>
                                      </ListGroup.Item>
                                  )}
                           <ListGroup.Item>
                                      <Button
                                          onClick={addToCartHandler}
                                          className='btn-block'
                                          type='button'
                                          disabled={product.countInStock === 0}>
                                   Add to Cart
                               </Button>
                           </ListGroup.Item>
                       </ListGroup>
                   </Card>
               </Col>
                  </Row>
                  <Row> 
                      <Col md={ 6 }><h2></h2>
                          <h2 >Reviews</h2>
                          { product.reviews.length === 0 && <Message>No Reviews</Message> }
                          <ListGroup className='mb-3' variant='flush'>
                              { product.reviews.map( review => ( 
                                  <ListGroup.Item key={ review._id }>
                                      <strong>{ review.name }</strong>
                                      <Rating value={ review.rating } />
                                      <p>{ review.createdAt.substring( 0, 10 ) }</p>
                                      <p>
                                          {review.comment}
                                      </p>
                                      
                                  </ListGroup.Item>
                              ) ) }
                              <ListGroup.Item>
                                  <h2>Write a Customer Review</h2>
                                  { errorProductReview && <Message variant='danger'>{ errorProductReview }</Message>}
                                  { userInfo ? ( <Form onSubmit={submitHandler}>
                                      <Form.Group className='mb-3'    controlId='rating'>
                                          <Form.Label>Rating</Form.Label>
                                          <Form.Control as='select' value={ rating } onChange={ ( e ) => setRating( e.target.value ) }>
                                              <option value=''>Select...</option>
                                              <option value='1'>1 - Poor</option>
                                              <option value='2'>2 - Fair</option>
                                              <option value='3'>3 - Good</option>
                                              <option value='4'>4 - Very Good</option>
                                              <option value='5'>5 - Excellent</option>
                                          </Form.Control>
                                      </Form.Group>
                                      <Form.Group className='mb-3' controlId='comment'>
                                          <Form.Label>Comment</Form.Label>
                                          <Form.Control as='textarea' row='3' value={comment} onChange={(e)=>setComment(e.target.value)}></Form.Control>
                                          
                                      </Form.Group >
                                      <Button type='submit' variant='primary'>Submit</Button>
                                  </Form> ) :
                                      <Message>Please <Link to='/login'>sign in</Link> to write a review</Message> }
                              </ListGroup.Item>
                          </ListGroup>
                      </Col>
                  </Row>
                  </>
                  
              )}
             

        </>)
}

export default ProductScreen
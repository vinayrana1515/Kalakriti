import React, { useState, useEffect } from 'react'
import { Link, redirect,useLocation, useNavigate } from 'react-router-dom'
import { Form, Button,Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = () => {
    const history = useNavigate()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    
    if (!shippingAddress) { 
        history('/shipping')
    }

    

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    

    const dispatch = useDispatch()

    const submitHandler = (e) => { 
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history('/placeorder')
    }
    
  return (
      <FormContainer>
          <CheckoutSteps step1 step2 step3 />
          <h1>Payment Method</h1>
          <Form onSubmit={submitHandler} >
              <Form.Group className='mb-3' >
                  <Form.Label as='legend'>Select Method</Form.Label>
             
              <Col>
                  <Form.Check type='radio'
                      label='PayPal or Credit Card'
                      id='Paypal'
                      name='paymentMethod'
                      value='PayPal'
                      checked
                      onChange={(e) => setPaymentMethod(e.target.value)}>
                      
                      </Form.Check>
                  </Col>
                  </Form.Group>
              <Button type='submit' variant='primary'>
                  Continue
                  
              </Button>
              
          </Form>
    </FormContainer>
  )
}

export default PaymentScreen
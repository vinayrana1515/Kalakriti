import React,{useState} from 'react'
import { BrowserRouter,Route,Routes, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {LinkContainer } from 'react-router-bootstrap'
import { Form,Button,Navbar,  Container, NavDropdown,Row,Col } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox'

const Header = () => {
  const dispatch = useDispatch()
  const history=useNavigate()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

const [ keyword, setKeyword ] = useState( '' )
   //const history = useNavigate()
    const submitHandler = ( e ) => { 
        e.preventDefault()
     if ( keyword.trim() ) {
        history( `/search/${ keyword }` )
      
         } else { 
            history('/')
         }
    }

  const logoutHandler = () => { 
    dispatch(logout())
  }




  return (
    <header> <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand >Kalakriti</Navbar.Brand>
          </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* <Routes><Route render={ ( { history } ) => <SearchBox history={ history } /> } /></Routes> */}
          

          <Form onSubmit={ submitHandler } inline>
            <Row>
              <Col>
                   <Form.Control 
              type='text'
              name='q'
              onChange={ ( e ) => setKeyword( e.target.value ) }
              placeholder='Search Products...'
              className='mr-sm-2 ml-sm-2'
                >
               
          </Form.Control>
              </Col>
              <Col>
                 <Button type='submit' variant='outline-success' className='p-2'>
              Search
          </Button>
                </Col>
            </Row>
       
          
        
          
    </Form>
  
        
         
          
          <Nav className="ml-auto">
            {/* <> <a href="http://localhost:8501" target="_blank" style={ { color: 'white', margin:"0.75rem 1rem", } }>Model</a></> */}

            <LinkContainer to='/cart'>
              <Nav.Link ><i className='fas fa-shopping-cart'></i>Cart</Nav.Link></LinkContainer>
           
            
            {userInfo ? (
              <NavDropdown title={userInfo.name} if='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item >
                    Profile
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={ logoutHandler} >Logout</NavDropdown.Item>
              </NavDropdown>
              

              ): <LinkContainer to='/login'>
              <Nav.Link ><i className='fas fa-user'></i>Sign in</Nav.Link></LinkContainer> }
            
            { userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' if='adminmenu'>
                <LinkContainer to='/admin/userlist'>
                  <NavDropdown.Item >
                    Users
                  </NavDropdown.Item>
                </LinkContainer>
                 <LinkContainer to='/admin/productlist'>
                  <NavDropdown.Item >
                    Products
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/orderlist'>
                  <NavDropdown.Item >
                    Orders
                  </NavDropdown.Item>
                </LinkContainer>
                </NavDropdown>
               
              
            )}
              
         
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar></header>
  )
}

export default Header
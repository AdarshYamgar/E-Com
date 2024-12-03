import Button from 'react-bootstrap/Button';
import Badge from "react-bootstrap/Badge";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link,useLocation } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React, { useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import AppContext from "../context/AppContext";


function NavScrollExample() {
    const [searchTerm,setSearchTerm]=useState("")
    const localtion=useLocation();
    const {products,filteredData,setFilteredData,cart,setCart,setProfile}=useContext(AppContext)

    const filterbyCategory=(cat)=>{
      console.log("i am inside filterbyCategory",filteredData)
        setFilteredData(products.filter((data)=>data.category.toLowerCase()==cat.toLowerCase()))
  }

    const userRole=JSON.parse(localStorage.getItem("loggedIn"))
    console.log("i am navbar ",userRole)
    const navrole=JSON.parse(localStorage.getItem("user_Login"));
    console.log(navrole )

   

    const handleLoginClick = (e) => {
        e.stopPropagation(); // Stop the dropdown from becoming "active"
        
      };
  
    const navigate=useNavigate();
    const submitHandler=(e)=>{
        console.log(searchTerm)
        e.preventDefault();
        console.log("aaaaa")
        navigate(`/search/${searchTerm}`)
        setSearchTerm("")
    }
 const hideLink=(localtion.pathname === "/profile" || localtion.pathname === "/usedata") || localtion.pathname === "/cart";
    const handleLogout= async()=>{
        Swal.fire({
            title: "Do you really want to logout?",
            text: "Make sure you've saved all your work!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes,logout!" 
        }).then((result)=>{
            if(result.isConfirmed){
            const num=JSON.parse(localStorage.getItem("user_Login"))
            Swal.fire({
                title: "Logged Out!",
                text: "You have been successfully logged out.",
                icon: "success"
              }).then(()=>{
                if(num === "Admin"){
                    console.log("I am Admin logout")
                    localStorage.removeItem("user_Login")
                    localStorage.removeItem("User")
                   navigate("/")
        
                }else{
                    console.log("I am User logout")
                    localStorage.removeItem("user_Login")
                    localStorage.removeItem("User")
                    
                    document.body.style.backgroundColor="white"
                }
                console.log("Handle")
          localStorage.removeItem("loggedIn")
          setCart([])
          setProfile("")

        toast.success("logout successfully ...!",{
            position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        },2000)
       
        navigate("/");
              })
            }
        })
        
        
    }

  return (
    <>
    {
        userRole && (
        
    <Navbar bg="dark" variant="dark" expand="lg" className=" bg-body-dark  py-4 nav sticky-top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/allproduct" className='ml-5' style={{fontSize:"30px"}}>GadgetPulse</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mx-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {/* <Nav.Link as={Link} to="/cart" className='me-3'><ShoppingCartIcon style={{ fontSize: '30px' }} />

            {cart?.items?.length >0 &&(
                        //     <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        //     {cart?.items?.length}
                        //     <span class="visually-hidden">unread messages</span>
                            
                        //   </span>
                        <Badge pill bg="danger" style={{
                            position: 'absolute',
                            top: 25,
                            right: 1090,
                            fontSize: '0.8rem',
                            color:"white"
                          }} >
                            {cart?.items?.length}
                          </Badge>
                        )}
                        
            </Nav.Link> */}
            {/* <Link to="/cart" type="button" className="btn btn-warning btn-sm position-relative mx-5">
                    <span className="material-symbols-outlined" style={{fontSize:"30px"}}>shopping_cart</span>

                    {cart?.items?.length >0 &&(
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {cart?.items?.length}
                            <span class="visually-hidden">unread messages</span>
                          </span>
                        )}
  
</Link> */}
            <Nav.Link as={Link} to="/addproduct" className='fs-5 me-3'>Add Product</Nav.Link>
            <Nav.Link as={Link} to="/allproduct" className='fs-5 me-3'>Product List</Nav.Link>
            {/* <Nav.Link as={Link} to="/login" className='fs-5 me-3'>Login</Nav.Link> */}
  
            <Nav.Link as={Link} to="/allorders" className='fs-5 me-3'>Order Details</Nav.Link>
            <Nav.Link as={Link} to="/allexpense" className='fs-5 me-3'>Expense</Nav.Link>
            <Nav.Link as={Link} to="/profile" className='fs-5 me-3'>Profile</Nav.Link>
            <Nav.Link as={Link} onClick={handleLogout} className='fs-5 me-3'>Logout</Nav.Link>

            {/* {!hideLink && (
            <NavDropdown title="Products" id='navbarScrollingDropdown' className='fs-5 me-3 '>
            <div className="text-center cursor-pointer fs-5 " onClick={()=>setFilteredData(products)} >No Filters</div>
            <div className="text-center cursor-pointer fs-5" onClick={()=>filterbyCategory("mobile")} >Mobiles</div>
                    <div className="text-center cursor-pointer fs-5" onClick={()=>filterbyCategory("laptop")} >Laptops</div>
                    <div className="text-center cursor-pointer fs-5" onClick={()=>filterbyCategory("camera")} >Cameras</div>
                    <div className="text-center cursor-pointer fs-5" onClick={()=>filterbyCategory("headphone")}>Headphones</div>

            </NavDropdown>
            )} */}
            
            {/* <NavDropdown title="Accounts" id="navbarScrollingDropdown" className='fs-5 me-2 col md-2'>
              {!navrole && (
                <>
            <Nav.Link  as={Link} to="/login" className="text-center"><Button variant="warning" className='w-60'>Login</Button>
            <p style={{color:"black", fontSize:"13px"}}>New Customer ? <Link to="/register" style={{textDecoration: "underline", color: "blue"}}>Start Here</Link></p>
            </Nav.Link>
                          <NavDropdown.Divider />
                          </>

              )}
             
              
              <NavDropdown.Item as={Link} to="/profile" className='text-center fw-bold'>
                My Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/usedata" className='text-center fw-bold'>
                My Orders
              </NavDropdown.Item>
              {navrole && (
              <NavDropdown.Item as={Link} onClick={handleLogout} className='text-center fw-bold'>
                   Logout
              </NavDropdown.Item>
              )}
            </NavDropdown> */}
            
          </Nav>
          <Form className="d-flex me-5" onSubmit={submitHandler}>
            <Form.Control
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)} 
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" onClick={submitHandler}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
            )}
            </>
  );
}

export default NavScrollExample;
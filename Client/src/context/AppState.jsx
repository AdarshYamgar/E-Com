
import React, { useEffect, useState } from "react";
import axios from "axios"
import AppContext from "./AppContext";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

function AppState(props){
     const [user,setUser]=useState(null);
     const [Token,setToken]=useState([]);
     const [isAuthenticated,setIsAuthenticated]=useState(false)
     const [isMain,setIsmain]=useState(null);
     const [userlist,setUserlist]=useState([]);
     const [products,setProducts]=useState([]);
     const [currentProduct,setCurrentProduct]=useState(null);
     const [role,setRole]=useState(null);
     const [filteredData,setFilteredData]=useState([])
     const [cart,setCart]=useState([])
     const [reload,setReload]=useState(false)
     const [userAddress,setUserAddress]=useState();
     const [userOrder,setUserOrder]=useState([]);
     const [expData,setExpData]=useState([]);
     const [email,setEmail]=useState()
     const [profile,setProfile]=useState();

     
   const register=async(userData)=>{
    try{
        await axios.post("http://localhost:8080/auth/register",userData);
        toast.success("Registered Successfully ..",{
    //       position: "top-right",
    // autoClose: 2000,
    // hideProgressBar: false,
    // closeOnClick: true,
    // pauseOnHover: true,
    // draggable: true,
    // progress: undefined,
    // theme: "dark",
    // transition: Bounce,
    position:"top-right",
    autoClose:1000,
    hideProgressBar:false,
    closeOnClick:true,
    pauseOnHover:true,
    draggable:true,
    progress:undefined,
    theme:"dark",
    transition:Bounce
        })
        return true;
    }catch(error){
        console.error(error.response.data.message);
        console.log("status code",error.response?.status);
        if(error.response?.status === 400){
            console.log("Email already exist")
            toast.error("Email already exist",{
              position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
            })
            return false;
        }
    }
   }  

   const login = async (email,password) =>{
    try{
        const response=await axios.post("http://localhost:8080/auth/login",{
            email,
            password
        },{
              headers:{
                "Content-Type":"application/json"
              }
        });   
        console.log("Response : ",response);
        setUser(response.data.user);
        userCart();
        //localStorage.setItem("EcomUser",JSON.stringify())
        localStorage.setItem("profile",JSON.stringify(response.data.user))
        setToken(response.data.token)
        setIsAuthenticated(true)
        localStorage.setItem("user_Login",JSON.stringify(response.data.user.role))
        if(response.data.user.role === "Admin"){
            console.log("I am login as a Admin")
            localStorage.setItem("Admin",JSON.stringify(response.data.token));
        }else{
            console.log("I am login as a User")
            localStorage.setItem("User",JSON.stringify(response.data.token))
        }
        
        if(response.status === 200){
          const log=localStorage.setItem("loggedIn",true)
        }
        setRole(localStorage.getItem("user_Login"))
        console.log("outside toast success")
        toast.success("User LoggedIn Successfully",{
          position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
        })
        getProducts();
        return true;


    }catch(error){
         console.error("Login failed :",error.response?.data?.message || error.message);
         console.log("status code",error.response?.status);
         toast.error("User not found",{
          position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
        })
         return false;
    }
   }

   const forgotPass=async(email)=>{
       console.log("I am in appstate forgotPass",email)
       try{
        const response=await axios.post("http://localhost:8080/auth/forgot",{
          email
        },{
          headers:{
             "Content-Type":"application/json"
          }

        })
        console.log("Forgot Password response is :",response);
        toast.success("OTP Sent to email",{
          position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
        })


        return true;

       }catch(error){
        console.error("Login failed :",error.response?.data?.message || error.message);
         console.log("status code",error.response?.status);

         if(error.response?.status=== 432){
          toast.error("User not found",{
            position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
          })

         }
         return false;

       }
   }

   const ResetPass=async(otp,email,newPassword)=>{
        console.log("Reset Password data in AppState is",otp,email,newPassword);
        let otp1=Number(otp)
        console.log(typeof(otp))
        try{
          const response=await axios.post("http://localhost:8080/auth/reset",{
            otp,email,newPassword
          },{
            headers:{
              "Content-Type":"application/json"
            }
          })

          toast.success("Password Reset Successfully....",{
            position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
          })
          return true;

        }catch(error){
          console.error("Login failed :",error.response?.data?.message || error.message);
          console.log("status code",error.response?.status);

          if(error.response?.status === 500){
            toast.error("Invalid OTP",{
              position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
            })
          }

          if(error.response?.status ===400){
            toast.error("OTP has expired",{
              position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
            })
          }
          return false;


        }
   }

   const AddProduct=async(product)=>{
     const user=JSON.parse(localStorage.getItem("Admin"));
     console.log(user)
     if(!user){
        console.error("No valid token found,redirecting to login...");
        return;
     }
     try{
      console.log("i am inside try");
       const res=await axios.post("http://localhost:8080/api/product/add",product,{
         headers:{
            "Content-Type":"multipart/form-data",
            Auth:user
         } 
       })
       setProducts([...products,res.data]);
       getProducts();
       console.log(products);
       toast.success("Product Added ....",{
        position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
      })
     }catch(error){
        console.error("Error uploading image :",error);
     }
   }

   const getProducts=async()=>{
      
       try{
        const res=await axios.get("http://localhost:8080/api/product/all",{
          headers:{
            "Content-Type":"application/json",
            Auth:user
          }
        })
        setProducts(res.data);
        setFilteredData(res.data)
        console.log(res.data);
       }catch(error){
         console.error("Error fetching employees:",error.response?.message || error.message);
       }
   }

   const deleteProduct=async(id)=>{
    try{
      Swal.fire({
        title:"Are you sure?",
        text:"You won't be able to revert this!",
        icon:"Warning",
        showCancelButton:true,
        confirmButtonColor:"#3085d6",
        cancelButtonColor:"#d33",
        confirmButtonText:"Yes,delete it!"
      }).then((result)=>{
        if(result.isConfirmed){
          const user=JSON.parse(localStorage.getItem("Admin"));
          axios.delete(`http://localhost:8080/api/product/${id}`,{
            headers:{
              "Content-Type":"application/json",
              Auth:user
            }
          })
          Swal.fire({
            title:"Deleted!",
            text:"Your record has been deleted.",
            icon:"success"
          });
          setProducts(products.filter((prod)=>prod._id !==id));
        }
      })
     
    }catch(error){
      console.log("Error fetching employees:",error.response?.data?.message || error.message);
    }
   }


   const updateProduct=async(id,updateProduct)=>{
    try{
      const user=JSON.parse(localStorage.getItem("Admin"));
      const res=await axios.put(`http://localhost:8080/api/product/${id}`,updateProduct,{
        headers:{
          "Content-Type":"application/json",
          Auth:user
        }
      })
      setProducts(products.map((product)=>(product._id === id ? res.data : product)))
      toast.success("Product updated",{
        position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
      })

    }catch(error){
       console.error("Error fetching product:",error.response?.data?.message || error.message)
    }
   }

   const addToCart=async(productId,title,price,qty,imgSrc)=>{
     const user=JSON.parse(localStorage.getItem("User"))
     if(!user){
      console.error("No valid token found,redirecting to login...");
      return;
     }
     console.log("inside addtocart",productId,title,price,qty,imgSrc)
     try{
      const res=await axios.post("http://localhost:8080/api/cart/add",{productId,title,price,qty,imgSrc},{
        headers:{
          "Content-Type":"application/json",
          Auth:user
        },
        withCredentials:true,
      })
      // setProducts(res.data);
      // setFilteredData(res.data)
      setReload(!reload)
      console.log(res.data);
      toast.success(res.data.message,{
        position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
      })
     }catch(error){
       console.error("Error fetching employees:",error.response?.message || error.message);
       console.log("status code",error.response?.status);
       toast.error("Insufficient Stock ..... !",{
        position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
      })
        
     }
 }

 const userCart=async(productId,title,price,qty,imgSrc)=>{
  const user=JSON.parse(localStorage.getItem("User"))
  if(!user){
   console.error("No valid token found,redirecting to login...");
   return;
  }
  try{
   
   const res=await axios.get("http://localhost:8080/api/cart/user",{
     headers:{
       "Content-Type":"application/json",
       Auth:user
     },
     withCredentials:true,
   })
   // setProducts(res.data);
   // setFilteredData(res.data)
   console.log(res.data.cart);
  await setCart(res.data.cart)
  }catch(error){
    console.error("Error fetching employees:",error.response?.message || error.message);
  }
}

const decreaseQty=async(productId,qty)=>{
  console.log(productId)
  const user=JSON.parse(localStorage.getItem("User"))
  if(!user){
   console.error("No valid token found,redirecting to login...");
   return;
  }
  try{
   const res=await axios.post("http://localhost:8080/api/cart/--qty",{productId,qty},{
     headers:{
       "Content-Type":"application/json",
       Auth:user
     },
     withCredentials:true,
   })
   // setProducts(res.data);
   // setFilteredData(res.data)
   //console.log("decrease qty",res)
   setReload(!reload)
   toast.success(res.data.message,{
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
  }catch(error){
    console.error("Error fetching employees:",error.response?.message || error.message);
  }
}

const removeFromCart=async(productId)=>{
  console.log(productId)
  const user=JSON.parse(localStorage.getItem("User"))
  if(!user){
   console.error("No valid token found,redirecting to login...");
   return;
  }
  try{
   const res=await axios.delete(`http://localhost:8080/api/cart/remove/${productId}`,{
     headers:{
       "Content-Type":"application/json",
       Auth:user
     },
     withCredentials:true,
   })
   // setProducts(res.data);
   // setFilteredData(res.data)
   //console.log("decrease qty",res)
   setReload(!reload)
   toast.success("Remove item from cart",{
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
  }catch(error){
    console.error("Error fetching employees:",error.response?.message || error.message);
  }
}

const ClearCart=async(ddd)=>{
  console.log("ddd is",ddd)
  const user=JSON.parse(localStorage.getItem("User"))
  if(!user){
   console.error("No valid token found,redirecting to login...");
   return;
  }
  try{
    if(ddd){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't clear cart .. ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!"
    }).then(async(result)=>{
      if(result.isConfirmed){
        Swal.fire({
          title: "Deleted!",
      text: "Your cart has been deleted.",
      icon: "success"
        })
        const res=await axios.delete("http://localhost:8080/api/cart/clear",{
          headers:{
            "Content-Type":"application/json",
            Auth:user
          },
          withCredentials:true,
        })
        setReload(!reload)
        if(ddd){
          console.log("ddd is",ddd)
          toast.success("Cart is cleared",{
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
        }
     
      }
      
    })
  }else{
    const res=await axios.delete("http://localhost:8080/api/cart/clear",{
      headers:{
        "Content-Type":"application/json",
        Auth:user
      },
      withCredentials:true,
    })
    setReload(!reload)

  }
  
   // setProducts(res.data);
   // setFilteredData(res.data)
   //console.log("decrease qty",res)
 
  }catch(error){
    console.error("Error fetching employees:",error.response?.message || error.message);
  }
}

const shippingAddress=async(fullName,address,city,state,country,pincode,phoneNumber)=>{
  const user=JSON.parse(localStorage.getItem("User"))
  if(!user){
    console.error("No valid token found,redirecting to the login ...");
    return;
  }
  try{
    const res=await axios.post("http://localhost:8080/api/address/add",
      {fullName,address,city,state,country,pincode,phoneNumber},
      {
      headers:{
        "Content-Type":"Application/json",
        Auth:user
      },
      withCredentials:true
    });
    console.log("inside shipping address")
    setUserAddress(res.data.userAddress)

  }catch(error){
     console.error("Error fetching product :",error.response?.message || error.message)
  }
}


const getAddress=async()=>{
  const user=JSON.parse(localStorage.getItem("User"))
  if(!user){
    console.error("No valid token found, redirecting to the login ...")
    return;
  }
  try{
    const res=await axios.get("http://localhost:8080/api/address/get",{
      headers:{
        "Content-Type":"Application/json",
         Auth:user
      },
       withCredentials:true
    });
    console.log("user address",res.data.userAddress)
    setUserAddress(res.data.userAddress)

  }catch(error){
      console.error("Error fetching employees:",error.response?.message || error.message);
  }
}

const user_Order=async()=>{
  const user=JSON.parse(localStorage.getItem("Admin"))
  if(!user){
    console.error("No valid token found, redirecting to the login ...")
    return;
  }
  try{
    const res=await axios.get("http://localhost:8080/api/payment/allOrders",{
      headers:{
        "Content-Type":"Application/json",
      },
       withCredentials:true
    });
    console.log("user order",res.data)
    //setUserAddress(res.data.userAddress)
    setUserOrder(res.data)

  }catch(error){
      console.error("Error fetching employees:",error.response?.message || error.message);
  }
}

const AllExpense=async()=>{
  const user=JSON.parse(localStorage.getItem("Admin"))
  if(!user){
    console.error("No valid token found,redirecting to the login ...")
    return;
  }
  try{
    const res=await axios.get("http://localhost:8080/api/expense/getExpense",{
      headers:{
        "Content-Type":"Application/json",
      },
       withCredentials:true
    })
    console.log(res.data)
     await setExpData(res.data)

  }catch(error){
    console.error("Error fetching employees:",error.response?.message || error.message);

  }
}

const getProfileDetails=async(req,res)=>{
  const user=JSON.parse(localStorage.getItem("Admin"))
  try{
    const res=await axios.get("http://localhost:8080/auth/profile",{
      headers:{
        "Content-Type":"Application/json",
         Auth:user  
      },
       withCredentials:true
    });
   
    console.log("user profile details is",res.data.user)
    setProfile(res.data.user)


  }catch(error){
    console.error("Error fetching employees:",error.response?.message || error.message);

  }

}

const updateProfileById=async(id,updateProfile)=>{
  try{
    const user=JSON.parse(localStorage.getItem("Admin"));
    console.log("my id is ",id)
    const res=await axios.put(`http://localhost:8080/auth/updateProfile/${id}`,updateProfile,{
      headers:{
        "Content-Type":"application/json",
        Auth:user
      }
    })
    console.log(res.data.user)
    toast.success("Profile updated...",{
      position: "top-right",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
transition: Bounce,
    })

  }catch(error){
     console.error("Error fetching product:",error.response?.data?.message || error.message)
  }
 }



   useEffect(()=>{
    getProducts();
    userCart();
    getAddress();
    user_Order();
    AllExpense();
    getProfileDetails();

   },[reload,user]);

    return(
       <AppContext.Provider value={{
        user,
        userlist, 
        login,
        register,
        isMain,
        setIsmain,
        AddProduct,
        getProducts,
        products,
        deleteProduct,
        currentProduct,
        setCurrentProduct,
        updateProduct,
        role,
        setRole,
        filteredData,
        setFilteredData,
        addToCart,
        cart, 
        decreaseQty,
        removeFromCart,
        shippingAddress,
        ClearCart,
        userAddress,
        userCart,
        userOrder,
        expData,
        setEmail,
        email,
        forgotPass,
        ResetPass,
        updateProfileById,
        getProfileDetails,
        profile
        }}>
        {props.children}
       </AppContext.Provider>
    )
}
export default AppState;
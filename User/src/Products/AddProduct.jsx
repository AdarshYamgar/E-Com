import React, { useContext, useEffect, useState } from "react";   
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"
const AddProduct=()=>{
    const [errors,setErrors]=useState({});
    const [imgSrc,setImgsrc]=useState(null);
    const navigate=useNavigate();
    const {AddProduct,currentProduct,setCurrentProduct,updateProduct}=useContext(AppContext)
    const [ProductData,setProductData]=useState({
        title:"",
        description:"",
        price:"",
        discountPercentage:"",
        discountPrice:"",
        category:"",
        qty:"",
        imgSrc:""
    })

    const {title,description,price,discountPercentage,discountPrice,category,qty}=ProductData;
    console.log("i am outside ",currentProduct);

    const validate=()=>{
        const errors={};
        const re=/^[A-Za-z]+$/;
        const sal=/^\d+$/;
        if(!title.length){
            errors.title="Title is required";
        }

        if(!description){
            errors.description="Description is required";
        }

        if(!price){
            errors.price="Price is required";
        }else if(isNaN(price)){
            errors.price="Price must be valid number";
        }else if(price<=0){
            errors.price="Price must be greater than zero";
        }else if(!sal.test(price)){
            errors.price="Decimal number is not allowed"
        }

        if(!category){
            errors.category="Category field is required";
        }

        if(!qty){
            errors.qty="Quantity is required";
        }else if(isNaN(qty)){
            errors.qty="Quantity must be valid number"
        }else if(qty<=0){
            errors.qty="Quantity must be greater than zero"
        }

        if(discountPercentage>=100){
            errors.discountPercentage="Discount percentage must be less than 100"
        }

        return errors;
    }

    const handleChange=(e)=> setProductData({ ...ProductData,[e.target.name]:e.target.value })
    

    const handleFileChange=(e)=>{
        setProductData({
            ...ProductData,imgSrc:e.target.files[0]
        })
       setImgsrc(e.target.file[0])
    }
    useEffect(()=>{
       if(currentProduct){
        setProductData(currentProduct)
        console.log("imgSrc",currentProduct.imgSrc)
        setImgsrc(currentProduct.imgSrc)
        console.log(currentProduct)
        console.log(imgSrc)
       }
    },[currentProduct])

    // useEffect(()=>{
    //     if(currentProduct){
    //         if(currentProduct.price && currentProduct.discountPercentage >= 0){
    //             const discountPrice=(ProductData.price-(ProductData.price*(ProductData.discountPercentage/100))).toFixed(2);
    //             setCurrentProduct((prevProduct)=>({
    //                ...prevProduct,discountPrice,
    //             }))
    //            }else{
                   
    //            }
    //     }
       

    // },[currentProduct.price,currentProduct.discountPercentage])

    const handleSubmit=(e)=>{
        e.preventDefault();
        
        const validationErrors=validate();
        if(Object.keys(validationErrors).length>0){
            setErrors(validationErrors)
        }else{
            if(currentProduct){
                console.log("I am in add product page",currentProduct)
                Swal.fire({
                    title:"Do you want to save the changes?",
                    showDenyButton:true,
                    showCancelButton:false,
                    confirmButtonText:"Save",
                    denyButtonText:`Don't save`

                }).then((result)=>{
                    if(result.isConfirmed){
                        updateProduct(currentProduct._id,ProductData);
                         //Swal.fire("Saved!","","success");
                         setProductData({title:"",description:"",price:"",category:"",qty:"",image:""});
                         setCurrentProduct(null)
                         console.log(ProductData)
                         navigate("/allproduct")

                    }else if(result.isDenied){
                         setProductData({title:"",description:"",price:"",category:"",qty:"",image:""})
                         setCurrentProduct(null);
                        // Swal.fire("Changes are not saved","","info");
                    }
                    setTimeout(()=>{
                       navigate("/allproduct")
                    },1000)

                })
                
                // console.log("After")
                // setTimeout(()=>{
                //     navigate("/allproduct")
                // },1000)
    
    
            }else{
             console.log( "asfsf",ProductData)
             AddProduct(ProductData)
             setProductData({title:"",description:"",price:"",category:"",qty:"",image:""})
             setCurrentProduct(null);
             setTimeout(()=>{
                navigate("/allproduct")
             })
            }
        }

       
    }
    return(
        <>
        <h1 className="pt-3 text-center">Add Product</h1>
        <div className="form-containerabc">
        <form className="register-formabc" onSubmit={handleSubmit}>
            <div className="mb-3">
            <label className="form-label">Title{errors.title && <span style={{color:"red"}}>*</span>} : </label>
            <input type="text"
                className="form-control"
                name="title"
                value={title}
                onChange={handleChange}
            
            />
            {errors.title && <p style={{color:"red"}}>{errors.title}</p>}
            </div>
            <div className="mb-3">
            <label className="form-label">Description{errors.description && <span style={{color:"red"}}>*</span>} : </label>
            <textarea 
                name="description"
                value={description}
                onChange={handleChange}
                className="form-control"

            />
            {errors.description && <p style={{color:"red"}}>{errors.description}</p>}
            </div>
            <div className="mb-3">
            <label className="form-label">Price{errors.price && <span style={{color:"red"}}>*</span>} : </label>
            <input type="number"
                name="price"
                value={price}
                onChange={handleChange}
                className="form-control"
            />
            {errors.price && <p style={{color:"red"}}>{errors.price}</p>}
            </div> 
            <div className="mb-3">
            <label className="form-label">Discount Percentage{errors.discountPercentage && <span style={{color:"red"}}>*</span>} : </label>
            <input type="number"
                name="discountPercentage"
                value={discountPercentage}
                onChange={handleChange}
                className="form-control"
            />
            {errors.discountPercentage && <p style={{color:"red"}}>{errors.discountPercentage}</p>}
            </div>
            {currentProduct && (
            <div className="mb-3">
            <label className="form-label">Discount Price : </label>
            <input type="number"
                name="discountPrice"
                value={discountPrice}
                onChange={handleChange}
                className="form-control"
                readOnly
            />
            {errors.price && <p style={{color:"red"}}>{errors.price}</p>}
            </div>
            )}
            
            <div className="form-group pt-3 ">
            <label className="form-label">Category{errors.category && <span style={{color:"red"}}>*</span>} : </label>
            {/* <input type="text"
                name="category"
                value={category}
                onChange={handleChange}
                className="form-control"
            /> */}
            <select className="form-select" name="category" value={category} onChange={handleChange}>
               <option value="">Please Select</option>
               <option value="Mobile">Mobile</option>
               <option value="Laptop">Laptop</option>
               <option value="Camera">Camera</option>
               <option value="Headphone">Headphone</option>
            </select>
            {errors.category && <p style={{color:"red"}}>{errors.category}</p>}
            </div>
            <div className="mb-3 mt-3">
            <label className="form-label">Quantity{errors.qty && <span style={{color:"red"}}>*</span>} : </label>
            <input type="number"
                name="qty"
                value={qty}
                onChange={handleChange}
                className="form-control"

            />
            {errors.qty && <p style={{color:"red"}}>{errors.qty}</p>}
            </div>
            <div className="mb-3">
            <label className="form-label">Upload Image : </label>
            <input type="file"
                name="imgSrc"
                onChange={handleFileChange}
                className="form-control"
                
            />
            </div>
            
            <button type="submit" className="m-5 btn btn-dark custom-hover">{currentProduct ? "Update Product" : "Add Product"}</button>
            
            
        </form>
        </div>
        </>
    )
}
export default AddProduct;
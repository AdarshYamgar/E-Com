import React, { useContext,useState,useEffect } from "react";
import AppContext from "../context/AppContext";
import ReactPaginate from "react-paginate";
import Login from "../Auth/Login.jsx"
import LoginDemo from "../Auth/LoginDemo.jsx";
const UserOrders=()=>{
    const {userOrderDtl} =useContext(AppContext);
    const [currentPage,setCurrentPage]=useState(0);
    const [itemsPerPage,setItemsPerPage]=useState(5);
    const [selectedUsername,setSelectedUsername]=useState(" ")
    const productPerPage=5;
    const [profile,setProfile]=useState(null)

    const convertTimestampToDate = (timestamp) => {
      const date = new Date(timestamp); // Create Date object from timestamp
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 because months are 0-based
      const day = date.getDate().toString().padStart(2, '0');
      return `${day}-${month}-${year}`;
    };
    useEffect(()=>{
        const storedUser=localStorage.getItem("loggedIn");
        if(storedUser){
            setProfile(JSON.parse(storedUser))
        }
    },[]);

    const handlePageClick=(event)=>{
      setCurrentPage(event.selected);
    }

    const handleItemsPerPageChange=(event)=>{
       setItemsPerPage(Number(event.target.value));
       setCurrentPage(0);
    }

    const offset=currentPage*itemsPerPage;
    const currentItems=userOrderDtl.slice(offset,offset+itemsPerPage);
    const pageCount=Math.ceil(userOrderDtl.length / itemsPerPage);
    return(
      <div>
        {profile ? (
        <div>
        <>
        <h1 className="mt-4 text-center fw-bold fs-3">User Orders</h1>
        <div className="d-flex">
        <div className="ms-5 mb-4 mt-4">
         <label htmlFor="itemsPerPage" className="pl-5 me-2 fw-bold" >
           Items per page :
         </label>
         <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="form-select"
            style={{width:"auto",display:"inline-block"}}>
         <option value={5}>5</option>
         <option value={10}>10</option>
         <option value={15}>15</option>
         <option value={20}>20</option>
         </select>
        </div>
      
        </div>
        {console.log("user details",userOrderDtl)}
        <div className="container ps-5 pe-5">
          <div className="table-responsive">
        <table className=" table table-bordered " >
  <thead  className="table-warning">
    <tr style={{textAlign:"center"}}>
      <th>userName</th>
    <th>orderId</th>
            <th>amount</th>
            <th>city</th>
            <th>phoneNumber</th>
            <th>Address</th>
            <th>PayStatus</th>
            <th>Order Date</th>
    </tr>
  </thead>
  <tbody>
          


          {currentItems.map((data, index) => (
            <tr key={index} style={{textAlign:"center"}}>
               {/* <td>{index + 1 + currentPage * itemsPerPage}</td> */}
              <td>{data?.userName}</td>
              <td>{data?.orderId}</td>
              <td>{Math.ceil(data?.amount)}</td>
              <td>{data?.userShipping?.city}</td>
              <td>{data?.userShipping?.phoneNumber}</td>
              <td>{data?.userShipping?.address}</td>
              <td>{data?.payStatus}</td>

              <td>{convertTimestampToDate(data?.orderDate)}</td>

             
            </tr>
          ))}
        </tbody>
</table>  
</div>
</div>
<div className="paginate">
    <div className=" d-flex justify-content-end">
         <ReactPaginate   
           previousLabel={"Previous"}
           nextLabel={"Next"}
           breakLabel={"..."}
           pageCount={pageCount}
           marginPagesDisplayed={2}
           pageRangeDisplayed={3}
           onPageChange={handlePageClick}
           containerClassName={"pagination"}
           activeClassName={"active"}
           pageClassName={"page-item"}
           pageLinkClassName={"page-link"}
           previousClassName={"page-item"}
           previousLinkClassName={"page-link"}
           nextClassName={"page-item"}
           nextLinkClassName={"page-link"}
           breakClassName={"page-item"}
           breakLinkClassName={"page-link"}
         />
    </div>
  </div>
        </>
        </div>
        
        
        ):(
          <LoginDemo/>
        )}
        </div>
    )
}
export default UserOrders;  
import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import ReactPaginate from "react-paginate";
const AllOrders=()=>{
    const {userOrder}=useContext(AppContext);
    const [currentPage,setCurrentPage]=useState(0);
    const [itemsPerPage,setItemsPerPage]=useState(5);
    const [selectedUsername,setSelectedUsername]=useState(" ")
    const productPerPage=5;
    // const pageCount=Math.ceil((filteredEmployees.length)/itemsPerPage);
    //console.log(pageCount)

    const usernames=[...new Set(userOrder.map((user)=>user?.userName))]
    console.log(usernames)
    const handleNameChange=(event)=>{
      const name=event.target.value;
      setSelectedName(name);

      if(name){
        const filtered=userOrder.filter((prod)=>prod.name === name);
        setFilteredProd(filtered);
      }else{
        setFilteredProd(userOrder)
      }
    }
    const handlePageClick=(event)=>{
      setCurrentPage(event.selected);
    }

    const handleItemsPerPageChange=(event)=>{
       setItemsPerPage(Number(event.target.value));
       setCurrentPage(0);
    }

    const handleUsernameChange=(e)=>{
      setSelectedUsername(e.target.value);
      setCurrentPage(0)
    }
    const filteredEmployees=selectedUsername ? userOrder.filter((order)=>order?.userName===selectedUsername):userOrder;
     const pageCount=Math.ceil((filteredEmployees.length)/itemsPerPage);

    const offset=(currentPage) * itemsPerPage;
     const currentProducts=filteredEmployees.slice(offset,offset+itemsPerPage);
    //  const pageCount=Math.ceil((filteredEmployees.length)/itemsPerPage);

    // const currentProducts=userOrder.filter((prod)=>{
    //   return selectedName ? userOrder.userName === selectedName : true;
    // })
    // .slice(offset,offset+productPerPage)
    const convertTimestampToDate = (timestamp) => {
      const date = new Date(timestamp); // Create Date object from timestamp
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 because months are 0-based
      const day = date.getDate().toString().padStart(2, '0');
      return `${day}-${month}-${year}`;
    };

    
    console.log("all order details is",userOrder?.length)
    return(                        
        <div>
{userOrder?.length>0 ? (
    <div>
        <>
        <h1 className="text-center pt-1 fs-1 fw-bold">All Orders</h1>
        <div className="container mt-4  ">
        <div className="row align-items-center mb-3">
          <div className="col-md-6 mb-2 mb-md-0">
         <label htmlFor="itemsPerPage" className=" pl-5 me-2 ms-2" style={{fontWeight:"bold"}}>
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
        
        <div className="col-md-6 ps-5 d-flex justify-content-end">
          <label className="pl-5 me-2" style={{fontWeight:"bold"}}>Filter by Username : </label>
          <select value={selectedUsername} onChange={handleUsernameChange} className="form-select"
           style={{width:"auto",display:"inline-block"}}
          >
            <option value="">All</option>
            {usernames.map((data)=>(
              <option key={data}>{data}</option>
            ))}

          </select>
        </div>
        </div>
        </div>
        <div className="container mt-4">
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
          


          {currentProducts.map((data, index) => (
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
    <>
    <h1 className="text-center pt-1 fs-1 fw-bold text-danger">No orders have been placed yet .</h1>
    </>
)}
        </div>
        
    )
}
export default AllOrders;   
import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import ReactPaginate from "react-paginate";
const AllExpense=()=>{
    const {expData}=useContext(AppContext);
    const [currentPage,setCurrentPage]=useState(0);
    const [itemsPerPage,setItemsPerPage]=useState(5);
    // const [selectedUsername,setSelectedUsername]=useState(" ")
    // const productPerPage=5;
    // const pageCount=Math.ceil((filteredEmployees.length)/itemsPerPage);
    //console.log(pageCount)
     
    const usernames=[...new Set(expData.map((user)=>user?.productName))]
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
    // const filteredEmployees=selectedUsername ? expData.filter((order)=>order?.productName===selectedUsername):expData;
    //  const pageCount=Math.ceil((expData.length)/itemsPerPage);

    // const offset=(currentPage) * itemsPerPage;
    //  const currentProducts=expData.slice(offset,offset+itemsPerPage);
    //  const pageCount=Math.ceil((filteredEmployees.length)/itemsPerPage);

    // const currentProducts=userOrder.filter((prod)=>{
    //   return selectedName ? userOrder.userName === selectedName : true;
    // })
    // .slice(offset,offset+productPerPage)
    const offset=currentPage*itemsPerPage;
    const currentItems=expData.slice(offset,offset+itemsPerPage);
    const pageCount=Math.ceil(expData.length / itemsPerPage);

    
    console.log("all order details is",expData?.length)
    return(
        <div>
{expData?.length>0 ? (
    <div>
        <>
        <h1 className="text-center pt-3 fs-1 fw-bold">Expense Report</h1>
        <div className="d-flex">
        <div className="perpage">
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
        <div className="container mt-4">
<div className="table-responsive">
    <table className=" table table-bordered " >
  <thead  className="table-warning">
    <tr className="text-center">
      <th>productName</th>
    <th>CurrentQty</th>
            <th>quantitySold
            </th>
            <th>saleAmount
            </th>
            {/* <th>phoneNumber</th>
            <th>payStatus</th>
            <th>Address</th> */}
            
    </tr>
  </thead>
  <tbody>   
          


          {currentItems.map((data, index) => (
            <tr key={index} className="text-center">
               {/* <td>{index + 1 + currentPage * itemsPerPage}</td> */}
              <td>{data?.productName}</td>
              <td>{data?.CurrentQty}</td>
              <td>{data?.quantitySold}</td>
              <td>{data?.saleAmount}</td>
              
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
    <h1 className="text-center pt-1 fs-1 fw-bold text-danger">Your expense list is currently empty .</h1>
    </>
)}
        </div>
        
    )
}
export default AllExpense;   
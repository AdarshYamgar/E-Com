import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; //use react router's navigation hook
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';

const BlockBackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    
    const preventBackNavigation = (e) => {
      console.log(location.pathname)
     
      console.log("i am in back button")
     // e.preventDefault();
      //navigate(location.pathname);
    
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to leave and go back to the login page?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, go to login',
        cancelButtonText: 'No ,stay here',
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('loggedIn')

          navigate('/', { replace: true });
        } else {
          
          window.history.pushState(null, '', window.location.href);
        }
      });
      window.history.pushState(null, '', window.location.href); // Push the current state again to block
      e.preventDefault();
    
    };
  
    window.addEventListener('popstate', preventBackNavigation);
    window.history.pushState(null, '', window.location.href);

    return () => {
      window.removeEventListener('popstate', preventBackNavigation);
    };
  }, []);

  return null; 
};

export default BlockBackButton;
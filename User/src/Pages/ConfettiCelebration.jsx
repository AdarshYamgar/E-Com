import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';

const ConfettiCelebration = () => {
  const [isConfettiVisible, setIsConfettiVisible] = useState(true);
  const [profile,setProfile]=useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    // Stop confetti after 3 seconds and redirect to the order confirmation page
    const timer = setTimeout(() => {
      setIsConfettiVisible(false);
      navigate('/orderconfirmation');
    }, 10000);

    // Cleanup the timer
     return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(()=>{
    const storedUser=localStorage.getItem("profile");
    if(storedUser){
        setProfile(JSON.parse(storedUser))
    }
},[]);

  return (
    <div className="confetti-celebration">
      {isConfettiVisible && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={600}
          gravity={0.2}
          friction={0.99}
        />
      )}
      <div className='d-flex justify-content-center'>
        <img src='https://img.freepik.com/premium-vector/parcel-boxes-online-delivery-internet-ordering-concept_68708-2244.jpg' className='img-fluid w-25 pt-5' alt=''  />
      </div>
      <h1 className=' text-center fs-1 fw-bold pd-3 pe-4'>Thank You, {profile?.name}</h1>

    </div>
  );
};

export default ConfettiCelebration;
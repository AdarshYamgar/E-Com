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
    }, 8000);

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
      <div className='profile'>
        <img src='https://img.freepik.com/premium-vector/parcel-boxes-online-delivery-internet-ordering-concept_68708-2244.jpg' alt='' className='imgadjust' style={{display:"block"}}/>
           <h1>Thank You, {profile?.name}</h1>
      </div>
    </div>
  );
};

export default ConfettiCelebration;
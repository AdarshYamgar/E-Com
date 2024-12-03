import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer=()=>{
    const [isVisible,setIsVisible]=useState(false);

    useEffect(()=>{
          const toggleVisibility=()=>{
            if(window.scrollY >200){
                setIsVisible(true);
            }else{
                setIsVisible(false);
            }
          }
          window.addEventListener("scroll",toggleVisibility);
          return ()=>window.removeEventListener("scroll",toggleVisibility);
    },[])

    const scrollToTop=()=>{
        window.scrollTo({
            top:0,
            behavior:"instant",
        })
    }
    return(
        <>
        <div className="">
            <div className="footer">
                {isVisible && (
                <Link className="footerLink" onClick={scrollToTop}>Back to the top</Link>
                )}
            </div>
            <div className="footer2">
               <div className="footer2Text">
                Get Connected with us on social network !
               </div>
               <div className="footer2Icon">
             <a href="https://www.facebook.com/adarsh.yamgar.52?mibextid=ZbWKwL" target="_blank" style={{textDecoration:"none",color:"white",paddingLeft:"80px"}}> <FacebookSharpIcon/></a>
                <a href="https://x.com/AdarshYamg23607" target="_blank" style={{textDecoration:"none",color:"white",paddingLeft:"80px"}}><TwitterIcon/></a>
                 <a href="https://www.linkedin.com/in/adarsh-yamgar-547b571b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" style={{textDecoration:"none",color:"white",paddingLeft:"80px"}}><LinkedInIcon/></a>
                 <a href="https://www.instagram.com/adarsh.yamgar.52?mibextid=ZbWKwL" target="_blank" style={{textDecoration:"none",color:"white",paddingLeft:"80px"}}><InstagramIcon/></a>
               </div>
            </div>
        </div>
        </>
    )
}
export default Footer;
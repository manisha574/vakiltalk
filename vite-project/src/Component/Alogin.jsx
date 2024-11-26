// Alogin.js
import React, { useContext, useRef, useState, useEffect } from 'react';
import { StateContext } from './StateContext';
import defaultProfilePic from '../Image/profile pic.png';
import { RiEdit2Fill } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { RiSuitcaseFill } from "react-icons/ri";
import { FaWallet, FaFacebook, FaPhoneVolume } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { IoMdChatboxes } from "react-icons/io";
import { FaSquareInstagram } from "react-icons/fa6";
import logoface from '../Image/facebook (1).png';
import logoinsta from '../Image/instagram (1).png';
import logotweet from '../Image/twitter.png';
import logout2 from '../Image/switch.png';
import './alogin.css';
import Logout from './Logout';
import { CSSTransition } from 'react-transition-group';
import './header.css';
import Wallet from './Wallet';
import Transaction from './Transaction';

export default function Alogin({ onClose }) {
  const { otpData, setShowWallet,setshowtransaction,setshowedit,showedit,profilePic, setProfilePic,customername , showTalkto,
    setShowTalkto,} = useContext(StateContext);
  const aloginRef = useRef(null);
  const newprofilePic = profilePic || defaultProfilePic;
  const username = otpData?.name || "Username";
  const [logout, setLogout] = useState(false);

  const nav = [
    { name: 'Home', icon: <IoMdHome />, href: '/' },
    { name: 'Consultation History', icon: <RiSuitcaseFill />,action:'Transaction' },
    { name: 'My Wallet', icon: <FaWallet />, href: '#', action: 'wallet' },
    { name: 'About Vakiltalk', icon: <FaExclamationCircle />, href: '#' },
    { name: 'Terms and Condition', icon: <MdEditDocument />, href: '#' },
    { name: 'Privacy Policy', icon: <IoIosLock />, href: '#' },
    { name: 'Chat with Lawyer', icon: <IoMdChatboxes />, href: '#' },
    { name: 'Talk to Lawyer', icon: <FaPhoneVolume />, href: '#' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (aloginRef.current && !aloginRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleAction = (action) => {
    if (action === 'wallet') {
      setShowWallet(true);
      setshowtransaction(false);// Show Wallet component
    }
    else if (action == 'Transaction')
    {
      setshowtransaction(true);
      setShowWallet(false);
    }
    else if (action == 'click')
    {
      setshowedit(true);
      console.log(showedit);
      setshowtransaction(false);
      setShowWallet(false);
      

    }
    else {
      setShowWallet(false); // Hide Wallet component
      setshowtransaction(false);
      setshowedit(false);
    }
  };
  const handleNavigation = (href) => {
    setShowWallet(false);
    setshowtransaction(false);
    setshowedit(false);
    setShowTalkto(false);
    
    
    if (href) {
      
      onClose(); 
      navigate(href);
      // Close the menu on navigation
    }
  };

  const handleLogout = () => {
    setLogout(!logout);
  };

  return (
    <div className="bg-whitebg-blend-overlay w-298 alogin-container  " ref={aloginRef}>
      <div className='flex flex-col bg-gradient-to-b from-loblue to-customBlue gap-3 p-4 text-white font-poppins brightness-100 '>
        <div className=" flex gap-6 items-center text-xl">
          <div className=' w-14 h-14  '>
            <img src={newprofilePic} alt="Profile " className='shadow-md shadow-lightindigo rounded-full w-full h-full object-cover   ' />
            </div>
          <div className='shadow-md shadow-lightindigo'>{customername||username}</div>
        </div>
        <div className='flex gap-2 items-center text-sm'>
          <RiEdit2Fill  className='shadow-md shadow-lightindigo'/>
          <button className='shadow-md shadow-lightindigo' onClick={() => handleAction('click')}>Edit Profile</button>
        </div>
        <hr />
        <div>
          {nav.map((item, index) => (
            <ul key={index}>
              <li>
                <div className='flex items-center m-2 gap-3 cursor-pointer'  onClick={() => item.action ? handleAction(item.action) : handleNavigation(item.href)} >
                  <span className='shadow-lg'>{item.icon}</span>
                  <a href={item.href}>{item.name}</a>
                </div>
              </li>
            </ul>
          ))}
          <div className='w-full mt-11 h-6 flex justify-evenly'>
            <img src={logoface} alt="facebook"   className='shadow-md shadow-lightindigo'/>
            <img src={logoinsta} alt="INSTAGRAM" className=' shadow-md shadow-lightindigo'/>
            <img src={logotweet} alt="twitter"   className='shadow-md shadow-lightindigo'/>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center' onClick={handleLogout}>
        <img src={logout2} className='h-14 w-14 m-auto mt-7' />
        <span className='text-red-600 font-poppins font-semibold text-xl m-2'>Logout</span>
      </div>
      <CSSTransition
        in={logout}
        timeout={300}
        classNames="overlay"
        unmountOnExit
      >
        <div className='overlay'>
          <CSSTransition
            in={logout}
            timeout={300}
            onClose={handleLogout}
            classNames="login-slide"
            unmountOnExit
          >
            <Logout onClose={handleLogout} />
          </CSSTransition>
        </div>
      </CSSTransition>
    </div>
  );
}

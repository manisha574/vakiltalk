import React, { useState,useContext } from 'react';
import brand from '../Image/Frame 1 1.png';
import Login from './Login';
import './header.css';
import { CSSTransition } from 'react-transition-group';
import { StateContext } from './StateContext'; 
import NavButton from './NavButton';
import { BiUser } from "react-icons/bi";
import { BiUserCheck } from "react-icons/bi";
import { BiMenuAltRight } from "react-icons/bi";
import Alogin from './Alogin';
import Home from './Home';
import './style.css'


import { useNavigate } from 'react-router-dom';



export default function Header({ onTalktoClick }) {
    const {
        showTalkto, setShowTalkto  ,
     showBlogs, setShowBlogs,
    showTestimonials, setShowTestimonials,
    showDesign,setShowWallet, setShowDesign,setshowtransaction,showtransaction,setshowedit
    }= useContext(StateContext);
    const { logged, isALoginVisible,isVisible ,setIsVisible,setIsALoginVisible,customername} = useContext(StateContext);
    const navigate = useNavigate();
    const navigation = [
        { name: 'Talk to lawyers', current: false, action: 'showTalkto'},
        { name: 'Read Blogs', current: false },
        { name: 'Testimonials', current: false },
        {
            name: logged ? (customername||'Username ') :'Login' , current: false, button: true, action:logged? 'toggleAlogin': 'toggleLogin', icon: logged ?   <BiUserCheck size={25} />: <BiUser size={30} />, icon2: <BiMenuAltRight size={25} />,

        
        },
        
    ];
    const navigation1 = [
        { name: 'Business Registration', href: '#', current: false },
        { name: 'GST Fillings', href: '#', current: false },
        { name: 'Trademark & IP', href: '#', current: false },
        { name: 'Import Export', href: '#', current: false },
        { name: 'Deeds & Contracts', href: '#', current: false, button: true },
        { name: 'More', href: '#', current: false, button: true },
    ];
   
   

    const handleToggle = () => {
        setIsVisible(!isVisible);
    };
    const handletoggleAlogin = () => {
        setIsALoginVisible(!isALoginVisible);

    };

    const handleClose = () => {
        setIsVisible(false);
        setIsALoginVisible(false);
    };
  
        const handleclick = () => {
            setShowBlogs(false);
            setShowTalkto(false);
            setShowBlogs(false);
            setShowDesign(true);
            setShowWallet(false);
            setshowedit(false);
        
        
            
        
        
    };
    

    const handleAction = (action) => {
        if (action === 'toggleLogin' && !logged) {
            handleToggle();
        }
        else if (action === 'toggleAlogin' && logged)
        {
            handletoggleAlogin();
        }
        else if (action === 'showTalkto') {
            onTalktoClick();
            // Trigger the callback to show Talkto in Home
        }
        else if (action === 'showWallet') { // Add this condition
            setShowWallet(true); // Directly show Wallet from here
        }
        else if (action == 'showTransaction')
        {
            setshowtransaction(true);
        }
        else if (action == 'click')
        {
            setshowedit(true);
        }
    };

    return (
        <div className='font-poppins'>
            <div className='grid lg:items-center'>
                <div className='flex flex-col lg:flex-row lg:items-center justify-between p-4 mx-4 lg:mx-14'>
                    <div onClick={handleclick}>
                        <img src={brand} alt='Brand Logo' className='h-12' />
                       
                    </div>
                    <div className='mt-4 lg:mt-0'>
                        <ul className='flex flex-col md:flex-row sm:flex-col lg:flex-row lg:space-y-0 space-x-0 lg:space-x-4 font-semibold text-18 leading-44 lg:items-center md:justify-evenly'>
                            {navigation.map((item) => (
                                  <li key={item.name}>
                                    <NavButton
                                        name={item.name}
                                        icon={item.icon}
                                        icon2={item.icon2}
                                        onClick={() => handleAction(item.action)}
                                        className={item.button ? !logged ? "bg-gradient-to-b from-loblue to-liloblue w-36 h-14 text-white font-medium text-18 leading-44  text-xl rounded-10" :
                                            ` px-4 py-2 bg-gradient-to-b from-loblue to-liloblue text-white rounded-10` : " hover:bg-lightindigo px-4 py-2 rounded  " }
                                        
                                  />
                              </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <hr className='w-full ' />
                <div className='grid grid-flow-row md:grid-cols-3 lg:grid-cols-6 lg:justify-evenly items-center font-normal text-base leading-44 lg:ml-20 my-4'>
    {navigation1.map((item) => (
        <ul  key={item.name}>
            <li className='grid'>
                <a
                    href={item.href}
                    className={`hover:bg-lightindigo px-4 py-2 rounded ${item.current ? 'text-yellow-400' : 'text-black'}`}
                >
                    {item.name}
                </a>
            </li>
        </ul>
    ))}
</div>

              <hr className='hr-custom'></hr>  
            </div>

            <CSSTransition
                in={isVisible}
                timeout={300}
                classNames="overlay"
                unmountOnExit
            >
                <div className="overlay">
                    <CSSTransition
                        in={isVisible}
                        timeout={300}
                        classNames="login-slide"
                        unmountOnExit
                    >
                        <Login onClose={handleClose} />
                    </CSSTransition>
                </div>
            </CSSTransition>
            <CSSTransition
                in={isALoginVisible}
                timeout={300}
                classNames="overlay"
                unmountOnExit
            >
                <div className="overlay">
                    <CSSTransition
                        in={isALoginVisible}
                        timeout={300}
                        classNames="login-slide"
                        onClose={handleClose}
                        unmountOnExit
                    >
                        <Alogin onClose={handleClose} />
                    </CSSTransition>
                </div>
            </CSSTransition>
        </div>
    );
}

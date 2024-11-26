import React, { useRef, useEffect,useContext } from 'react';
import image from '../Image/logout.png';
import { RxCross2 } from "react-icons/rx";
import { StateContext } from './StateContext';

export default function Logout({ onClose }) {
    const loginRef = useRef(null);
    const {
       logged,setLogged
    }= useContext(StateContext);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (loginRef.current && !loginRef.current.contains(event.target)) {
                onClose();
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);
    const handleClick = () => {
            
        setLogged(false);
    
    
        
    };


    return (
        <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 pb-4 rounded-lg shadow-lg max-w-xs w-11/12 sm:max-w-md text-center border-2 border-black"
            ref={loginRef}
      >  
        <div className='flex flex-row-reverse'>
          <RxCross2 size={25} className='bg-slate-300 rounded-10  m-2' onClick={onClose} />
          </div>
            <img src={image} alt="Logout" className="w-full h-auto rounded-t-lg" />
            <span className="font-poppins font-semibold mt-4 block">Come back soon!</span>
            <span className="font-poppins font-normal mt-2 block">Are you sure you want to logout?</span>
            <button
                className="bg-gradient-to-b from-loblue to-liloblue text-white font-medium w-3/4 max-w-xs h-10 rounded-full mt-6 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
               onClick={handleClick}
            >
                Logout
            </button>
        </div>
    );
}

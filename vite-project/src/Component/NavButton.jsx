import React from 'react';
import { useContext } from 'react';
import { StateContext } from './StateContext'; 


function NavButton({ name, icon, onClick, className, icon2 }) {
    const { logged } = useContext(StateContext);

    return (
        <button
            className={`flex items-center  justify-evenly space-x-2 ${className}`}
            onClick={onClick}
        >
            {icon && <span >{icon}</span>}
            <div className='flex items-center'>
            <span className='text-center '>{name}</span>
               
                </div>
        </button>
    );
}

export default NavButton;

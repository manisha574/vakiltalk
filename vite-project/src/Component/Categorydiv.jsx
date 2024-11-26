import React from 'react';

export default function Categorydiv({ show, label, color ,bcolor }) {
    return (
      
    <div className={`${color} p-4  ${bcolor} border-2 w-fit m-1 h-10 font-poppins rounded-30 items-center justify-center flex`}>
      {show && <span  className='text-black font-light leading-5 text-center m-2'>{label}</span>}
    </div>
  );
}
 
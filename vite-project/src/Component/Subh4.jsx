import React from 'react';
import img from '../Image/buisness.png';

export default function Subh4() {
  return (
    <div className='flex flex-col md:flex-row items-center md:items-start  px-4 md:px-8 mt-16'>
      <div className='font-poppins text-black mb-6 md:mb-0 text-center md:text-left'>
        <p className='font-poppins font-medium text-4xl md:text-5xl lg:text-6xl'>
          Why Choose<br/> VakilTalk?
        </p>
        <p className='font-normal text-base md:text-lg mt-4 lg:mt-3'>
          Your go-to platform for online consultations with top<br/> Indian lawyers. Get expert legal advice on personal,<br/> business, and complex issues from experienced <br/>professionals across India, all from the comfort of,<br/> your home. Connect with VakilTalk for reliable and <br/>convenient legal support.
        </p>
      </div>
      <img
        src={img}
        alt='img'
        className='w-3/4 md:w-1/3 lg:w-500 lg:h-250 h-auto  lg:mt-4 md:mt-0 lg:ml-20'
      />
    </div>
  );
}

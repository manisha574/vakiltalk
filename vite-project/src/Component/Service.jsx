import React from 'react';
import { BiMessageRoundedDetail } from "react-icons/bi";
import { BsCameraVideo } from "react-icons/bs";
import logoprm from'../Image/Vector (2).png'

const Service=({icon:Icon,label,cost})=> {
  return (
    <div className='mt-2 flex border-2 border-black w-fit py-1 rounded-xl items-center relative px-3 mr-2 mb-3'>
    <Icon className='mr-2 w-4 h-4 font-normal' />
    {label}
    <div className='absolute top-5 bg-darkindigo text-white font-normal text-7 rounded-10 px-3 right-0 mb-5'>
      <span>₹{cost}/min</span>
    </div>
  </div>

  )
};
export default Service;

import React from 'react';
import { BiMessageRoundedDetail } from "react-icons/bi";
import { BsCameraVideo } from "react-icons/bs";
import logoprm from'../Image/Vector (2).png'

const Service=({icon:Icon,label,cost,icon2:Icon2,label2,cost2})=> {
  return (
      <div className='flex  mt-2 space-x-3 items-center  '>
          <div className='bg-lightindigo border-loblue border-2 border-l-8 rounded-r-10 h-fit p-1'>
          <p className='text-left'>₹{cost}<br/>per minute</p>
          </div>
          <div className='flex  '>
              <div className='border-2 border-black mr-3 flex h-fit p-1 rounded-10'>
    <Icon className='mr-2 w-4 h-4 font-normal ' />
                  {label}
              </div>
              <div  className='border-2 border-black mr-3 flex h-fit p-1 rounded-10 '>
              <Icon2 className='mr-2 w-4 h-4 font-normal ml-2' />
              {label}
              </div>
              </div>
    
  </div>

  )
};
export default Service;

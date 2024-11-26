import React from 'react'
import Categorydiv from './Categorydiv'


import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function Category() {
    const categorydata = [
        {
            show: true,
            label: 'Bankruptcy',
            color: 'bg-lightyellow',
            bcolor:'border-nyellow',
        },
        {
            show: true,
            label: 'Corporate/ Business',
            color: ' bg-lightred',
            bcolor:'border-nred',
        },
        {
            show: true,
            label: 'Criminal Defense',
            color: ' bg-lightgreen',
            bcolor:'border-ngreen',
        },
        {
            show: true,
            label: 'Estate Planning',
            color: ' bg-lightorange',
            bcolor:'border-norange',
        },
    ];
  
  return (
      <div className='mt-16' >
          <p className='font-poppins font-light leading-10 text-34' >Lawyers by Category</p>
          <div className='flex flex-wrap  mt-8 '>
              {categorydata.map((column, index) => (
                  <Categorydiv
                      key={ index}
                      show={column.show}
                      label={column.label}
                      color={column.color}
                      bcolor={column.bcolor}
                  /> 
                  
              ))
              }
              <button className='p-4   border-black border-2 w-fit m-1 h-10 font-poppins rounded-30 items-center justify-center flex'> <span>See all categories </span> <MdOutlineKeyboardArrowRight /></button>
          </div>
          </div>
      
    
  )
}

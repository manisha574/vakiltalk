import React from 'react'
import { IoFilterOutline } from "react-icons/io5";
export default function Sort() {
  return (
    <div>
      <div className='flex space-x-4'>
<div className='relative'>
    <button
        className='border border-gray-300 rounded-lg p-2 flex items-center'
        onClick={() => document.getElementById('sortByDropdown').classList.toggle('hidden')}
    >
        {sortBy ? `Sort by ${sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}` : 'Sort by'}
        <IoFilterOutline className='text-xl text-gray-500 ml-2' />
    </button>
    <div id='sortByDropdown' className='absolute top-full left-0 mt-2 border border-gray-300 rounded-lg bg-white hidden'>
        <button
            className='w-full text-left px-4 py-2 hover:bg-gray-100'
            onClick={() => { setSortBy('name'); document.getElementById('sortByDropdown').classList.add('hidden'); }}
        >
            Sort by Name
        </button>
        <button
            className='w-full text-left px-4 py-2 hover:bg-gray-100'
            onClick={() => { setSortBy('rating'); document.getElementById('sortByDropdown').classList.add('hidden'); }}
        >
            Sort by Rating
        </button>
    </div>
    
</div>
</div>

    </div>
  )
}

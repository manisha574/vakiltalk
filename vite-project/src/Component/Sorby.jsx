import React, { useContext, useState } from 'react';
import { StateContext } from './StateContext';
import './header.css';
import './alogin.css';
import { RxCross2 } from "react-icons/rx";

export default function Sorby({ onclose }) {
    const { setSortBy, setIsDropdownVisible, selectedSortOptions, setSelectedSortOptions } = useContext(StateContext);
    
    const handleSortSelection = (option) => {
        setSelectedSortOptions((prev) => {
            const updatedOptions = prev.includes(option)
                ? prev.filter(item => item !== option)
                : [...prev, option];

            // Update the sort state based on selected options
            setSortBy(updatedOptions); // Synchronize with the sorting context

            return updatedOptions; // Return the updated state
        });
    };

    return (
        <div className='mt-2 border-blue-600 border-2 shadow-md shadow-blue-600 rounded-lg bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <div className='flex justify-between'>
                <h1 className='text-blue-700 text-xl font-semibold m-2 underline-offset-4 underline'>Sort Astrologer by</h1>
                <div>
                    <RxCross2 size={25} className='bg-slate-300 rounded-10 m-2' onClick={onclose} />
                </div>
            </div>

            <div className='px-4 py-2'>
                {[
                    'Online',
                    'Newest',
                    'Oldest',
                    'Price: Low to High',
                    'Price: High to Low',
                    'Experience: Low to High',
                    'Experience: High to Low',
                    'Rating: Low to High',
                    'Rating: High to Low',
                ].map(option => (
                    <label key={option} className='w-full flex items-center py-2 hover:bg-lightindigo'>
                        <input
                            type='checkbox'
                            name='sort'
                            value={option}
                            checked={selectedSortOptions.includes(option)}
                            onChange={() => handleSortSelection(option)}
                            className='mr-2'
                            style={{ width: '20px', height: '20px', display: 'inline-block' }} // Add inline styles for debugging
                        />
                        {option}
                    </label>
                ))}
            </div>
        </div>
    );
}

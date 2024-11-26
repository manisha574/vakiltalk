// CustomerRatings.js
import React from 'react';
import { FaStar } from 'react-icons/fa'; // Importing star icon from react-icons
import { SlUser } from 'react-icons/sl'; // Importing user icon from react-icons
import ProgressBar from './ProgressBar'; // Adjust the import path as necessary

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FaStar key={i} className={i <= rating ? 'text-yellow-500' : 'text-gray-300'} />
    );
  }
  return stars;
};

export const CustomerRatings = ({ customerFeedback }) => {
  return (
    <div className='flex flex-col items-start mt-4'>
      <h3 className='text-lg font-semibold m-3 underline'>Customer Ratings</h3>
      {customerFeedback.length === 0 ? (
        <p className='text-gray-500'>No customer ratings available.</p>
      ) : (
        customerFeedback.map(({ customerRating, customerName, customerReview }, index) => (
          <div key={index} className='border border-gray-300 p-4 mb-4 rounded-lg shadow-md w-full bg-white'>
            <div className='flex items-center'>
              <SlUser className='text-gray-600 mr-2' /> {/* User icon for each review */}
              <div className='flex'>{renderStars(customerRating)}</div>
              <span className='ml-2 text-gray-600 font-medium'>{customerName}</span>
            </div>
            <p className='mt-2 text-sm text-gray-800 italic'>" {customerReview} "</p>
          </div>
        ))
      )}
    </div>
  );
};

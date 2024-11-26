import React from 'react';
import ReactStars from 'react-rating-stars-component';

const H3div = ({ rating, image, image1, show }) => {
  return (
    <div className="p-2 border-2 border-white flex items- rounded-20 w-full sm:w-auto h-98 font-poppins leading-18 mx-auto mb-4">
      <div className='m-4'>
        <p className='font-poppins text-22 rounded-20 text-white'>{rating}/5</p>
        <ReactStars
          count={5}
          value={rating}
          size={20}
          color="#ffffff"       // Color of inactive stars
          activeColor="#ffffff"
          edit={false}
          classNames='mt-1'
        />
      </div>
      <div className='
      flex items-center'>
      <img src={image} alt="Profile" className='m-2 h-12 w-12 sm:h-10 sm:w-10' />
      {show && image1 && (
        <img src={image1} alt="Additional Profile" className='mt-2 h-12 w-12 sm:h-10 sm:w-10' />
        )}
        </div>
    </div>
  );
};

export default H3div;

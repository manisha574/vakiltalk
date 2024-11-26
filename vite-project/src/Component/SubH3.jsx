import React from 'react';
import p1 from '../Image/pngwing.com 1.png';
import p2 from '../Image/free-trustpilot-10751973-8715838 1.png';
import p3 from '../Image/Trustpilot.png';
import p4 from '../Image/logo3x 1.png';
import H3div from './H3div.jsx';

export default function SubH3() {
  const data = [
    {
      rating: 4.5,
      img: p1,
      show: false,
    },
    {
      rating: 4.5,
      img: p2,
      img1: p3,
      show: true,
    },
    {
      rating: 4.5,
      img: p4,
      show: false,
    },
  ];

  return (
    <div className='bg-blue-700 w-full lg:h-48 py-4 flex flex-wrap justify-center items-center gap-4 rounded-20 mt-16'>
      {data.map((column, index) => (
        <H3div
          key={index}
          rating={column.rating}
          image={column.img}
          image1={column.img1}
          show={column.show}
        />
      ))}
    </div>
  );
}

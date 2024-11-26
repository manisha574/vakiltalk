import React from 'react';
import bgr from '../Image/Frame 2.png';
import im1 from '../Image/vecteezy_boton-de-descarga-de-la-tienda-de-aplicaciones-en-colores_12871374 1.png';
import im2 from '../Image/vecteezy_google-play-store-download-button-in-white-colors-download_12871364 1.png';

export default function SubH1() {
  return (
    <div
      style={{ backgroundImage: `url(${bgr})` }}
      className='lg:h-524 md:h-auto sm:h-auto bg-cover bg-center px-4 py-8 lg:px-16 lg:py-14 w-full'
    >
      <div className='lg:text-left '>
        <p className='font-viga text-white font-normal text-4xl lg:text-7xl leading-tight text-shadow'>
          Lawyers <br />
          on Demand
        </p>
        <p className='font-poppins font-semibold text-2xl lg:text-4xl leading-tight text-customBlue py-3'>
          Legal Consultations <br />
          <span className='text-white'>from Top Rated Indian Lawyers</span>
        </p>
        <p className='font-poppins text-white text-lg leading-tight'>
          Download Our Mobile App
        </p>
        <div className='flex flex-col lg:flex-row lg:justify-start space-y-4 lg:space-y-0 lg:space-x-4 py-3'>
          <img 
            src={im1} 
            alt='img' 
            className='w-3/4 md:w-1/2 lg:w-1/3 max-w-[150px] max-h-[50px] object-contain' 
          />
          <img 
            src={im2} 
            alt='img' 
            className='w-3/4 md:w-1/2 lg:w-1/3 max-w-[150px] max-h-[50px] object-contain' 
          />
        </div>
      </div>
    </div>
  );
}

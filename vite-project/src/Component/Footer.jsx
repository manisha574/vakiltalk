import React from 'react';
import im1 from '../Image/vecteezy_boton-de-descarga-de-la-tienda-de-aplicaciones-en-colores_12871374 1.png';
import im2 from '../Image/vecteezy_google-play-store-download-button-in-white-colors-download_12871364 1.png';
import b1 from '../Image/prime_twitter.png'
import b2 from '../Image/Vector (5).png'
import b3 from '../Image/Vector (6).png'
import b4 from '../Image/Vector (7).png'

export default function Footer() {
  return (
    <div className='font-poppins mt-16 w-full'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-gradient-to-b from-sblue to-fblue text-white p-8  ">
        <div className="flex flex-col items-start lg:items-start lg:ml-10  ">
          <p className="font-viga text-3xl lg:text-5xl font-normal mb-4 leading-58">Download VakilTalk Mobile App</p>
          <div className="flex space-x-3 py-3">
            <img src={im1} alt="Download on App Store" className="w-24 md:w-32" />
            <img src={im2} alt="Get it on Google Play" className="w-24 md:w-32" />
          </div>
        </div>

        <div className="flex flex-col items-start lg:items-start lg:ml-auto">
          <p className="font-semibold mb-4">IMPORTANT LINKS</p>
          <ul className="pl-1 font-normal leading-9">
            <li><a href="#" className="hover:underline">About VakilTalk</a></li>
            <li><a href="#" className="hover:underline">Terms and Conditions</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Disclaimer</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        <div className="flex flex-col items-start lg:items-start lg:ml-auto">
          <p className="font-semibold mb-4">OTHERS</p>
          <ul className="pl-1 font-normal leading-9 ">
            <li><a href="#" className="hover:underline">Join as an Advisor</a></li>
            <li><a href="#" className="hover:underline">Read Blogs</a></li>
            <li><a href="#" className="hover:underline">Notifications & Updates</a></li>
          </ul>
        </div>
      </div>
      <div className="  text-center py-2 h-18">
              <p className='font-normal text-18 leading-normal'> Follow us on Social Media</p>
              <div className='flex gap-3 items-center justify-center m-3'>
              <img  src={b1} alt="img"/>
              <img src={b2} alt="img"/>
              <img src={b3} alt="img"/>
                  <img src={b4} alt="img" />
                  </div>
        
      </div>
    </div>
  );
}

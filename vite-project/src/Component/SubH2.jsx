import React from 'react';
import logoprm from '../Image/Vector (2).png';
import Service2main from '../Component/Service2main';
import ReactStars from "react-rating-stars-component";
import Servicemain from '../Component/Servicemain';

const SubH2 = ({ premium, img, name, title, tag = [], chatcost, callcost, videocall, online, rating, showdesign, onClick }) => {
    return (
        <div
            className='p-2 border-2 grid justify-items-center border-black rounded-20 w-80 h-auto font-poppins leading-18 relative shadow-custom'
            onClick={onClick} // Handle click event
        >
            {premium && (
                <div className='absolute top-0 left-0 flex bg-yellow-500 rounded-tl-19 rounded-br-10 px-2 py-1'>
                    <img src={logoprm} alt='logo' className='w-5 h-5' />
                    <span className='mx-1'>PREMIUM</span>
                </div>
            )}
            <div className='relative'>
                <img src={img} alt={name} className='w-16 h-16 object-cover rounded-full' />
                {online && (
                    <div className="absolute top-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                )}
            </div>
            <h2 className='font-semibold text-xs text-gray-500'>{name}</h2>
            <h3 className='text-sm text-black font-medium'>{title}</h3>
            <div className='flex items-center'>
                <ReactStars
                    count={5}
                    value={rating}
                    size={24}
                    activeColor="#ffd700"
                    edit={false}
                />
                <p className='ml-2'>{rating}</p>
            </div>
            <div className='flex flex-wrap mt-2'>
                {tag.map((tagItem, tagIndex) => (
                    <span key={tagIndex} className='m-1 px-3 bg-lightindigo rounded-full text-xs font-normal'>
                        {tagItem}
                    </span>
                ))}
            </div>
            <div>
                {/*{showdesign ? (
                    <Servicemain chatcost={chatcost} callcost={callcost} videocall={videocall} />
                ) : (
                    <Service2main chatcost={chatcost} callcost={callcost} videocall={videocall} />
                )}*/}
                 {online ? (
                    showdesign ? (
                        <Servicemain chatcost={chatcost} callcost={callcost} videocall={videocall} />
                    ) : (
                        <Service2main chatcost={chatcost} callcost={callcost} videocall={videocall} />
                    )
                ) : (
                    <p className='text-gray-700 text-center border-2 rounded-20 border-gray-300 mt-3 font-poppins leading-loose px-7 bg-gray-100 text-lg font-semibold'>Offline</p>
                )}
            </div>
        </div>
    );
};

export default SubH2;

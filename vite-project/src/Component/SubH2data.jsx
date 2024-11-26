// SubH2data.jsx
import React from 'react';
import profile1 from '../Image/cropped_image (3) 1 .png';
import SubH2 from './SubH2';
import { GoArrowRight } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa6";
import Category from './Category';
import Concern from './Concern';
import Otherservice from './Otherservice';
import SubH3 from './SubH3';
import Subh4 from './Subh4';

export default function SubH2data() {
    const subdata = [
        {
            premium: true,
            img: profile1,
            name: 'Advocate Arnold',
            title: 'Criminal Lawyer',
            tag: ['Marriage', 'Divorce', 'Child Custody'],
            chatcost: 10,
            callcost: 10,
            videocall: 10,
            online: true,
            rating:4.5,
        },
        {
            premium: false,
            img: profile1,
            name: 'Advocate Arnold',
            title: 'Criminal Lawyer',
            tag: ['Marriage', 'Divorce', 'Child Custody'],
            chatcost: 10,
            callcost: 10,
            videocall: 10,
            online: true,
            rating:4.5,
        },
        {
            premium: false,
            img: profile1,
            name: 'Advocate Arnold',
            title: 'Criminal Lawyer',
            tag: ['Marriage', 'Divorce', 'Child Custody'],
            chatcost: 10,
            callcost: 10,
            videocall: 10,
            online: true,
            rating:4.5,
        },
        {
            premium: true,
            img: profile1,
            name: 'Advocate Arnold',
            title: 'Criminal Lawyer',
            tag: ['Marriage', 'Divorce', 'Child Custody'],
            chatcost: 10,
            callcost: 10,
            videocall: 10,
            online: true,
            rating:4.5,
        },
        {
            premium: false,
            img: profile1,
            name: 'Advocate Arnold',
            title: 'Criminal Lawyer',
            tag: ['Marriage', 'Divorce', 'Child Custody'],
            chatcost: 10,
            callcost: 10,
            videocall: 10,
            online: true,
            rating:4.5,
        },
        {
            premium: false,
            img: profile1,
            name: 'Advocate Arnold',
            title: 'Criminal Lawyer',
            tag: ['Marriage', 'Divorce', 'Child Custody'],
            chatcost: 10,
            callcost: 10,
            videocall: 10,
            online: true,
            rating:4.5,
        },
    ];

    return (
        <div className='w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16'>
            <p className='font-poppins font-semibold text-4xl leading-tight text-loblue text-left pt-3 pb-4 my-3'>
                Our Top Rated Law Experts
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 mb-8 text-center gap-x-6 space-x-3'>
                {subdata.map((column, index) => (
                    <SubH2
                        key={index}
                        premium={column.premium}
                        img={column.img}
                        name={column.name}
                        title={column.title}
                        tag={column.tag}
                        chatcost={column.chatcost}
                        callcost={column.callcost}
                        videocall={column.videocall}
                        online={column.online}
                        rating={column.rating}
                    />
                ))}
            </div>
            <div className='mt-4 flex justify-center'>
                <button className='text-blue-800 bg-lightindigo w-60 h-12 rounded-20 font-medium text-base text-center flex items-center justify-center'>
                    View all Law Advisors <FaArrowRight className='mx-3 w-5 h-5' />
                </button>
            </div>
            <Category />
            <Concern />
            <Otherservice />
            <SubH3 />
            <Subh4 />
        </div>
    );
}
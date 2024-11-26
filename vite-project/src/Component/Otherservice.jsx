import React, { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import s1 from '../Image/business-schedule-5726995-4805277 1 (1).png';
import OService from './OService';
import s2 from '../Image/tax-percentage-5706062-4755617 1.png';
import s3 from '../Image/8662350 1.png';
import s4 from '../Image/9394769 1.png';
import './alogin.css'; // Import your custom CSS

export default function Otherservice() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
    };

    const data = [
        { img: s1, label: 'Business\nRegistration' },
        { img: s2, label: 'Tax &\nCompliances' },
        { img: s3, label: 'Licensing &\nDocumentation' },
        { img: s4, label: 'IP & Trademarks' },
    ];

    return (
        <div className="grid justify-items-center p-4">
            <p className="text-4xl font-medium mt-16 mb-4">Explore our other services</p>

            <Swiper
                spaceBetween={30}
                slidesPerView={3}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                effect={'coverflow'}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                }}
                pagination={{
                    clickable: true,
                    renderBullet: (index, className) => (
                        `<span class="${className}" data-index="${index}"></span>`
                    ),
                }}
                onSlideChange={handleSlideChange}
                modules={[Autoplay, EffectCoverflow, Pagination]}
                className="w-full h-80"
            >
                {data.map((column, index) => (
                    <SwiperSlide key={index} className="flex justify-center items-center">
                        <OService image={column.img} label={column.label} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="dots-container">
                {data.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${activeIndex === index ? 'active' : ''}`}
                    />
                ))}
            </div>
        </div>
    );
}

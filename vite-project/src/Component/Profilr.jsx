import React, { useState, useContext, useEffect } from 'react';
import image from '../Image/verified.png';
import { FaLanguage } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { GiDiscussion } from "react-icons/gi";
import { MdWorkspacePremium } from "react-icons/md";
import { TbTie } from "react-icons/tb";
import ProgressBar from './ProgressBar'; // Ensure this path is correct based on your project structure
import axios from 'axios';
import { StateContext } from './StateContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CSSTransition } from 'react-transition-group';
import './header.css';
import './style.css';
import Alogin from './Alogin';
import Details from './Details';
import Wait from './Wait'
import './wait.css';
import { SlUser } from "react-icons/sl";
import { CustomerRatings } from './CustomerRatings';


{/*
  const PremiumBadge = () => (
    <div className='absolute top-0 left-0 flex bg-yellow-500 rounded-tl-19 rounded-br-10 px-2 py-1 items-center'>
      <MdWorkspacePremium size={23} />
      <span className='mx-1'>PREMIUM</span>
    </div>
  );

  const ProfileImage = ({ img, name, online }) => (
    <div className='relative m-auto w-1/2 md:w-2/4'>
      <img src={img} alt={name} className='object-cover rounded-full w-full' />
      {online && <div className="absolute bottom-2 right-4 w-5 h-5 bg-lime-400 rounded-full border-2 border-white" />}
    </div>
  );
*/}
const PremiumBadge = () => (
  <div className='absolute top-0 left-0 flex bg-yellow-500 rounded-tl-19 rounded-br-10 px-2 py-1 items-center text-xs md:text-base'>
    <MdWorkspacePremium size={20} className='md:text-lg' />
    <span className='mx-1'>PREMIUM</span>
  </div>
);

const ProfileImage = ({ img, name, online }) => (
  <div className='relative  w-1/2 h-1/2  md:w-32 md:h-32 m-auto'>
    <img src={img} alt={name} className='object-cover rounded-full w-full h-full' />
    <div className="absolute bottom-2 right-2 w-4 h-4 md:w-5 md:h-5 bg-lime-400 rounded-full border-2 border-white" />
  </div>
);

const ProfileHeader = ({ name, verified }) => (
  <div className='flex items-center'>
    <div className='font-semibold text-sblue text-2xl md:text-3xl'>{name}</div>
    {verified && <img src={image} alt='verified' className='w-7 md:w-9 ml-2' />}
  </div>
);

const ProfileTitle = ({ title }) => (
  <p className='text-lg md:text-xl text-black font-medium bg-lightindigo rounded-20 text-center m-4 px-2'>{title}</p>
);

const ProfileRating = ({ rating }) => (
  <div className='flex items-center'>
    <ReactStars count={5} value={rating} size={25} activeColor="#ffd700" edit={false} />
    <p className='ml-2 font-semibold text-lg md:text-xl'>{rating}</p>
  </div>
);


const ProfileDetails = ({ tag, title, Experience, totalConsultation }) => (
  <div className='flex flex-col text-lg md:text-xl font-medium text-black space-y-4'>
    <div className='flex items-center'>
      <TbTie size={20} className='mr-2  text-blue-400' />
      <span className=' text-blue-800 '>Experience: {Experience}</span>
    </div>
    <div className='flex items-center'>
      <FaLanguage size={20} className='mr-2  text-blue-400' />
      <span className=' text-blue-800 '>Skills: {title}</span>
    </div>
    {tag.map((tagItem, index) => (
      <div key={index} className='flex items-center'>
        <TbTie size={20} className='mr-2  text-blue-400' />
        <span className=' text-blue-800 '>Language: {tagItem}</span>
      </div>
    ))}
    <div className='flex items-center'>
      <GiDiscussion size={20} className='mr-2  text-blue-400' />
      <span className=' text-blue-800 '>Consultations: {totalConsultation}</span>
    </div>
  </div>
);



const Profilr = ({
  lawyerskey, premium, img, name, title, tag = [], chatcost, callcost, videocall, online, rating,
  Experience, verified, totalConsultation, aboutMe, totalRating, ratingGrap,readmore,customerFeedback,
}) => {
  const { otpData ,setShowWallet,autofilldata, setAutofillData,formattedLawyerKey,lawyerkey,wait} = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chat, setchat] = useState(false);
  const [chatInitialized, setChatInitialized] = useState(false);
  const [show, setshow] = useState(true);

  useEffect(() =>
  {
    console.log(chat);
  }, [chat])
  useEffect(() => {
    console.log(autofilldata);

  }, [autofilldata])
  useEffect(() => {
    if (wait == true)
    {
      setchat(false);
    }

  })

  const handleclick = () => {
    setshow(!show);


    
  }
  //   const transformRatings = (ratingGrap) => {
  //   if (!ratingGrap || Object.keys(ratingGrap).length === 0) {
  //     return { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 };
  //   }
  //   return ratingGrap;
  // };

  // const ratings = transformRatings(ratingGrap);


  const handleChatClick = async () => {
    try {
      setIsLoading(true); // Start loading
      setError(null); // Reset any previous error
      
          const formattedLawyerKey = String(lawyerskey).replace(/,$/, '');

      const response = await axios.post(
        `https://testapi.astroapp.live:8082/astrologyapp/api/v1/customers/check-chat-status-before-start-new-chat?customerId=${otpData.data.id}&astrologerId=${formattedLawyerKey}&timeZone=Asia/Calcutta`,
        {
          astrologerId:  formattedLawyerKey,
          customerId: otpData.data.id,
          timeZone: 'Asia/Calcutta',
          platformType: 'WEBSITE',
          appVersion: '1.0',
        },
        {
          headers: {
            'Authorization': `Bearer ${otpData.data.authToken}`,
            'Content-Type': 'application/json',
            'Id':otpData.data.id,
          },
        }
      );

      console.log('Chat started successfully:', response.data);
      if (response.data.status === "fail") {
        toast(
          <div >
            <span className='mb-10 text-black'>{response.data.displayMessage}</span>
            <button
              onClick={() => setShowWallet(true)}
            
            
              className=' bg-loblue text-lg rounded-10 px-3 py-1 mt-3 text-white  hover:bg-green-500 transition-colors duration-300'
            >
              Recharge Wallet
            </button>
          </div>,
          {
            className: 'custom-toast',
            position: "top-right",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      }
      else {
        const fetchChatData = async () => {
          try {
            const response = await axios.get(
              `https://testapi.astroapp.live:8082/astrologyapp/api/v1/customers/autofill-customer-form-chat-data?customerId=${otpData.data.id}`,
              {
                headers: {
                  'Authorization': `Bearer ${otpData.data.authToken}`,
                  'Content-Type': 'application/json',
                  'Id': otpData.data.id,
                }
              }
            );
            setchat(true);
            // Handle success
            console.log('Success:', response.data);
 if ( response.data.status === 'success')            {  
                     setAutofillData(response.data),

              
   console.log(chat);
            }
          }
          catch (error) {
            // Handle error
            console.error('Error:', error.response ? error.response.data : error.message);

          }
        };
                fetchChatData();

      }

      // Update your state or perform any further actions here

    } catch (err) {
      console.error('Error starting chat:', err);
      setError('Failed to start chat. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  const handleClose = () =>
  {
    setchat(false);
  }
  const handleCallClick = async () => {
    try {
      setIsLoading(true); // Start loading
      setError(null); // Reset any previous error
      
          const formattedLawyerKey = String(lawyerskey).replace(/,$/, '');

      const response = await axios.post(
        `https://testapi.astroapp.live:8082/astrologyapp/api/v1/customers/check-call-status-before-start-new-call?customerId=${otpData.data.id}&astrologerId=${formattedLawyerKey}&timeZone=Asia/Calcutta`,
        {
          astrologerId:  formattedLawyerKey,
          customerId: otpData.data.id, 
          timeZone: 'Asia/Calcutta',
          platformType: 'WEBSITE',
          appVersion: '1.0',
        },
        {
          headers: {
            'Authorization': `Bearer ${otpData.data.authToken}`,
            'Content-Type': 'application/json',
            'Id':otpData.data.id,
          },
        }
      );

      console.log('Chat started successfully:', response.data);
      if (response.data.status === "fail") {
      toast(
        <div >
          <span className='mb-10 text-black'>{response.data.displayMessage}</span>
          <button
            onClick={() => setShowWallet(true)}
            
            
            className=' bg-loblue text-lg rounded-10 px-3 py-1 mt-3 text-white  hover:bg-green-500 transition-colors duration-300'
          >
            Recharge Wallet
          </button>
        </div>,
        { 
          className:'custom-toast',
          position: "top-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }

      // Update your state or perform any further actions here

    } catch (err) {
      console.error('Error starting chat:', err);
      setError('Failed to start chat. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };


  

  return (
    <div>
    
    <div className='flex flex-col md:flex-row gap-8  p-4 md:p-8 '>
      <div className='p-4 border-2 grid justify-items-center  border-liloblue rounded-20 w-full  md:w-2/4 h-2/4 font-poppins leading-18 relative shadow-md shadow-blue-400'>
        {premium && <PremiumBadge />}
        <div className='grid justify-center'>
          <div className='flex flex-col items-center justify-evenly'>
            <ProfileImage img={img} name={name} online={online} />
            <ProfileHeader name={name} verified={verified} />
            <ProfileRating rating={rating} />
            <ProfileTitle title={title} />
          </div>
          <div className='grid justify-center'>
            <ProfileDetails
              Experience={Experience}
              tag={tag}
              title={title}
              totalConsultation={totalConsultation}
            />
          </div>
          
          <div className='flex flex-col md:flex-row gap-4 mt-4'>
            <button className='bg-slate-300 p-2 w-full md:w-36 h-14 rounded-19'
              onClick={handleCallClick}
             disabled={isLoading}>
              
              <span className='font-semibold'>Start Call </span><br /> ₹ {callcost} per min
            </button>
            <button
              className='bg-slate-300 p-2 w-full md:w-36 h-14 rounded-19'
              onClick={handleChatClick}
              disabled={isLoading}
            >
              <span className='font-semibold'>Start Chat </span><br /> ₹ {chatcost} per min
            </button>
          </div>
          {/*{online?
          (<div className='flex flex-col md:flex-row gap-4 mt-4'>
            <button className='bg-slate-300 p-2 w-full md:w-36 h-14 rounded-19'>
              <span className='font-semibold'>Start Call </span><br /> ₹ {callcost} per min
            </button>
            <button
              className='bg-slate-300 p-2 w-full md:w-36 h-14 rounded-19'
              onClick={handleChatClick}
              disabled={isLoading}
            >
              <span className='font-semibold'>Start Chat </span><br /> ₹ {chatcost} per min
            </button>
          </div>): (
                    <p className='text-gray-700 text-center border-2 rounded-20 border-gray-300 mt-3 font-poppins leading-loose px-7 bg-gray-100 text-lg font-semibold'>Offline</p>
                )}*/}
        </div>
      </div>
      <div className='flex flex-col gap-4 '>
          <h1 className='text-black font-semibold text-2xl md:text-3xl underline'>About Advisor</h1>
          
          {show ? (<p className='text-xl md:text-xl font-normal'>{aboutMe}</p>) : (<p className='text-xl md:text-xl font-normal'>{readmore}</p>)}
          {show ? (<button className='text-blue-500 text-base font-medium hover:underline mt-2 text-left ' onClick={handleclick}>Read more +</button>) : (<button className='text-blue-500 text-base font-medium hover:underline mt-2 ' onClick={handleclick}>Read less</button>)}
        <p className='text-xl md:text-2xl font-semibold underline'>Ratings & Reviews</p>
        
        <p className='inline-flex items-center'>
          <ProfileRating rating={rating} />
          <span className='ml-2 font-medium'>based on overall rating</span>
        </p>
        <div className='mt-4'>
               <ProgressBar ratingGraph={ratingGrap} />

          </div>
          <div className='flex m-3  rounded-20'>
         
            <div > <CustomerRatings customerFeedback={customerFeedback} />
            </div>
        </div>
        </div>
        
      <ToastContainer />
      <CSSTransition
        in={chat}
        timeout={300}
        classNames='overlay'
        unmountOnExit
      >
        <div className='overlay'>
        <CSSTransition
          in={chat}
            timeout={300}
              classNames='login-slide'
                      // onClick={(e) => e.stopPropagation()} // Prevent click events from propagating to the overlay

           
            unmountOnExit
          >
            <Details   onClose={handleClose} />

      </CSSTransition>
    </div>
      </CSSTransition>
      </div>

      <CSSTransition
        in={wait}
        timeout={300}
        classNames='overlay2'
        unmountOnExit
      >
        <div className='overlay2 shadow-md '>
      <CSSTransition
        in={wait}
        timeout={300}
         classNames='wait'
        unmountOnExit
      >
       
      
       <Wait/>

      </CSSTransition>
        </div>
      </CSSTransition>
      </div>
        
      
  );
};

export default Profilr;

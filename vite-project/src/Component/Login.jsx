import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import logo from '../Image/Group 5.png';
import img from '../Image/background.png';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { RxCross2 } from "react-icons/rx";
import './header.css';
import Otpinput from './Otpinput';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { StateContext } from './StateContext';

export default function Login({ onClose }) {
  const {
    timeZone,
    setTimeZone,
    isSuccess,
    setIsSuccess,
    clicked,
    setIsClicked,
    otp,
    setOtp,
    timer,
    setTimer,
    isResendDisabled,
    setIsResendDisabled,
    id_1,
    setId,
    logged,
    setLogged,
    otpData,
    setOtpData,
    signUpData,
    setSignUpData,
    otpDataf, setOtpDataf,
    showToast,
    setShowToast,
    setIsVisible,
    auth,setauth,
  } = useContext(StateContext);
  
  const [toastTriggered, setToastTriggered] = useState(false);
  const [isPhoneInputDisabled, setIsPhoneInputDisabled] = useState(false); // New state for phone input disable
  const [isTermsChecked, setIsTermsChecked] = useState(false); // State for checkbox
  const navigate = useNavigate();
  const loginRef = useRef(null);

  const message = "Welcome to\nVakilTalk";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);
  useEffect(() => {
    if (id_1) {
      console.log('Updated   User ID:', id_1);
    }
  }, [id_1]);
   
  useEffect(() => {
    console.log('Logged state updated:', logged);
  }, [logged]);
  
  useEffect(() => {
    console.log('OTP Data updated:', otpData);
  }, [otpData]);
  useEffect(() => {
    console.log('OTP Data updated2:', otpDataf);
  }, [otpDataf]);
  

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handlePhoneChange = (value, country) => {
    const splitMobile = value?.split(country?.dialCode);
    setSignUpData({
      countryCode: `+${country?.dialCode}`,
      contactno: splitMobile?.[1] || "",
    });
  };
  
  const requestOtp = () => {
    if (!signUpData.contactno) {
      console.error('Phone number is required');
      return;
    }

    if (!isTermsChecked) {
      toast.error('You must agree to the terms and conditions to request OTP.', {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }


    
    
    const encodedCountryCode = encodeURIComponent(signUpData.countryCode);
    const encodedContactno = encodeURIComponent(signUpData.contactno);
    const encodedTimeZone = encodeURIComponent(timeZone);

    const url = `https://testapi.?customerMobile=${encodedContactno}&countryCode=${encodedCountryCode}&platformType=WEBSITE&projectId=3&timeZone=${encodedTimeZone}`;

    axios.post(url, {}, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        console.log('OTP request response:', response.data);
        console.log('ID from response:', response.data.data.id); 
        setId(response.data.data.id);
        setOtpDataf(response.data);
        console.log(otpDataf);
        
        setIsSuccess(true);
        setIsClicked(false);
        setTimer(60);
        setIsResendDisabled(true);
        setIsPhoneInputDisabled(true); // Disable phone input after requesting OTP
        
        
console.log('Time Zone:', timeZone);

      })
      .catch((error) => {
        console.error('Error requesting OTP:', error);
        setIsSuccess(false);
      });
  };
   
  const submitOtp = () => {
    if (!otp || !id_1) {
      console.error('OTP or ID is empty');
      return;
    }
    

    const encodedOtp = encodeURIComponent(otp);
    const encodedUserId = encodeURIComponent(id_1);

    const url = `https://?userId=${encodedUserId}&otp=${encodedOtp}`;
    axios.post(url, {},
      { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        if (response.data.status === 'success') {
          
        setLogged(true);
      console.log('Logged:', true); // Log the logged state after setting it

      setOtpData(response.data);
      console.log('OTP Data:', response.data); // Log otpData after setting it
          if (!toastTriggered) {
            setToastTriggered(true);
            toast.success('OTP Verified Successfully!', {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
            });
            setTimeout(() => {
              onClose();
              navigate('/');
            }, 3000);
          }
        } else {
          toast.error('OTP Verification Failed!', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
          setIsResendDisabled(false);
        }
      })
      .catch((error) => {
        console.error('Error verifying OTP:', error);
      });
  };

  const handleResendOtp = () => {
    requestOtp();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('SignUpData', signUpData);
  };

  return (
    <div className='bg-cover text-black  font-poppins login-slide bg-white' ref={loginRef}>
      <div className='p-6 m-3 mx-auto rounded-lg shadow-md h-full' style={{ backgroundImage: `url(${img})` }}>
        <div className='flex justify-between'>
          <p className='text-3xl font-medium text-left mb-4'>
            {message.split('\n').map((word, index) => (
              <React.Fragment key={index}>
                {word}
                {index < message.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
          <RxCross2 size={40} className='bg-slate-300 rounded-10' onClick={onClose} />
        </div>

        <img src={logo} alt='VakilTalk Logo' className='mt-2 mb-6' />
        <p className='text-lg font-semibold mt-9 mb-6'>Login using mobile number</p>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='mobile' className='block text-black font-normal text-sm leading-18 mb-2'>
              Mobile No.
            </label>
            <PhoneInput
              country={'in'}
              value={`${signUpData.countryCode}${signUpData.contactno}`}
              onChange={handlePhoneChange}
              inputProps={{
                name: 'mobile',
                required: true,
                autoFocus: true,
                placeholder: isSuccess ? 'Phone' : 'Enter mobile number',
                disabled: isPhoneInputDisabled, // Apply disabled state here
              }}
              inputStyle={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                fontSize: '16px',
                color: '#000',
                paddingLeft: '50px',
                borderRadius: '10px',
              }}
              containerStyle={{
                width: '100%',
                borderRadius: '10px',
              }}
              buttonStyle={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}
            />
          </div>
          <div className='flex items-center mb-4'>
            <input
              type='checkbox'
              id='terms'
              className='h-5 w-5 mr-2'
              checked={isTermsChecked}
              onChange={() => setIsTermsChecked(!isTermsChecked)}
            />
            <label htmlFor='terms' className='text-sm text-gray-700'>
              By logging in, you agree to our{' '}
              <a href='#' className='text-blue-800' aria-label='Terms and conditions'>terms and conditions</a> and{' '}
              <a href='#' className='text-blue-800' aria-label='Privacy policy'>privacy policy</a>.
            </label>
          </div>
          {clicked ? (
            <button
              type='button'
              onClick={requestOtp}
              className='w-full bg-blue-500 text-white py-2 px-4 rounded-20 hover:bg-blue-600 font-medium'
            >
              Get OTP
            </button>
          ) : (
            <>
              <button
                type='button'
                className='w-full bg-white text-loblue py-2 px-4 rounded-20 font-semibold border-loblue border-2'
              >
                OTP Sent
              </button>
              <p className='my-4 font-poppins font-normal leading-18 text-sm'>Enter 4-digit OTP</p>
              <Otpinput onOtpChange={setOtp} />
              <button
                type='button'
                disabled={isResendDisabled}
                onClick={handleResendOtp}
                className={`font-poppins font-normal leading-18 text-base my-4 py-4 px-2 rounded-xl ${isResendDisabled ? 'bg-gray-300 text-white' : 'bg-white text-loblue hover:bg-lightindigo'}`}
              >
                Resend OTP {isResendDisabled && !logged && (<span className='text-red-600 text-18'>({formatTime(timer)})</span>)}
              </button>
              <button
                type='button'
                onClick={submitOtp}
                className='w-full bg-blue-500 text-white py-2 px-4 rounded-20 hover:bg-blue-600 font-medium'
              >
                Submit OTP
              </button>
            </>
          )}
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

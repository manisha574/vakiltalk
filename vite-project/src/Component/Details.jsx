import React, { useContext, useState, useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx';
import './header.css';
import TimePickerViewRenderers from './TimePickerViewRenderers';
import { StateContext } from './StateContext';
import axios from 'axios';
import dayjs from 'dayjs';
import Modal from './Modal';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { CSSTransition } from 'react-transition-group';


import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-country-state-city";

import "react-country-state-city/dist/react-country-state-city.css";

export default function Details({ onClose }) {
  const { autofilldata, otpData, lawyerKey , wait, setwait,      getcalldata, setgetcalldata,formresponse, setformresponse, chatorderId, setchatorderId,

} = useContext(StateContext);
     const [socket, setSocket] = useState(null); // Manage Socket.IO connection

  const [formData, setFormData] = useState({
    customerName: '',
    gender: 'MALE',
    birthDate: '',
    birthTime: dayjs(),  // Initialize with current time
    country: '',
    state: '',
    city: '',
    personalizationQuery: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

   const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    if (autofilldata?.status === 'success') {
      setFormData({
        customerName: autofilldata.data.customerName || '',
        gender: autofilldata.data.gender || '',
        birthDate: new Date(autofilldata.data.birthDate).toISOString().substring(0, 10),
        birthTime: autofilldata.data.birthTime ? dayjs(autofilldata.data.birthTime) : dayjs(),
        country: autofilldata.data.country || '',
        state: autofilldata.data.state || '',
        city: autofilldata.data.city || '',
        personalizationQuery: '',
      });
    }
  }, [autofilldata]);
  useEffect(() => {
    console.log(chatorderId);
  },[chatorderId])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTimeChange = (newTime) => {
    setFormData((prevData) => ({
      ...prevData,
      birthTime: newTime,
    }));
  };

  const handleCountryChange = (country) => {
    setFormData((prevData) => ({
      ...prevData,
      country: country,
      state: '',  // Reset state and city
      city: ''
    }));
  };

  const handleStateChange = (state) => {
    setFormData((prevData) => ({
      ...prevData,
      state: state,
      city: ''  // Reset city
    }));
  };

  const handleCityChange = (city) => {
    setFormData((prevData) => ({
      ...prevData,
      city: city
    }));
  };
  
  const handleSubmit = async () => {
    if (!formData.customerName || !formData.birthDate || !formData.birthTime || !formData.country || !formData.state || !formData.city) {
      setModalMessage('Please fill all mandatory fields.');
      setShowModal(true);
      return;
    }
    try {
      const formattedLawyerKey = String(lawyerKey).replace(/,$/, '');

      const payload = {
  customerId: otpData.data.id,
  birthDate: new Date(formData.birthDate).toISOString(),
  birthTime: formData.birthTime.toISOString(),
  birthPlace: `${formData.city.name}, ${formData.state.name}, ${formData.country.name}`,
  customerName: formData.customerName,
  astrologerId: formattedLawyerKey,
  gender: formData.gender,
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  comments: formData.personalizationQuery,
  platformType: 'WEBSITE',
  isFree: false,
};

// Convert payload object to a query string
const queryString = new URLSearchParams(payload).toString();

// Make the API call with query string parameters
const response = await axios.post(
  `https://testapi.astroapp.live:8082/astrologyapp/api/v1/customers/chat/form/submit?${queryString}`,
  {},
  {
    headers: {
      'Authorization': `Bearer ${otpData.data.authToken}`,
      'Content-Type': 'application/json',
      'Id': otpData.data.id,
    },
  }
);


      if (response.data.status === 'success') {
        setformresponse(response.data.data.orderId);
        try {
          const chatPayload = {
            astrologerId: formattedLawyerKey,
            customerId: otpData.data.id,
            timeZone: 'Asia/Calcutta',
            platformType: 'WEBSITE',
            appVersion: '1.0',
            orderId: response.data.data.orderId,
          };

          //x let path = "https://testapi.astroapp.live:8082/astrologyapp/api/v1/customers/testchat" + '?userId=' +  this.gS.userData?.id +'&socketToken=' + Bearer ${authToken};;

          // const socket = new SockJS(path);
          // this.stompClient = Stomp.over(socket);
          
          const chatResponse = await axios.post(
            `https://testapi.....?astrologerId=${formattedLawyerKey}&customerId=${otpData.data.id}&orderId=${response.data.data.orderId}&timeZone=Asia/Calcutta&platformType=WEBSITE&appVersion=1.0`,
            {},
            {
              headers: {
                'Authorization': `Bearer `,
                'Content-Type': 'application/json',
                'Id': otpData.data.id,
              },
            }
          );

          console.log('Chat initiation response:', chatResponse.data);
         
          if (chatResponse.data.status === 'success') {
          setchatorderId(chatResponse.data.data.chatOrderId);
            
            initialize(formresponse, otpData.data.authToken);
          }
        }
        catch (error) {
          console.error('Error initiating chat:', error);
        }
      } else {
        console.error('Form submission failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

 
  const initialize = () => {
  // Create the query string manually
  const queryString = new URLSearchParams({
    customerId: otpData.data.id,
  }).toString();

  axios.get(`https://testapi..../?${queryString}`, {
    headers: {
      'Id': otpData.data.id,
      'Authorization': `Bearer `,
    }
  })
  .then(response => {
    console.log('API response:', response.data);
    setgetcalldata(response.data);
    if (response.data.status === 'success') {
      setwait(true);
    }
  })
  .catch(error => {
    console.error('Error calling API:', error);
  });
};

 
  

  return (
    <div className='bg-white p-4 rounded-lg grid grid-rows-[auto,1fr] overflow-hidden'>
      {showModal && (
        <Modal 
          message={modalMessage} 
          onClose={() => setShowModal(false)} 
        />
      )}
      <div className='flex justify-end items-end'>
        <RxCross2 size={40} className='bg-slate-300 rounded-full cursor-pointer p-2' onClick={onClose} />
      </div>
      <div className='overflow-auto'>
        <h1 className='text-xl font-bold mb-4 my-3'>Fill Mandatory Details</h1>
        <form className='space-y-4'>
          <div>
            <label className='block mb-2'>
              Enter Full Name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              name='customerName'
              className='w-full p-2 border rounded-md'
              placeholder='Enter full name'
              value={formData.customerName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className='block mb-2'>
              Gender <span className='text-red-500'>*</span>
            </label>
            <select
              id='gender'
              name='gender'
              className='w-full p-2 border rounded-md'
              value={formData.gender || 'male'}
              onChange={handleInputChange}
              required
            >
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other'>Others</option>
            </select>
          </div>
          <div>
            <label className='block mb-2'>
              Date of Birth <span className='text-red-500 '>*</span>
            </label>
            <input
              type='date'
              name='birthDate'
              className='w-full p-2 border rounded-md'
              value={formData.birthDate}
              onChange={handleInputChange}
              required
            />
          </div>
         
          <div>
            <label className='block mb-2'>
              Time of Birth <span className='text-red-500'>*</span>
            </label>
            <TimePickerViewRenderers
              selectedTime={formData.birthTime}
              onTimeChange={handleTimeChange}
              required
            />
          </div>
           <div className='border   p-3 rounded-10'>
                        <label className='block mb-2'>
              Birth Place <span className='text-red-500'>*</span>
            </label>
          <div>
            <label className='block mb-2'>
              Country 
            </label>
            <CountrySelect
              value={formData.country}
              onChange={handleCountryChange}
              placeHolder="Select Country"
            />
          </div>
          <div>
            <label className='block mb-2'>
              State </label>
            <StateSelect
              countryid={formData.country.id}
              value={formData.state}
              onChange={handleStateChange}
              placeHolder="Select State"
            />
          </div>
          <div>
            <label className='block mb-2'>
              City 
            </label>
            <CitySelect
              countryid={formData.country.id}
              stateid={formData.state.id}
              value={formData.city}
              onChange={handleCityChange}
              placeHolder="Select City"
            />
            </div>
            </div>
          <div>
            <label className='block mb-2'>
              Personalization Query
            </label>
            <textarea
              name='personalizationQuery'
              rows='4'
              className='w-full p-2 border rounded-md'
              placeholder='Enter any specific question or detail you want the astrologer to know'
              value={formData.personalizationQuery}
              onChange={handleInputChange}
            />
          </div>
          <button
            type='button'
            className='w-full bg-blue-500 text-white p-2 rounded-md'
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
      
    </div>
  );
}

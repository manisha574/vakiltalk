import React, { useContext, useState } from 'react';
import axios from 'axios';
import { StateContext } from './StateContext';
import ChatInterface from './ChatInterface';
import './wait.css';

export default function Wait() {
  const { getcalldata, chatorderId, otpData,showChat, setShowChat ,wait,setwait} = useContext(StateContext);  
 
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
  const data = getcalldata?.data?.[0];

  const isRinging = data?.serviceStatus === 'IN_PROGRESS';

  const onChatButtonClick = async () => {
    try {
      const response = await axios.post(
        `https://testapi.astroapp.live:8082/astrologyapp/api/v1/receive/chat/by/user?chatOrderId=${chatorderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${otpData?.data?.authToken}`,
            'Content-Type': 'application/json',
            Id: otpData?.data?.id,
          }
        }
      );

      if (response.data.status === 'success') {
        setShowChat(true);
        setwait(false);
      } else {
        setError(response.data.reason);
        setShowPopup(true); // Show the popup if the status is not 'success'
      }
    } catch (error) {
      console.error('Error receiving chat:', error);
      setError('Failed to receive chat.');
      setShowPopup(true); // Show the popup if an error occurs
    }
  };

  // Handle popup close
  const closePopup = () => {
    setShowPopup(false);
    setError(null); // Clear the error message when closing the popup
  };

  //  if (showChat) {
  //   return <ChatInterface />;
  // }

  return (
    <div className='wait bg-white w-full h-40 shadow-2xl shadow-gray-600 space-x-4 grid grid-flow-col relative'>
      <div className='flex'>
        {data?.astrologerProfile ? (
          <img 
            src={data.astrologerProfile} 
            alt={`${data?.astrologerName}'s Profile`} 
            className='w-24 h-24 m-7 p-1 border-blue-700 border-2 rounded-full'
          />
        ) : (
          <p>No profile picture available</p>
        )}
        <div className='m-7'>
          <p className='font-medium p-2 text-lg text-shadow'>{data?.astrologerName || "No name available"}</p> 
          <p className='font-medium p-2 text-customBlue'>{data?.viewMessage || "No message available"}</p>
        </div>
      </div>
      <div>
        <button
          className={`bg-green-500 text-white text-xl font-medium w-64 h-10 rounded-md m-8 ${isRinging ? 'ring' : ''}`}
          onClick={data?.serviceStatus === 'IN_PROGRESS' ? onChatButtonClick : undefined}
          disabled={data?.serviceStatus !== 'IN_PROGRESS'}
        >
          {data?.serviceStatus === 'WAITING' ? "Waiting" : data?.serviceStatus === 'IN_PROGRESS' ? "Chat Now" : "Unknown"}
        </button>
      </div>

      {/* Popup for error message */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full shadow-blue-600">
            
            <p className="mb-4 text-xl font-medium">{error}</p>
            <button 
              onClick={closePopup} 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

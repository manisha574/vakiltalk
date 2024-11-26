import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { StateContext } from './StateContext';

import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChatInterface = () => {
  const { otpData, chatorderId, formresponse, showChat, setShowChat } = useContext(StateContext);
  const [chatAccepted, setChatAccepted] = useState(false);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState({});
  const [timer, setTimer] = useState(0);
  const [stompClient, setStompClient] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [again, setagain] = useState(true);

  useEffect(() => {
    const fetchStatusAndHistory = async () => {
      try {
        const statusResponse = await axios.get(
          `https://testapi.astroapp.live:8082/astrologyapp/get/status?orderId=${formresponse}`,
          {
            headers: {
              Authorization: `Bearer ${otpData.data.authToken}`,
              'Content-Type': 'application/json',
              Id: otpData.data.id,
            }
          }
        );

        const historyResponse = await axios.get(
          `https://.......?customerId=${otpData.data.id}&orderId=${chatorderId}&pageNo=0&pageSize=500`,
          {
            headers: {
              Authorization: `Bearer `,
              'Content-Type': 'application/json',
              Id: otpData.data.id,
            }
          }
        );

        if (historyResponse.data.status === 'success') {
          const chatData = historyResponse.data.data[0];
          if (chatData) {
            setMessages(chatData.chatMessages);
            if (again === true) startWebSocket(); // Start WebSocket after successful history fetch
          } else {
            setError('No chat data found.');
          }
          setStatus(chatData.chatStatus);
        } else {
          setError('Failed to fetch chat history.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch status or chat history.');
      }
    };

    fetchStatusAndHistory();
  }, [chatAccepted, otpData, chatorderId, formresponse, again]);

  const startWebSocket = () => {
    const socket = new SockJS(`https://testapi......?UserId=${otpData.data.id}&socketToken=Bearer ${otpData.data.authToken}`);
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      setIsConnected(true); // Set to true when WebSocket is connected

      stompClient.subscribe(`/topic/${chatorderId}/initial`, (message) => {
        const chatMessage = JSON.parse(message.body);

        setMessages((prevMessages) => {
          const messageExists = prevMessages.some(
            (msg) => msg.chatMessage === chatMessage.chatMessage && msg.createdAt === chatMessage.createdAt
          );
          
          if (!messageExists) {
            return [...prevMessages, chatMessage];
          }
          return prevMessages;
        });
      });
    });

    setStompClient(stompClient);
  };

  useEffect(() => {
    if (status.pendingChatTime) {
      setTimer(status.pendingChatTime * 60); // Convert minutes to seconds
    }
  }, [status.pendingChatTime]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(intervalId);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000); // Update timer every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours}h ${minutes}m ${secs}s`;
  };

  const handleEndCall = async () => {
    console.log('Ending the call...');

    const confirmEndChat = window.confirm('Are you sure you want to end the chat?');
    if (confirmEndChat) {
      if (stompClient) {
        stompClient.disconnect(() => {
          console.log('WebSocket disconnected.');
          setIsConnected(false); // Set to false when WebSocket disconnects
          setTimer(0); // Optionally reset the timer
        });
      }
    } else {
      console.log('Chat not ended.');
    }

    try {
      const response = await axios.post(
        `https://testapi.........?chatOrderId=${chatorderId}`, // Add chatOrderId as a query parameter
        {},
        {
          headers: {
            Authorization: `Bearer ***`,
            'Content-Type': 'application/json',
            Id: otpData?.data?.id,
          },
        }
      );

      if (response.data.status === "success") {
        try {
          const transactionResponse = await axios.get(
            `https://testapi.........?customerId=${otpData.data.id}&pageNo=0&pageSize=0`,
            {
              headers: {
                Authorization: `Bearer ****`,
                'Content-Type': 'application/json',
                Id: otpData?.data?.id,
              },
            }
          );

          if (transactionResponse.data.status === "success") {
            setagain(false);
            setShowChat(false);
          }
        } catch (error) {
          console.error('Error fetching wallet transactions:', error);
        }
      }
       else {
        // Handle both 'fail' status and any other unexpected statuses
       toast.error(response.data.reason || 'Failed to end chat!', {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
            setagain(false);
            setShowChat(false);
       
       
          }
    } catch (error) {
      console.error('Error completing chat', error);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return; // Don't send empty messages
    const receiverId = messages.length > 0 ? messages[0].receiverId : null;

    const messageToSend = {
      senderId: otpData.data.id,
      chatMessage: newMessage,
      createdAt: new Date().toISOString(),
      receiverId: receiverId,
      messageType: "TEXT",
    };

    stompClient.send(`/topic/${chatorderId}/initial`, {}, JSON.stringify(messageToSend)); // Sending message to WebSocket
    setMessages((prevMessages) => [...prevMessages, messageToSend]); // Immediately add to messages for instant feedback
    setNewMessage(''); // Clear input field
  };

  return (
    <div className='bg-white w-2/4 h-full'>
      <div className='bg-loblue flex justify-between items-center p-4'>
        <div className='flex items-center'>
          <img src={status.profilePic} alt='image' className='h-14 w-14 rounded-full' />
          <div className='m-3 text-white'>
            <h1 className='text-2xl font-semibold'>{status.astrologerName}</h1>
            {isConnected && <h1 className='text-xl'>Pending Chat Time: {formatTime(timer)}</h1>}
          </div>
        </div>
        <div>
          <button 
            onClick={handleEndCall}
            className='rounded-md bg-red-600 text-white border-2 border-white py-2 px-4 hover:bg-red-700 transition'
          >
            End Call
          </button>
        </div>
      </div>
      {error && <p className='text-red-500 text-center'>{error}</p>}
      
      <div className='mt-4 p-4 overflow-y-scroll h-96'>
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div key={index} className={`p-2 border-b border-gray-300 ${message.senderId === otpData.data.id ? 'text-right' : 'text-left'}`}>
              <p className='font-semibold'>{message.senderId === otpData.data.id ? "You:" : "Lawyer:"}</p>
              <p className={`inline-block rounded-lg p-2 ${message.senderId === otpData.data.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                {message.chatMessage}
              </p>
              <p className='text-gray-500 text-sm'>{new Date(message.createdAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className='text-center text-gray-500'>No messages yet.</p>
        )}
      </div>

      <div className='flex items-center p-4 border-t'>
        <input 
          type='text'
          className='flex-grow p-2 border rounded-md'
          placeholder='Type a message'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className='ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition'
        >
          Send
        </button>
      </div>
           <ToastContainer />
    </div>
  );
};

export default ChatInterface;

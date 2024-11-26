// MainComponent.js
import React from 'react';

import { BiMessageRoundedDetail } from 'react-icons/bi';
import { FiPhoneCall } from 'react-icons/fi';
import { BsCameraVideo } from 'react-icons/bs';
import Service2 from './Service2';

const Service2main = ({ chatcost, callcost, videocall, }) => {
  return (
    <div className='flex items-center space-x-4'>
      <Service2
        icon={BiMessageRoundedDetail}
        label="Chat"
              cost={chatcost}
              icon2={FiPhoneCall}
              label2="Call"
              cost2={callcost}
              
      />
     
      
    </div>
  );
};

export default Service2main;

// MainComponent.js
import React from 'react';

import { BiMessageRoundedDetail } from 'react-icons/bi';
import { FiPhoneCall } from 'react-icons/fi';
import { BsCameraVideo } from 'react-icons/bs';
import Service from './Service';

const Servicemain = ({ chatcost, callcost, videocall }) => {
  return (
    <div className='flex items-center space-x-4'>
      <Service
        icon={BiMessageRoundedDetail}
        label="Chat"
        cost={chatcost}
      />
      <Service
        icon={FiPhoneCall}
        label="Call"
        cost={callcost}
      />
      <Service
        icon={BsCameraVideo}
        label="Video"
        cost={videocall}
      />
    </div>
  );
};

export default Servicemain;

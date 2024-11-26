import React, { useState, useRef } from 'react';

const Otpinput = ({ onOtpChange }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    onOtpChange(newOtp.join(''));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className='flex space-x-2'>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputRefs.current[index] = el)}
          maxLength="1"
          className='w-10 h-10 text-center border-2 border-gray-300 rounded-xl font-semibold leading-18 text-sm font-poppins'
          inputMode='numeric' // Ensures numeric keyboard on mobile devices
        />
      ))}
    </div>
  );
};

export default Otpinput;

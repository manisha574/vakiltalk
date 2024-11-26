import React from 'react';

export default function OService({ image, label }) {
  return (
    <div className="bg-lightindigo w-64 h-44 p-4 m-4 rounded-xl shadow-lg flex flex-col items-center justify-center">
      <img src={image} alt="service" className="w-20 h-20 mb-3" />
      <p className="text-black font-normal text-lg leading-6 text-center">
        {label.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < label.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
}

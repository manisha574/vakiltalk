import React from 'react';

const Modal = ({ message, onClose }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded-md shadow-lg'>
        <h2 className='text-lg font-bold mb-4'>Error</h2>
        <p>{message}</p>
        <button
          className='mt-4 bg-blue-500 text-white p-2 rounded-md'
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;

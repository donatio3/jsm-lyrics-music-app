import React from 'react';

const Error = ({message}) => (
  <div className='w-full flex justify-center items-center -z-100'>
    <h1 className='font-bold text-2xl text-white mt-2 z-0'>{message || 'something went wrong. Please try again.'}</h1>
  </div>
  
);

export default Error;

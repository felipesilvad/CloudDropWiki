import React from 'react';

function EventLoading({key, height}) {

  return (
    <div 
      key={key} 
      className="skeleton animate-flicker d-flex align-items-center justify-content-center"
      style={{height: height}}
    >
    </div>
  );
}

export default EventLoading;
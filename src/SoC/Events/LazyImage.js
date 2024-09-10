import React, { useState } from 'react';

const LazyImage = ({ src, alt, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const eventImg =  require('../assets/img/0020.jpg')

  return (
    <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
      {!isLoaded && (
        <div className="skeleton animate-flicker d-flex align-items-center justify-content-center">
          <img src={eventImg} className='event-img opacity-0' alt='event-loading' />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        style={{ display: isLoaded ? 'block' : 'none', width: '100%', height: 'auto' }}
        {...props}
      />
    </div>
  );
};

export default LazyImage;

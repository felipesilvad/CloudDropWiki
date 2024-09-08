import React, { useState } from 'react';
import { tailspin } from 'ldrs'

const LazyImage = ({ src, alt, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  tailspin.register()

  return (
    <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
      {!isLoaded && (
        <div className="skeleton animate-flicker d-flex align-items-center justify-content-center">
          {/* <l-tailspin
            size="60"
            stroke="5"
            speed="1.6" 
            color="gray" 
          ></l-tailspin> */}
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

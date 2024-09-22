import React, { useState, useRef } from 'react';
// import {IKImage} from 'imagekitio-react';
// import { Image } from 'react-bootstrap';
import { Image } from 'cloudinary-react';


const LazyImageEvent = ({publicID, id, alt,i,width, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const windowWidth = useRef(window.innerWidth);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  // const urlEndpoint = 'https://ik.imagekit.io/clouddrop/soc/';

  return (
    <>
      {(!isLoaded&&(
        <div className="skeleton animate-flicker d-flex align-items-center justify-content-center">
        </div>
      ))}
      {(windowWidth.current<768&&(i===0))?(
        <Image 
          cloudName="cdwiki" onLoad={handleImageLoad} alt={alt}
          {...props} publicId={publicID} width={width} crop="scale"
          fetchpriority="high"
        />
      ):(
        <Image
          cloudName="cdwiki" onLoad={handleImageLoad} alt={alt}
          {...props} publicId={publicID} width={width} crop="scale"
        />
      )}
    </>
  );
};

export default LazyImageEvent;

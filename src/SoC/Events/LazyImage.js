import React, { useState, useRef } from 'react';
import { Image } from 'react-bootstrap';
import {IKImage} from 'imagekitio-react';

const LazyImage = ({ path, alt,i, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const windowWidth = useRef(window.innerWidth);
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const urlEndpoint = 'https://ik.imagekit.io/clouddrop/soc/';

  // // optional parameters (needed for client-side upload)
  // const publicKey = 'public_0jQUxWVJT+tWidT6ZMl5ipcjwD0='; 
  // const authenticator = ()=>{
  //   return new Promise((resolve,reject)=>{
  //     resolve({signature,token,expiry})
  //   })
  // };


  return (
    <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
      {!isLoaded && (
        <div className="skeleton animate-flicker d-flex align-items-center justify-content-center">
          <h5 className='d-none'>Sword of Convallaria Latest News</h5>
        </div>
      )}
      {(windowWidth.current<768&&(i===0))?(
          <IKImage
            urlEndpoint={urlEndpoint}
            path={path}
            width="400"
            onLoad={handleImageLoad}
            fetchpriority="high"
            alt={alt}
          />
          // <Image
          //   src={src}
          //   alt={alt}
            
          //   style={{ display: isLoaded ? 'block' : 'none', width: '100%', height: 'auto' }}
          //   {...props}
          // />
        ):(
          // <Image
          //   src={src}
          //   alt={alt}
          //   onLoad={handleImageLoad}
          //   style={{ display: isLoaded ? 'block' : 'none', width: '100%', height: 'auto' }}
          //   {...props}
          // />
          <IKImage
            urlEndpoint={urlEndpoint}
            path={path}
            width="400"
            onLoad={handleImageLoad}
            alt={alt}
          />
        )}
    </div>
  );
};

export default LazyImage;

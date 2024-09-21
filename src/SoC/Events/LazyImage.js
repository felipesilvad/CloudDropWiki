import React, { useState, useRef } from 'react';
import {IKImage} from 'imagekitio-react';
// import { Image } from 'react-bootstrap';
import { Image } from 'cloudinary-react';


const LazyImage = ({ path, alt,i, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const windowWidth = useRef(window.innerWidth);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const urlEndpoint = 'https://ik.imagekit.io/clouddrop/soc/';

  const url = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/events%2F0023.jpg?alt=media&token=05c9721e-f20d-4c2a-a1a5-0271dd372e29`

  return (
    <div style={{ position: 'relative', width: '100%', height: 'auto'}}>
      {(!isLoaded&&(
        <div className="skeleton animate-flicker d-flex align-items-center justify-content-center">
        </div>
      ))}
      {/* <Image cloudName="your_cloud_name" publicId="sample_image_w_300,h_300,c_fill,e_sepia,l_text:Arial_60:Hello" /> */}
      {/* <Image cloudName="CDwiki" onLoad={handleImageLoad} alt={alt} {...props} publicId="2f17ab7ec492a18cfe76f7125ba25eda" width="600" crop="scale" /> */}
      {/* <Image src={url} onLoad={handleImageLoad} alt={alt} {...props} /> */}
      {urlEndpoint&&path&&(
        (windowWidth.current<768&&(i===0))?(
          <IKImage
            urlEndpoint={urlEndpoint}
            path={path}
            width="200"
            onLoad={handleImageLoad}
            fetchpriority="high"
            alt={alt}
            transformation={[{
              width: 600
            }]}
            {...props}
          />
        ):(
          <IKImage
            urlEndpoint={urlEndpoint}
            path={path}
            width="200"
            onLoad={handleImageLoad}
            alt={alt}
            transformation={[{
              width: 600
            }]}
            {...props}
          />
        )
      )}
    </div>
  );
};

export default LazyImage;

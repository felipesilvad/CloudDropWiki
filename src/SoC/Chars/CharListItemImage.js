import React, {useState} from 'react';
import {IKImage} from 'imagekitio-react';

function CharListItemImage({path, className, ...props}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <IKImage
      urlEndpoint={'https://ik.imagekit.io/clouddrop/soc/'}
      path={path}
      height="auto"
      className={`${className} ${!isLoaded&&('d-none')}`}
      onLoad={handleImageLoad}
      {...props}
    />
  );
}

export default CharListItemImage;
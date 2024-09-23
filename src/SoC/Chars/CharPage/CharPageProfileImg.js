import React, {useState} from 'react';
import {Col} from 'react-bootstrap';
import {IKImage} from 'imagekitio-react';

function CharPageProfileImg({rarity, slug}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const handleImageLoad = () => {
    setIsLoaded(true);
  };


  return (
    <Col xs={3}>
      {!isLoaded&&(
        <div className='profile-img-div animate-flicker' style={{
          backgroundImage: "url(" + require(`../../assets/img/unit_bg_Rare.png`) + ")"
        }}>
        </div>
      )}
      <div className={`profile-img-div ${!isLoaded&&("d-none")}`} 
        style={{
          backgroundImage: "url(" + require(`../../assets/img/unit_bg_${rarity}.png`) + ")"
        }}>
        <IKImage
          urlEndpoint={'https://ik.imagekit.io/clouddrop/soc/'}
          path={`chars/${slug}_profile.png`}
          fetchpriority="high"
          alt="profile-img"
          className='profile-img'
          transformation={[{
            width: 450
          }]}
          width="450"
          height="auto"
          onLoad={handleImageLoad}
        />
        {/* <Image className='profile-img' alt='profile-img' src={profile} width={"inherit"} height={"20rem"} /> */}
      </div>
    </Col>
  );
}

export default CharPageProfileImg;
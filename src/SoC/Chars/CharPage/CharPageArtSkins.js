import React, {useState, useEffect} from 'react';
import {Col} from 'react-bootstrap';
import {IKImage} from 'imagekitio-react';
import { trio } from 'ldrs'

function CharPageArtSkins({rarity, slug}) {
  const [art, setArt] = useState('Main');
  trio.register()

  useEffect(() => {
    if (rarity === "Legendary") {setArt("Awaken")}
    else {setArt("Main")}
  }, [rarity]);

  const [isLoaded, setIsLoaded] = useState(false);
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  
  return (
    <Col md={8} >
      <div className='d-flex'>
        {rarity==="Legendary"&&(
          <div className={`art-bg mx-1 px-2 ardela ${(art==="Awaken")&&('art-active')}`}
            onClick={() => setArt("Awaken")}>Awaken</div>
        )}
        <div className={`art-bg mx-1 px-2 ardela ${(art==="Main")&&('art-active')}`}
          onClick={() => setArt("Main")}>Main Art</div>
      </div>
      
      {(art==="Awaken")&&(
        <div className='d-flex justify-content-center'>
          <IKImage
            urlEndpoint={'https://ik.imagekit.io/clouddrop/soc/'}
            path={`chars/${slug}_awaken.png`}
            alt={slug+"_awaken"}
            className='art-img'
            transformation={[{
              width: 600
            }]}
            width="600"
            height="auto"
            loading='lazy'
            fetchPriority='low'
            onLoad={handleImageLoad}
          />
          {!isLoaded&&(
            <div className='d-flex jsutify-content-center align-items-center'>
              <l-trio size="40" stroke="3" speed="1" color="white" ></l-trio>
            </div>
          )}
        </div>
      )}
      {(art==="Main")&&(
        <div className='d-flex justify-content-center'>
          <IKImage
            urlEndpoint={'https://ik.imagekit.io/clouddrop/soc/'}
            path={`chars/${slug}_full.png`}
            alt={slug+"_full_art"}
            transformation={[{
              width: 600
            }]}
            width="auto"
            className='art-img-full'
            height="auto"
            loading='lazy'
            fetchPriority='low'
          />
          {/* <Image className='art-img-full' src={full} alt= width={"auto"} height={"auto"} /> */}
        </div>
      )}
    </Col>
  );
}

export default CharPageArtSkins;
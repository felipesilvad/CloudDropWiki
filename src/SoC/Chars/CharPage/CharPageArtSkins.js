import React, {useState, useEffect} from 'react';
import {Col} from 'react-bootstrap';
import {IKImage} from 'imagekitio-react';

function CharPageArtSkins({rarity, slug}) {
  const [art, setArt] = useState('Main');

  useEffect(() => {
    if (rarity === "Legendary") {setArt("Awaken")}
    else {setArt("Main")}
  }, [rarity]);
  
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
          />
          {/* <Image className='art-img' src={awaken} alt={slug+"_awaken_art"} width={"auto"} height={"auto"} /> */}
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
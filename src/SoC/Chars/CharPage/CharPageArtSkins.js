import React, {useState, useEffect} from 'react';
import {Col, Image} from 'react-bootstrap';

function CharPageArtSkins({rarity, slug}) {
  const [art, setArt] = useState('Main');

  const awaken = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/chars%2F${slug}_awaken.png?alt=media`
  const full = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/chars%2F${slug}_full.png?alt=media`

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
        <div className='art-img-div'>
          <Image className='art-img' src={awaken} alt={slug+"_awaken_art"} width={"auto"} height={"auto"} />
        </div>
      )}
      {(art==="Main")&&(
        <div className='d-flex justify-content-center'>
          <Image className='art-img-full' src={full} alt={slug+"_full_art"} width={"auto"} height={"auto"} />
        </div>
      )}
    </Col>
  );
}

export default CharPageArtSkins;
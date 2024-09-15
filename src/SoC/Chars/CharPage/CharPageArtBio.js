import React from 'react';
import {Col, Image} from 'react-bootstrap';

function CharPageArtBio({slug, biography}) {
  const sprite = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/chars%2F${slug}.gif?alt=media`

  return (
    <Col>
      {biography?(  
        <div className='char-bio'>
          <h3 className='mx-2'>Biography</h3>
          <Image src={sprite} alt={slug+"_sprite_idle"} width={"auto"} height={"auto"}
          className="pixel-bio"/>
          <p className='char-bio-txt' dangerouslySetInnerHTML={{__html: biography}}></p>
        </div>
      ):(
        <Image src={sprite} 
        alt={slug+"_sprite_idle"} width={"auto"} height={"auto"} class="pixel-bio"/>
      )}
    </Col>
  );
}

export default CharPageArtBio;
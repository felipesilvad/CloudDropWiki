import React from 'react';
import {Col, Image} from 'react-bootstrap';

function CharPageArtBio({slug, biography, cv_cn, cv_jp, title}) {
  const sprite = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/chars%2F${slug}.gif?alt=media`

  return (
    <Col>
      {biography?(  
        <div className='char-bio px-1'>
          <div >
            <h4 className='p-2'>{title}</h4>
            <Image src={sprite} alt={slug+"_sprite_idle"} width={"auto"} height={"auto"}
            className="pixel-bio"/>
            {(cv_jp||cv_cn)?(
              <div className='w-100 cv-div'>
                <h5>Voice Actors</h5>
                {cv_jp&&(
                  <div>JP: <b>{cv_jp}</b></div>
                )}
                {cv_cn&&(
                  <div>CN: <b>{cv_cn}</b></div>
                )}
              </div>
            ):('')}
          </div>
          <h4 className='bio-title mx-2'>Biography</h4>
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
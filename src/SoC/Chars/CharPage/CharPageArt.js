import React from 'react';
import {Row} from 'react-bootstrap';
import CharPageArtSkins from './CharPageArtSkins';
import CharPageArtBio from './CharPageArtBio';

function CharPageArt({rarity, slug, biography}) {

  return (
    <>
      <div className='black-label-div mt-2'>
        <h5>
          ART
        </h5>
      </div>
      
      <div className='ligter-bg'>
        <Row>
          <CharPageArtSkins rarity={rarity} slug={slug} />
          <CharPageArtBio slug={slug} biography={biography} />
        </Row>
      </div>
    </>
  );
}

export default CharPageArt;
import React from 'react';
import {Row} from 'react-bootstrap';
import CharPageArtSkins from './CharPageArtSkins';
import CharPageArtBio from './CharPageArtBio';

function CharPageArt({rarity, slug, biography, cv_cn, cv_jp, title}) {

  return (
    <>
      <div className='black-label-div mt-2'>
        <h5>
          ART
        </h5>
      </div>
      
      <div className='black-bg p-1'>
        <Row>
          <CharPageArtSkins rarity={rarity} slug={slug} />
          <CharPageArtBio slug={slug} biography={biography} cv_cn={cv_cn} cv_jp={cv_jp} title={title} />
        </Row>
      </div>
    </>
  );
}

export default CharPageArt;
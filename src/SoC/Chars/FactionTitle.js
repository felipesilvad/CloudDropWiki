import React from 'react';
import { Image } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip'
import CharFace from './CharFace';

function FactionTitle({faction,chars,effect}) {
  if (faction) {
    return (
      <>
        <div key={faction.slug} id={faction.slug}
        className={`${!effect&&("my-3")} mx-1 faction-title-div d-inline-flex align-items-center ${faction.slug}-bg`}>
          <Image className={`faction-img ${effect&&('faction-img-effect')}`} src={faction.img} alt={faction.slug} width={"inherit"} height={"inherit"} />
          <div className={`faction-title ${effect&&('faction-title-effect')}`}>
            {faction.title}
          </div>
        </div>
        <Tooltip className='tooltip' anchorSelect={`#${faction.slug}`} place="bottom-center">
          <b>{faction.title}</b>
          <div className='d-flex flex-wrap'>
            {chars&&(chars.filter(x => x.factions.includes(faction.title)).map(char => (
              <CharFace char={char} />              
            )))}
          </div>
        </Tooltip>
      </>
    );
  }
}

export default FactionTitle;
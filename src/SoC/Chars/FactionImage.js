import React from 'react';
import { Image } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip'
import CharFace from './CharFace';
import { orbit } from 'ldrs'

function FactionImage({faction,chars}) {
  orbit.register()

  if (faction) {
    return (
      <div key={faction.slug}>
        <Tooltip className='tooltip' anchorSelect={`#${faction.slug}`} place="bottom-end">
          <b>{faction.title}</b>
          <div className='d-flex flex-wrap'>
            {chars&&(chars.filter(x => x.factions.includes(faction.title)).map(char => (
              <CharFace char={char} />              
            )))}
          </div>
        </Tooltip>
        <Image className='faction-icon' id={faction.slug} src={faction.img} alt={faction.slug} width={"inherit"} height={"inherit"} />
      </div>
    );
  } else {
    <l-orbit
      key={faction.slug}
      size="35"
      speed="1.5" 
      color="black" 
    ></l-orbit>
  }
}

export default FactionImage;
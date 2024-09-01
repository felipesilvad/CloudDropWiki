import React, {useState,useEffect} from 'react';
import { Image } from 'react-bootstrap';
import slugify from 'react-slugify';
import { doc, onSnapshot,} from 'firebase/firestore';
import db from '../../firebase';
import { Tooltip } from 'react-tooltip'
import CharFace from './CharFace';

function FactionImage({slug,chars}) {
  const [faction, setFaction] = useState()

  useEffect(() => {
    onSnapshot(doc(db, "games/soc/factions/", slugify(slug, { delimiter: '_' })), (doc) => {
      setFaction(doc.data());
    });
  }, [slug]);

  if (faction) {
    return (
      <div key={slugify(slug, { delimiter: '_' })}>
        <Tooltip className='tooltip' anchorSelect={`#${slugify(slug, { delimiter: '_' })}`} place="bottom-end">
          <b>{faction.title}</b>
          <div className='d-flex flex-wrap'>
            {chars&&(chars.filter(x => x.factions.includes(slug)).map(char => (
              <CharFace char={char} />              
            )))}
          </div>
        </Tooltip>
        <Image className='faction-icon' id={slugify(slug, { delimiter: '_' })} src={faction.img} />
      </div>
    );
  }
}

export default FactionImage;
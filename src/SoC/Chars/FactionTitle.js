import React, {useState,useEffect} from 'react';
import { Image } from 'react-bootstrap';
import slugify from 'react-slugify';
import { doc, onSnapshot,} from 'firebase/firestore';
import db from '../../firebase';
import { Tooltip } from 'react-tooltip'
import CharFace from './CharFace';

function FactionTitle({slug,chars,effect}) {
  const [faction, setFaction] = useState()
  const rarityOrder = ['Legendary', 'Epic', 'Rare', 'Common'];

  useEffect(() => {
    onSnapshot(doc(db, "games/soc/factions/", slugify(slug, { delimiter: '_' })), (doc) => {
      setFaction(doc.data());
    });
  }, [slug]);

  if (faction) {
    return (
      <>
        <div key={slugify(slug, { delimiter: '_' })} id={slugify(slug, { delimiter: '_' })}
        className={`${!effect&&("my-3")} mx-1 faction-title-div d-inline-flex align-items-center ${slugify(slug)}-bg`}>
          <Image className={`faction-img ${effect&&('faction-img-effect')}`} src={faction.img} />
          <div className={`faction-title ${effect&&('faction-title-effect')}`}>
            {faction.title}
          </div>
        </div>
        <Tooltip className='tooltip' anchorSelect={`#${slugify(slug, { delimiter: '_' })}`} place="bottom-center">
          <b>{faction.title}</b>
          <div className='d-flex flex-wrap'>
            {chars&&(chars.sort((a, b) => {
              return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
            }).filter(x => x.factions.includes(slug)).map(char => (
              <CharFace char={char} />              
            )))}
          </div>
        </Tooltip>
      </>
    );
  }
}

export default FactionTitle;
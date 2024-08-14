import React, {useState,useEffect} from 'react';
import { Image } from 'react-bootstrap';
import slugify from 'react-slugify';
import { doc, onSnapshot,} from 'firebase/firestore';
import db from '../../firebase';
import { Tooltip } from 'react-tooltip'


function FactionImage({slug}) {
  const [faction, setFaction] = useState()

  useEffect(() => {
    onSnapshot(doc(db, "games/soc/factions/", slugify(slug, { delimiter: '_' })), (doc) => {
      setFaction(doc.data());
    });
  }, [slug]);

  if (faction) {
    return (
      <div key={faction.slug}>
        <Tooltip anchorSelect={`#${faction.slug}`} place="bottom-end">
          {faction.title}
        </Tooltip>
        <Image className='faction-icon' id={faction.slug} src={faction.img} />
      </div>
    );
  }
}

export default FactionImage;
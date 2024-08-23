import React, {useState,useEffect} from 'react';
import { doc, onSnapshot} from 'firebase/firestore';
import db from '../../firebase';
import TraitListItem from '../Skills/TraitListItem';

function GetTraitDoc({slug, blueEffects, chars, boss}) {
  const [trait, setTrait] = useState()
  useEffect(() => {
    onSnapshot(doc(db, "games/soc/traits/", slug), (doc) => {
      setTrait(doc.data());
    });
  }, [slug]);

  if (trait) {
    return (
      <TraitListItem trait={trait} blueEffects={blueEffects} char={chars} boss={boss} />
    );
  }
}

export default GetTraitDoc;
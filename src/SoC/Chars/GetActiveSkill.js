import React, {useState,useEffect} from 'react';

import { doc, onSnapshot} from 'firebase/firestore';
import db from '../../firebase';
import SkillListItem from '../Skills/SkillListItem';

function GetActiveSkill({slug, blueEffects, chars, w100}) {
  const [skill, setSkill] = useState()
  useEffect(() => {
    onSnapshot(doc(db, "games/soc/skills/", slug), (doc) => {
      setSkill(doc.data());
    });
  }, [slug]);

  if (skill) {
    return (
      <SkillListItem skill={skill} blueEffects={blueEffects} chars={chars} w100={w100} />
    );
  }
}

export default GetActiveSkill;
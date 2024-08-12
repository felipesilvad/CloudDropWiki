import React, {useState,useEffect} from 'react';
import { Image } from 'react-bootstrap';
import slugify from 'react-slugify';
import { doc, onSnapshot,query, collection} from 'firebase/firestore';
import db from '../../firebase';
import { Tooltip } from 'react-tooltip'
import EffectTxt from '../Effect/EffectTxt';

function CharSkill({slug}) {

  const [skill, setSkill] = useState()
  console.log("games/soc/skills/", slug)
  useEffect(() => {
    onSnapshot(doc(db, "games/soc/skills/", slug), (doc) => {
      setSkill(doc.data());
    });
  }, [slug]);

  if (skill) {
    return (
      <div className='char-detail-bg px-2'>
        <div className='trait-div d-flex align-items-center'>
          <div className='trait-title d-flex align-items-center'>
            <Image className='trait-img' src={`https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/skills%2F${skill.img}.png?alt=media&token=a0eb4570-8b1d-4859-8a66-90f4e32b2896`} />
            <div className='skill-category'>{skill.category}</div>
              <b className='trait-title-txt'>
              {skill.title}
            </b>
          </div>
        </div>

        <div>
          <EffectTxt txt={skill.effect} />
        </div>

        <div className='skill-range-div'>

        </div>
      </div>
    );
  }
}

export default CharSkill;
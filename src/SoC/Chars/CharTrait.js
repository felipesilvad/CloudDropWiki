import React, {useState,useEffect} from 'react';
import { Image } from 'react-bootstrap';
import slugify from 'react-slugify';
import { doc, onSnapshot,query, collection} from 'firebase/firestore';
import db from '../../firebase';
import { Tooltip } from 'react-tooltip'
import EffectTxt from '../Effect/EffectTxt';

function CharTrait({slug}) {
  // const sprite = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/chars%2F${char.slug}.gif?alt=media`
  const [trait, seTrait] = useState()
  console.log("games/soc/traits/", slug)
  useEffect(() => {
    onSnapshot(doc(db, "games/soc/traits/", slug), (doc) => {
      seTrait(doc.data());
    });
  }, [slug]);

  if (trait) {
    return (
      <div className='char-detail-bg px-2'>
        <div className='trait-div d-flex align-items-center'>
          <div className='trait-title d-flex align-items-center'>
            <Image className='trait-img' src={`https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/skills%2F${trait.img}.png?alt=media&token=a0eb4570-8b1d-4859-8a66-90f4e32b2896`} />
            <b className='trait-title-txt'>
              {trait.title}
            </b>
          </div>
        </div>

        <div>
          <EffectTxt txt={trait.effects[4]} />
        </div>
      </div>
    );
  }
}

export default CharTrait;
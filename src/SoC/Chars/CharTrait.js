import React, {useState,useEffect} from 'react';
import { Image } from 'react-bootstrap';
import { doc, onSnapshot} from 'firebase/firestore';
import db from '../../firebase';
import EffectTxt from '../Effect/EffectTxt';

function CharTrait({slug,blueEffects}) {
  const [trait, seTrait] = useState()

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
              <div className='trait-img-container'>
                <Image className='trait-img background' src={`https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/skills%2F${trait.img}.png?alt=media&token=a0eb4570-8b1d-4859-8a66-90f4e32b2896`} />
                <Image className='trait-img foreground' src={require(`../assets/img/skill-${(trait.rarity)?(trait.rarity):('Legendary')}.png`)} />
              </div>
            <b className='trait-title-txt'>
              {trait.title}
            </b>
          </div>
        </div>

        <div>
          <EffectTxt blueEffects={blueEffects} text={trait.effects[0]} />
        </div>
      </div>
    );
  }
}

export default CharTrait;
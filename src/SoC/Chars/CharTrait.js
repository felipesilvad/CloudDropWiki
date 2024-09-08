import React, {useState} from 'react';
import { Image } from 'react-bootstrap';
import EffectTxt from '../Effect/EffectTxt';

function CharTrait({trait,blueEffects,chars}) {
  const [showStars, setShowStars] = useState(false)

  if (trait) {
    return (
      <div className='char-detail-bg px-2'>
        <div className='trait-div d-flex align-items-center'>
          <div className='trait-title d-flex align-items-center'>
              <div className='trait-img-container'>
                <Image className='trait-img background' alt={trait.img} width={"auto"} height={"auto"} src={`https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/skills%2F${trait.img}.png?alt=media&token=a0eb4570-8b1d-4859-8a66-90f4e32b2896`} />
                <Image className='trait-img foreground'alt={trait.rarity} width={"auto"} height={"auto"} src={require(`../assets/img/skill-${(trait.rarity)?(trait.rarity):('Legendary')}.png`)} />
              </div>
            <b className='trait-title-txt'>
              {trait.title}
            </b>
          </div>
        </div>
        <b className='star-margin'>⭐⭐⭐⭐⭐</b>
        
        
        <div>
          <EffectTxt blueEffects={blueEffects} text={trait.effects[0]} chars={chars} />
        </div>

        {trait.effects[1]&&(
          <>
            <div onClick={() => setShowStars(!showStars)} className='skill-chars trait-lvs mt-2 mb-1'>
              {showStars?("▲ Show All Levels ▲"):("▼ Show All Levels ▼")}
            </div>
            <div className='px-2'>
              {showStars&&(trait.effects.slice(1).map((effect, i) => (
                <div>
                  {"⭐".repeat(Math.abs(i-trait.effects.length)-1)}
                  <EffectTxt text={effect} chars={chars} />
                </div>
              )))}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default CharTrait;
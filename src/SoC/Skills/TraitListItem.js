import React from 'react';
import { Image } from 'react-bootstrap';
import EffectTxt from '../Effect/EffectTxt';
import CharsListItemRow from '../Chars/CharsListItemRow';

function TraitListItem({trait,blueEffects, char, boss}) {

  if (trait) {
    return (
      <div className={`trait-list-item ${boss&&("w-33")}`}>
        <div className='char-detail-bg m-1 px-2'>
          {char.length>0&&(
            <CharsListItemRow char={char[0]} />
          )}
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
      </div>
    );
  }
}

export default TraitListItem;
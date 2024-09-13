import React from 'react';
import {Image} from 'react-bootstrap';
import EffectTxt from '../Effect/EffectTxt';

function EngravingSingle({x}) {

  return (
    <div className='bg-lighter my-1 p-1'>
      <div className='d-flex align-items-center'>
        {x&&(x.engravings.map((engraving, i) => (
          <>
            <Image key={i} alt={engraving} className='engraving-icon'
            src={require(`../assets/img/engraving_${engraving }_icon.png`)} />
            {i===0&&(<b className='text-white mx-1'>+</b>)}
          </>
        )))}
        <span className='mx-2 engraving-title'>
          ({x&&(x.engravings.map((engraving, i) => engraving+(i===0?" + ":"")))})
        </span>
      </div>
      <hr />
      <div className='mx-1'>
        {x&&(
          <EffectTxt text={x.effect} dmg={x.dmg} />
        )}
      </div>
    </div>
  );
}

export default EngravingSingle;
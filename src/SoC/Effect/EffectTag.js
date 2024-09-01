import React, {useState,useEffect} from 'react';
import { doc, onSnapshot} from 'firebase/firestore';
import db from '../../firebase';
import slugify from 'react-slugify';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import EffectTxt from './EffectTxt';

const EffectTag = ({ value }) => {
  const [effectTag, setEffectTag] = useState()
  useEffect(() => {
    onSnapshot(doc(db, "games/soc/effect_tags/", slugify(value)), (doc) => {
      setEffectTag(doc.data());
    });
  }, [value]);

  const renderContent = () => {
    return value.split(/(\|null\||\|up\||\|dwn\||\|hr\|)/g).map((part, index) => {
      if (part === '|up|'|| part === '|up'||part === 'up|') {
        return <span key={index} alt="up" className='buff-color' >▲</span>;
      } else if (part === '|dwn|'||part === '|dwn'||part === 'dwn|') {
        return <span key={index} alt="down" className='debuff-color'>▼</span>;
      } else if (part === '|null|'||part === 'null|'||part === '|null') {
        return <span key={index} alt="null" >🚫</span>;
      } else if (part === '|hr|'||part === 'hr|'||part === '|hr') {
        return <hr />;
      }else {
        return part;
      }
    });
  };

  const tooltip = (
    <Tooltip id="tooltip" className='effect-tag-tooltip'>
      {effectTag&&(
        <div className='effect-tag-tooltip'>
          <EffectTxt text={effectTag.txt}  />
        </div>
      )}
    </Tooltip>
  );
  

  return (
    <span>
      <OverlayTrigger placement="top" overlay={tooltip}>
        <span>
          [<a href={effectTag&&(effectTag.txt&&(
            effectTag.txt.includes('[Skill]')
            ?('#skills'):('#')))}
            className={
              effectTag&&(
                (effectTag.color==="blue")?('tag-txt-blue'):('tag-txt')
              )
            }>
            {renderContent()}
          </a>]
        </span>
      </OverlayTrigger>
    </span>
  );
};

export default EffectTag;
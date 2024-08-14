import React, {useState,useEffect} from 'react';
import { doc, onSnapshot} from 'firebase/firestore';
import db from '../../firebase';
import slugify from 'react-slugify';

const EffectTag = ({ value }) => {

  const [effectTag, setEffectTag] = useState()
  useEffect(() => {
    onSnapshot(doc(db, "games/soc/effect_tags/", slugify(value, { delimiter: '_' })), (doc) => {
      setEffectTag(doc.data());
    });
  }, [value]);

  const renderContent = () => {
    return value.split(/(\|null\||\|up\||\|dwn\|)/g).map((part, index) => {
      if (part === '|up|'|| part === '|up'||part === 'up|') {
        return <span key={index} alt="up" className='buff-color' >▲</span>;
      } else if (part === '|dwn|'||part === '|dwn'||part === 'dwn|') {
        return <span key={index} alt="down" className='debuff-color'>▼</span>;
      } else if (part === '|null|'||part === 'null|'||part === '|null') {
        return <span key={index} alt="null" >🚫</span>;
      } else {
        return part;
      }
    });
  };

  return (
    <span>[<b className={
      effectTag&&(
        (effectTag.color==="blue")?('tag-txt-blue'):('tag-txt')
      )
      }>
      {renderContent()}</b>]
    </span>
  );
};

export default EffectTag;
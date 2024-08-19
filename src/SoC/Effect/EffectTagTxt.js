import React from 'react';

const EffectTagTxt = ({ effectTxt }) => {
  const renderContent = () => {
    return effectTxt.split(/(\|null\||\|up\||\|dwn\||\|hr\|)/g).map((part, index) => {
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

  return (renderContent());
};

export default EffectTagTxt;
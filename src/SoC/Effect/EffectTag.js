import React, {useState,useEffect} from 'react';
import axios from 'axios';
// import slugify from 'react-slugify';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import EffectTxt from './EffectTxt';

const EffectTag = ({ value }) => {
  const [effectTag, setEffectTag] = useState()
  useEffect(() => {
    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/findOne",
      data: {"collection":"effect_tags","database":"soc","dataSource":"Sword", 
        "filter": {
          "title": value
        }}
    }).then(res => {
      setEffectTag(res.data.document)
    }).catch(err => console.warn(err));
  }, [value]);

  const renderContent = () => {
    return value.split(/(\|null\||\|up\||\|dwn\||\|hr\|)/g).map((part, index) => {
      if (part === '|up|'|| part === '|up'||part === 'up|') {
        return <span key={index} alt="up" className='buff-color' >▲</span>;
      } else if (part === '|dwn|'||part === '|dwn'||part === 'dwn|') {
        return <span key={index} alt="down" className='debuff-color'>▼</span>;
      } else if (part === '|null|'||part === 'null|'||part === '|null') {
        return <span key={index} alt="null" >🚫</span>;
      } else if (part === '|hr|') {
        return <hr />;
      } else if (part === '|br|') {
        return <br />;
      } else {
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
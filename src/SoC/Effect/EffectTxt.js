import React, {useEffect, useState} from 'react';
import EffectTag from './EffectTag';

const EffectTxt = ({ text, dmg, blueEffects, colorNumbers}) => {
  const [hasBlueEffect, setHasBlueEffect] = useState()

  useEffect(() => {
    if (blueEffects) {
      blueEffects.map(effect => (
        (text.includes(`[${effect.title}]`)&&(
          setHasBlueEffect(true)
        )))
      )
    }
  }, [text]);
  
  if (text) { 
    const renderText = () => {

      return text.split(/(\d+%?|\[.*?\])/g).reduce((acc, part, index, array) => {
        if (array[index - 1]?.endsWith('Heals ') || array[index - 1]?.endsWith('Heals the target by ')) {
          // Se a parte anterior termina com "Heals " ou "Heals the target by ", o número atual deve ser verde
          acc.push(
            <span key={index} className="heal-color">
              {part}
            </span>
          );
        } else if (part.match(/^\d+%?$/)) {
          // Outros números, verificar a condição da variável dmg
          let color = dmg === 'Magical' ? 'magical-color' : 'physical-color';
          acc.push(
            <span key={index} className={color}>
              {part}
            </span>
          );
        } else if (part.match(/^\[.*?\]$/)) {
          // Substituir texto entre colchetes por componente React
          const value = part.slice(1, -1); // Remove os colchetes
          acc.push(<EffectTag key={index} value={value} />);
        }   else if (part.match(/\|hr\|/)) {
          acc.push(<><hr />{part.replace('|hr|','')}</>);
        } else {
          acc.push(part); // Retornar parte original do texto
        }
  
        return acc;
      }, []);
    };

    return (
      <div className='effect-txt mx-1'>

        {renderText()}

        {hasBlueEffect&&(<hr className='mt-2' />)}
        
        {blueEffects&&(blueEffects.map(effect => (
          (text.includes(`[${effect.title}]`)&&(
            <div className='mx-1 my-2'>
              <a href={effect&&(effect.txt&&(
                effect.txt.includes('[Skill]')
                ?('#skills'):('javascript:void(0);')))}
                className='tag-txt-blue'>
                {effect.title}
              </a>
              {": "}
              {effect.txt}
            </div>
          ))))
        )}

      </div>
    );
  }
};

export default EffectTxt;

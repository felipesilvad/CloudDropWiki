import React, {useEffect, useState, useMemo} from 'react';
import EffectTag from './EffectTag';
import FactionTitle from '../Chars/FactionTitle';

const EffectTxt = ({ text, dmg, blueEffects, factions, chars}) => {
  const [hasBlueEffect, setHasBlueEffect] = useState()

  const factionsTitles = useMemo(() => {
    if (factions) {
      return factions.map(faction => faction.title);
    } else {
      return []
    }
  }, [factions]);

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
      return text.split(/(\d+%?|\[.*?\]|\|hr\||\|br\|)/g).reduce((acc, part, index, array) => {
        if (array[index - 1]?.endsWith('Heals ')
          ||array[index - 1]?.endsWith('Heals the target by ')
          ||array[index - 1]?.endsWith('Heals all allies within ')
          ||array[index - 1]?.endsWith('the DMG taken is decreased by ')
          ||array[index - 1]?.endsWith('healing skill by ')
          ||array[index - 1]?.endsWith('healing effect by ')
          ||array[index - 1]?.endsWith('healing received by ')
          ||array[index - 1]?.endsWith('HP equal to  ')
          ||array[index - 1]?.endsWith('generating ')
          ||array[index - 1]?.endsWith('recovers ')
          ||array[index - 1]?.endsWith('NRG is increased to ')
          ||array[index - 1]?.endsWith('NRG owned, he additionally gains ')
         ) {
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
        } else if (part.match(/\|hr\|/)) {
          acc.push(<><hr />{part.replace('|hr|','')}</>);
        } else if (part.match(/\|br\|/)) {
          acc.push(<><br />{part.replace('|br|','')}</>);
        } else {
          part.split(`"`).forEach(x => {
            if (factionsTitles.includes(x)&&factions) {
              acc.push(<FactionTitle faction={factions.filter(faction=>faction.title===x)[0]} chars={chars} effect={true} />)
            } else {
              acc.push(x); // Retornar parte original do texto
            }
          });
          // acc.push(part)
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

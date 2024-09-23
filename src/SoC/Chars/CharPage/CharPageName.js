import React from 'react';
import FactionImage from '../FactionImage';
import {Image} from 'react-bootstrap';

function CharPageName({char, factions, chars, windowWidth, rarityOrder}) {
  return (
    <div className='char-name-div'>
      <div  
      className='char-name-bg-img d-flex pb-1-mobile justify-content-between align-items-center'>
        <div className='d-flex align-items-center'>
          {char&&(
            <Image className='role-img mx-1' fetchPriority='low' alt='role-img' width={20} height={20} src={`https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/roles%2F${char.role}.png?alt=media`} />
          )}
          <h2 className='mt-1 char-name'>{char&&(char.name)}</h2>
        </div>
        {(windowWidth.current < 768)?(
          <div className='d-flex justify-content-start flex-wrap'>
            {char&&(char.factions&&(char.factions.map(faction => (
              factions.filter(x => x.title === faction).length>0&&(   
                <FactionImage 
                  faction={factions.filter(x => x.title === faction)[0]} 
                  chars={chars.sort((a, b) => {return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);})}
                />
              )
            ))))}
          </div>
        ):(
          <div className='char-cut-div d-flex align-items-center'>
            {char&&(
              <Image className='char-cut-img' fetchPriority='low' src={`https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/chars%2F${char.slug}_cut.png?alt=media`} alt='char-cut' width={"inherit"} height={"inherit"} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CharPageName;
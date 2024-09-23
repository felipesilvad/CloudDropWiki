import React from 'react';
import FactionTitle from '../FactionTitle';

function CharPageDesktopFactions({char, factions, chars, rarityOrder}) {
  return (
    <div className='d-flex justify-content-start flex-wrap mx-1'>
      {char&&(char.factions&&(char.factions.map(faction => (
        factions.filter(x => x.title === faction).length>0&&(
        <FactionTitle 
          faction={factions.filter(x => x.title === faction)[0]} 
          chars={chars.sort((a, b) => {return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);})}
        />
      )))))}
    </div>
  );
}

export default CharPageDesktopFactions;
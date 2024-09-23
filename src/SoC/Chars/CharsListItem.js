import React from 'react';
import { Link } from 'react-router-dom';
import CharListItemImage from './CharListItemImage';

function CharsListItem({char}) {
  const role = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/roles%2F${char.role}.png?alt=media`
  return (
    <Link to={`/chars/${char.slug}`} className='mx-1'>
      <div className="image-container mx-1">
        <img src={require(`../assets/img/recruit_bg_${char.rarity}.png`)} alt="Background" className="background-layer" />
        <CharListItemImage 
          path={`chars/${char.slug}_profile.png`}
          className='character-layer' alt={char.slug}
          transformation={[{width: 300}]}
          width="300"
        />
        <img src={require(`../assets/img/recruit_stage_${char.rarity}.png`)} alt="Frame" className="frame-layer" />
        <CharListItemImage 
          path={`chars/${char.slug}.gif`}
          className='sprite-layer' alt={char.slug}
          transformation={[{width: 120}]}
          width="120"
        />
        <div className={`char-list_name char-name-div `}>{char.name}</div>
        <img src={role}  alt="Class Icon"  className="class-icon" loading='lazy' fetchPriority='low' />
      </div>
    </Link>
  );

}

export default CharsListItem;
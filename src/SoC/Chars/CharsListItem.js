import React from 'react';
import { Link } from 'react-router-dom';

function CharsListItem({char}) {
  const sprite = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/chars%2F${char.slug}.gif?alt=media`
  const profile = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/chars%2F${char.slug}_profile.png?alt=media`
  const role = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/roles%2F${char.role}.png?alt=media`

  if (char) {
    return (
      <Link to={`/chars/${char.slug}`} className='mx-2'>
        <div className="image-container mx-1">
          <img src={require(`../assets/img/recruit_bg_${char.rarity}.png`)} alt="Background" className="background-layer" />
          <img src={profile} alt="Character" className="character-layer" />
          <img src={require(`../assets/img/recruit_stage_${char.rarity}.png`)} alt="Frame" className="frame-layer" />
          <img src={sprite} alt="Sprite" className="sprite-layer" />
          <div className={`char-list_name char-name-div `}>{char.name}</div>
          <img src={role}  alt="Class Icon"  className="class-icon" />
        </div>
      </Link>
    );
  }
}

export default CharsListItem;
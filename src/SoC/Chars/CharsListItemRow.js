import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
function CharsListItemRow({char}) {
  const sprite = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/chars%2F${char.slug}.gif?alt=media`
  const profile = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/chars%2F${char.slug}_profile.png?alt=media`
  const role = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/roles%2F${char.role}.png?alt=media`

  if (char) {
    return (
      <div className='char-row' style={{ backgroundImage: `url(${`https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/chars%2F${char.slug}_cut.png?alt=media`})` }}>
        <Link to={`/chars/${char.slug}`}>
          <div className='d-flex h-100 align-items-end my-1 justify-content-around'>
            <b className='char-row-title'>{char.name}</b>
            <Image className='char-row-sprite' src={sprite} />
          </div>
        </Link>
      </div>
    );
  }
}

export default CharsListItemRow;
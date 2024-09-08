import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

function CharsListItemRow({char}) {
  const sprite = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/chars%2F${char.slug}.gif?alt=media`
  const role = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/roles%2F${char.role}.png?alt=media`
 
  if (char) {
    return (
      <div className='char-row' style={{
          background: `url(${require(`../assets/img/row-bg-${char.rarity}.png`)
          }) no-repeat left center`
        }}>
        <div className='char-row' style={{
            background: `url(${`https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/chars%2F${char.slug}_cut.png?alt=media`}) no-repeat left center`
          }}>
          <img src={role}  alt="Class Icon" className="class-icon-row" width={"1.6rem"} height={"1.6rem"} />
          <Link to={`/chars/${char.slug}`}>
            <div className='d-flex h-100 align-items-end my-1 justify-content-end'>
              <b className='char-row-title'>{char.name}</b>
              <Image className='char-row-sprite' alt={char.slug} src={sprite} width={"5rem"} height={"6.5rem"} />
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default CharsListItemRow;
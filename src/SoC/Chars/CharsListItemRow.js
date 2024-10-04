import React from 'react';
import { Link } from 'react-router-dom';
// import { Image } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function CharsListItemRow({char, bgImg}) {
  const sprite = `https://ik.imagekit.io/clouddrop/soc/tr:w-60/chars/${char.slug}.gif`
  const role = `https://ik.imagekit.io/clouddrop/soc/tr:w-30/roles/${char.role}.png`
 
  return (
    <div key={char.slug} className='char-row' style={
      char.rarity==="Legendary"?(
        {background: `url(${bgImg}) no-repeat left center`}
      ):(
        {background: `url(${require(`../assets/img/row-bg-${char.rarity}.webp`)}) no-repeat left center`}
      )}>
      <div className='char-row' style={{
          background: `url(${`https://ik.imagekit.io/clouddrop/soc/tr:w-320/chars/${char.slug}_cut.png`}) no-repeat left center`
        }}>
        <img src={role}  alt="Class Icon" className="class-icon-row" width={"30"} height={"30"} />
        <Link to={`/chars/${char.slug}`}>
          <div className='d-flex h-100 align-items-end my-1 justify-content-end'>
            <b className='char-row-title'>{char.name}</b>
            <LazyLoadImage className='char-row-sprite'
            loading='lazy'
            alt={char.slug} src={sprite} width={"5rem"} height={"6.5rem"} />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default CharsListItemRow;
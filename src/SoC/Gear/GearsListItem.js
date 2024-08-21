import React from 'react';
import { Image } from 'react-bootstrap';
import EffectTxt from '../Effect/EffectTxt';
import { Link } from 'react-router-dom';

function GearsListItem({gear, sideMenu}) {
  const gear_img = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/gear%2F${gear.img}.png?alt=media`
  const bg = require(`../assets/img/face_bg_${gear.rarity}.png`)
  const border = require(`../assets/img/face_border_${gear.rarity}.png`)

  if (gear) {

    return (
      <div className={`skill-list-item ${sideMenu&&("w-100")}`}>       
        <div className={`skill-detail-bg mx-1`}>
          <div className={`skill-detail-div `}>

            <div className='d-flex justify-content-between'>
              <div className='skill-category-div'>
                <span className={`skill-category`} 
                onClick={() =>  navigator.clipboard.writeText(gear.img)}>
                  {gear.type}
                </span>
              </div>
            </div>
            <Link className="gear-title" to={`/gears/${gear.img}`}>
              <div className='trait-div d-flex align-items-center mx-1'>
                <div className='trait-title d-flex align-items-center'>
                  <div class="trait-img-container m-1">
                    <Image src={bg} alt='bg' className="trait-img background" />
                    <Image src={gear_img} alt='gear_img'  className="gear-list-img foreground" />
                    <Image src={border} alt='border'  className="trait-img char-face-border" />
                  </div>
                  <b className='trait-title-txt gear-title'>
                    {gear.title}
                  </b>
                  
                </div>
              </div>
            </Link>
            <div className='mx-2 text-center mb-2'>
              <EffectTxt text={gear.skill}/>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default GearsListItem;
import React from 'react';
import { Image } from 'react-bootstrap';

function Gearicon({gear, css}) {
  const gear_img = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/gear%2F${gear.img}.png?alt=media`
  const bg = require(`../assets/img/face_bg_${gear.rarity}.png`)
  const border = require(`../assets/img/face_border_${gear.rarity}.png`)

  return (
    <div class={`trait-img-container m-1 ${css}`}>
      <Image src={bg} alt='bg' className="trait-img background opacity-7"  />
      <Image src={gear_img} alt='gear-img' className="gear-list-img foreground" />
      <Image src={border} alt='border'  className="trait-img char-face-border" />
    </div>
  );
}

export default Gearicon;
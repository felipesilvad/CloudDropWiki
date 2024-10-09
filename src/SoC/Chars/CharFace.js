import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'
import { LazyLoadImage } from 'react-lazy-load-image-component';

function CharFace({char}) {
  const face = `https://ik.imagekit.io/clouddrop/soc/tr:w-120/chars/${char.slug}_face.png`
  const bg = require(`../assets/img/face_bg_${char.rarity}.png`)
  const border = require(`../assets/img/face_border_${char.rarity}.png`)
 
  if (char) {
    return (
      <Link to={`/chars/${char.slug}`} key={char.slug} id={char.slug} target="_blank" >
        <div className="char-face-container m-1">
          <LazyLoadImage alt="bg" width={"auto"} height={"auto"} src={bg} className="char-face background" />
          <div className='char-face-img-container'>
            <LazyLoadImage alt="face" width={"auto"} height={"auto"} src={face}  className="char-face-img foreground" />
          </div>
          <LazyLoadImage alt="border" width={"auto"} height={"auto"}  src={border}  className="char-face char-face-border" />
        </div>
        <Tooltip anchorSelect={`#${char.slug}`} place="bottom-end">
          {char.name}
        </Tooltip>
      </Link>
    );
  }
}

export default CharFace;
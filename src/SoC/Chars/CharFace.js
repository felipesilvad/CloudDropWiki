import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'

function CharFace({char}) {
  const face = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/chars%2F${char.slug}_face.png?alt=media`
  const bg = require(`../assets/img/face_bg_${char.rarity}.png`)
  const border = require(`../assets/img/face_border_${char.rarity}.png`)
 
  if (char) {
    return (
      <Link to={`/chars/${char.slug}`} key={char.slug} id={char.slug} target="_blank" >
        <div class="char-face-container m-1">
          <img alt="bg" src={bg} class="char-face background" />
          <img alt="face" src={face}  class="char-face-img foreground" />
          <img alt="border" src={border}  class="char-face char-face-border" />
        </div>
        <Tooltip anchorSelect={`#${char.slug}`} place="bottom-end">
          {char.name}
        </Tooltip>
      </Link>
    );
  }
}

export default CharFace;
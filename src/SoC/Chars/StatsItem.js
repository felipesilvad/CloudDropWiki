import React from 'react';
import { Image } from 'react-bootstrap';

function StatsItem({stat}) {
  // const sprite = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/chars%2F${char.slug}.gif?alt=media`
  
  if (stat) {
    return (
      <div className={"w-50"}>
        <div className='stat-item-bg d-flex align-items-center'>
          <div className='stat-icon-bg'>
            <Image className='stat-icon' src={require(`../assets/img/stat_${stat.label.replace(".","").replace(" ","_")}.png`)} />
          </div>
          {stat.value}
        </div>
      </div>
    );
  }
}

export default StatsItem;
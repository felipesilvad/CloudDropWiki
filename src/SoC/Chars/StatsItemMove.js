import React from 'react';
import { Image } from 'react-bootstrap';

function StatsItem({stat}) {

  if (stat) {
    return (
      <div key={stat.label} className={"w-100"}>
        <div className='stat-item-bg d-flex align-items-center'>
          <div className='stat-icon-bg'>
            <Image alt={stat.label} width={"inherit"} height={"inherit"}
            className={`${(stat.label!=="Stand")?('stat-icon'):('mx-1')}`} src={require(`../assets/img/stat_${stat.label.replace(".","").replace(" ","_")}.png`)} />
          </div>
          <b className='stat-label-txt'>{stat.label}</b>
          <b className={`mx-2 stat-value-txt ${stat.label==="Stand"&&('-stand')}`}>{stat.value}</b>
        </div>
      </div>
    );
  }
}

export default StatsItem;
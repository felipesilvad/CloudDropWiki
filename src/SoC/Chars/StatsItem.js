import React from 'react';
import { Image } from 'react-bootstrap';

function StatsItem({stat, chars}) {
  
  function getStatPlacement(currentStatValue, statLabel) {
    const allStatValues = chars
      .map((char) => char.base_stats.find((stat) => stat.label === statLabel)?.value)
      .filter((value) => value !== undefined);
  
    allStatValues.sort((a, b) => b - a);
  
    // Encontrar a colocação do valor atual
    const placement = allStatValues.indexOf(currentStatValue) + 1;
    
    if (placement === 1) {
      return '1st'
    } else if (placement === 2) {
      return '2nd'
    } else if (placement === 3) {
      return '3rd'
    } else {
      return `${placement}th`
    }
  }
  
  if (stat) {
    return (
      <div key={stat.label} className={"w-50"}>
        <div className='stat-item-bg d-flex align-items-center'>
          <div className='stat-icon-bg'>
            <Image className='stat-icon' alt={stat.label} width={"inherit"} height={"inherit"} src={require(`../assets/img/stat_${stat.label.replace(".","").replace(" ","_")}.png`)} />
          </div>
          {stat.value}
          <div className='w-100 d-flex justify-content-end'>
            <b className='stat-placement'>
              {chars&&(
                <>
                  {getStatPlacement(stat.value, stat.label)}
                  /{chars.length}
                </>
              )}
            </b>
          </div>
        </div>
      </div>
    );
  }
}

export default StatsItem;
import React from 'react';
import { Image } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip'

function StatsItem({role, stat, chars, trait_buff}) {
  
  function getStatPlacement(currentStatValue, statLabel, charactersFilter) {
    const allStatValues = charactersFilter
      .map((char) => char.base_stats.find((stat) => stat.label === statLabel)?.value)
      .filter((value) => value !== undefined);
  
    allStatValues.sort((a, b) => b - a);
    // Encontrar a colocação do valor atual
    const placement = allStatValues.indexOf(currentStatValue) + 1;
    console.log(allStatValues)
    
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

  function getStatPlacementTraitBuff(currentStatValue, statLabel, charactersFilter, buff) {
    const allStatValues = charactersFilter
      .map((char) => (
        char.base_stats.find((stat) => stat.label === statLabel)?.value*(
          1+(
          char.base_stats.find((stat) => stat.label === statLabel)?.value*(
            char.trait_buff.length>0&&(
              char.trait_buff.map(mappedBuff => (
                (stat.label.replace('.', '').includes(mappedBuff.split('-')[0]))?(
                  parseFloat(mappedBuff.split('-')[1])/100
                ):('')
              ))
            )
          )
        ))
      ))
      .filter((value) => value !== undefined);
    allStatValues.sort((a, b) => b - a);

    var buffedCurrantStatValue = currentStatValue
    
    if (stat.label.replace('.', '').includes(buff.split('-')[0])) {
      buffedCurrantStatValue = currentStatValue*(1+(currentStatValue * (parseFloat(buff.split('-')[1])/100)))
    }

    console.log("buff",stat.label,allStatValues)
  
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
      <div key={stat.label} id={stat.label.replace(".","")} className="stat-item-bg-w c-pointer">
        <Tooltip anchorSelect={`#${stat.label.replace(".","")}`} place="bottom">
          <h6>{stat.full}</h6>
          <div className='stat-placement'>
            <b className='mx-2'>
              Default Stats Ranking:
            </b>
            {chars&&(
              <>
                {getStatPlacement(stat.value, stat.label, chars)}
                /{chars.length}
              </>
            )}
          </div>
          <div className='stat-placement'>
            <b className='mx-2'>
              {role}s Ranking:
            </b>
            {chars&&(
              <>
                {getStatPlacement(stat.value, stat.label, chars.filter(x=>x.role===role))}
                /{chars.filter(x=>x.role===role).length}
              </>
            )}
          </div>
          {trait_buff.length>0&&(
            trait_buff.map(buff => (
              <>
                {getStatPlacementTraitBuff(stat.value, stat.label, chars, buff)}
              </>
            ))
          )}
        </Tooltip>
        <div className='stat-item-bg d-flex align-items-center'>
          <div className='stat-icon-bg'>
            <Image className='stat-icon' alt={stat.label.replace(".","")} width={"inherit"} height={"inherit"} src={require(`../assets/img/stat_${stat.label.replace(".","").replace(" ","_")}.png`)} />
          </div>
          {stat.value}
          {trait_buff&&(trait_buff.length>0&&(
            trait_buff.map(buff => (
              (stat.label.replace('.', '').includes(buff.split('-')[0]))?(
                <span className='skill-tree-stat_value px-2 ml-2'>
                  +{buff.split('-')[1]}%
                </span>
              ):('')
            ))
          ))}
          <div className='w-100 d-flex justify-content-end'>
            <b className='stat-placement'>
              {chars&&(
                <>
                  {getStatPlacement(stat.value, stat.label, chars)}
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
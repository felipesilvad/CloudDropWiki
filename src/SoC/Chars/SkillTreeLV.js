import React from 'react';
import CharSkill from './CharSkill';

function SkillTreeLV({lv,index,last, skillRec, blueEffects,chars, charSkills}) {

  const lv_buffs = [["HP","DEF"],'',["DEF", "HP"],'',["ATK", "ATK"],'',["HP","DEF"],'',["DEF","HP"],'',["ATK","ATK"]]
  if (lv) {
    return (
      <div className='skilltree-mobile-container align-items-center'>

        <div className='tree-rank d-md-none d-lg-none'>
          <b className='tree-rank__txt'>RK{lv.lv}</b>
        </div>

        <div className='mobile-border'>
          <div className='d-flex skilltree-div-mobile w-100'>

            <div className='skilltree-skill-mobile'>
              <div className='skill-tree-stat my-1 align-items-center'>
                {lv_buffs[lv.lv-1][0]}
                <div className='skill-tree-stat_value px-2'>
                  + 3%
                </div>
              </div>
              <CharSkill blueEffects={blueEffects} skillRec={[skillRec, lv.rec0]} chars={chars}
              skill={charSkills.filter(x => x.slug===lv.skill0)[0]} />
            </div>

            <div className='tree-rank d-none d-md-block'>
              <div className={`tree-rank__vl ${index+1===last&&('tree-rank__vl-last')}`}></div>
              <b className='tree-rank__txt'>RK{lv.lv}</b>
            </div>

            <div className='skilltree-skill-mobile'>
              <div className='skill-tree-stat my-1 align-items-center'>
                <div className='skill-tree-stat_value px-2'>
                  + 3%
                </div>
                {lv_buffs[lv.lv-1][1]}
              </div>
              <CharSkill blueEffects={blueEffects} skillRec={[skillRec, lv.rec1]} chars={chars}
              skill={charSkills.filter(x => x.slug===lv.skill1)[0]} />
            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default SkillTreeLV;
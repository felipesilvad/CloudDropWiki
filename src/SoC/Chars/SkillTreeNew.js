import React from 'react';
import SkillTreeNewSkill from './SkillTreeNewSkill';

function SkillTreeNew({lv,index,last, skillRec, handleOnClickSkill, activeSkill, charSkills}) {
  if (lv) {
    return (
      <div className='align-items-center'>
        <div className=''>
          <div className='d-flex skilltree-div w-100'>

            <div className='skilltree-skill'>
              {lv.stat0&&(
                <div className='skill-tree-stat-drk my-1 align-items-center'>
                  {lv.stat0}
                  <div className='skill-tree-stat_value px-2'>
                    + 3%
                  </div>
                </div>
              )}
              <SkillTreeNewSkill activeSkill={activeSkill} side={1}
              skillRec={[skillRec, lv.rec0]} handleOnClickSkill={handleOnClickSkill}
              skill={charSkills.filter(x => x.slug===lv.skill0)[0]} />
            </div>

            <div className='tree-rank_new'>
              <div className={`tree-rank__vl tree-rank__vl_new ${index+1===last&&('tree-rank__vl-last_new')}`}></div>
              <b className='tree-rank__txt tree-rank__txt_new'>RK{lv.lv}</b>
            </div>

            <div className='skilltree-skill'>
              {lv.stat1&&(
                <div className='skill-tree-stat-drk my-1 align-items-center'>
                  <div className='skill-tree-stat_value px-2'>
                    + 3%
                  </div>
                  {lv.stat1}
                </div>
              )}
              <SkillTreeNewSkill activeSkill={activeSkill} side={2} slug={lv.skill1}
              skillRec={[skillRec, lv.rec1]} handleOnClickSkill={handleOnClickSkill}
              skill={charSkills.filter(x => x.slug===lv.skill1)[0]} />
            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default SkillTreeNew;
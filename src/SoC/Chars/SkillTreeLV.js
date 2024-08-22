import React, {useState,useEffect} from 'react';
import CharSkill from './CharSkill';
import { Row, Col } from 'react-bootstrap';

function SkillTreeLV({lv,index,last, skillRec, blueEffects}) {
  // const windowWidth = useRef(window.innerWidth);

  if (lv) {
    return (
      <div className='skilltree-mobile-container align-items-center'>

        <div className='tree-rank d-md-none d-lg-none'>
          <b className='tree-rank__txt'>RK{lv.lv}</b>
        </div>

        <div className='mobile-border'>
          <div className='d-flex skilltree-div-mobile w-100'>

            <div className='skilltree-skill-mobile'>
              <CharSkill blueEffects={blueEffects} slug={lv.skill0} skillRec={[skillRec, lv.rec,"1"]} />
            </div>

            <div className='tree-rank d-none d-md-block'>
              <div className={`tree-rank__vl ${index+1===last&&('tree-rank__vl-last')}`}></div>
              <b className='tree-rank__txt'>RK{lv.lv}</b>
            </div>

            <div className='skilltree-skill-mobile'>
              <CharSkill blueEffects={blueEffects} slug={lv.skill1} skillRec={[skillRec, lv.rec,"2"]} />
            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default SkillTreeLV;
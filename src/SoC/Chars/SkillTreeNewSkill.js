import React from 'react';
import { Image } from 'react-bootstrap';

function SkillTreeNewSkill({skill, skillRec, side, handleOnClickSkill, activeSkill}) {
  const castalia = require("../assets/img/castalia.png")

  if (skill) {
    return (
      <div onClick={() => handleOnClickSkill(skill.slug)}>
        <div className={`
          skill-detail-div_new px-2
          ${(activeSkill===skill.slug)&&((side===1)?('new-skill-tree-1-active'):('new-skill-tree-2-active'))}
          ${(skillRec&&skillRec[1])&&((skillRec[0]&&
            skillRec[1].includes("1"))?(' skill-detail-rec '):
            ((skillRec[0]&&skillRec[1].includes("2"))?(' skill-detail-rec2 '):('')))}}
          ${(side===1)?('new-skill-tree-1'):('new-skill-tree-2 ')}
        `}>
          {skillRec&&(skillRec[0]&&(skillRec[1]&&(skillRec[1].includes("c")&&(
            <div className='castlia-rec-container'>
              <Image alt='castalia' widthwidth={"inherit"} height={"inherit"} src={castalia} className='castlia-rec-img' />
            </div>
          ))))}
          <div className={`d-flex justify-content-${(side===1)?('end'):('start')}`}>
            <div className='new-trait-img-container'>
              <Image alt={skill.img} widthwidth={"inherit"} height={"inherit"} className='trait-img background' src={`https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/skills%2F${skill.img}.png?alt=media&token=a0eb4570-8b1d-4859-8a66-90f4e32b2896`} />
              <Image alt={(skill.rarity)?(skill.rarity):('Rare')} widthwidth={"inherit"} height={"inherit"} className='trait-img foreground' src={require(`../assets/img/skill-${(skill.rarity)?(skill.rarity):('Rare')}.png`)} />
            </div>
          </div>
          <div>
            <div className={`trait-title-txt_new d-flex justify-content-${(side===1)?('end'):('start')}`}>
              {skill.title}
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default SkillTreeNewSkill;
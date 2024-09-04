import React, {useState,useEffect} from 'react';
import { Image } from 'react-bootstrap';
import axios from 'axios';

function SkillTreeNewSkill({slug, skillRec, side, handleOnClickSkill, activeSkill}) {

  const [skill, setSkill] = useState()
  useEffect(() => {
    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/findOne",
      data: {"collection":"skills","database":"soc","dataSource":"Sword", 
        "filter": {
          "slug": slug
        }}
    }).then(res => {
      setSkill(res.data.document)
    }).catch(err => console.warn(err));
  }, [slug]);

  const castalia = require("../assets/img/castalia.png")

  if (skill) {

    return (
      <div onClick={() => handleOnClickSkill(slug)}>
        <div className={`
          skill-detail-div_new px-2
          ${(activeSkill===slug)&&((side===1)?('new-skill-tree-1-active'):('new-skill-tree-2-active'))}
          ${(skillRec&&skillRec[1])&&((skillRec[0]&&
            skillRec[1].includes("1"))?(' skill-detail-rec '):
            ((skillRec[0]&&skillRec[1].includes("2"))?(' skill-detail-rec2 '):('')))}}
          ${(side===1)?('new-skill-tree-1'):('new-skill-tree-2 ')}
        `}>
          {skillRec&&(skillRec[0]&&(skillRec[1]&&(skillRec[1].includes("c")&&(
            <div className='castlia-rec-container'>
              <Image src={castalia} className='castlia-rec-img' />
            </div>
          ))))}
          <div className={`d-flex justify-content-${(side===1)?('end'):('start')}`}>
            <div className='new-trait-img-container'>
              <Image className='trait-img background' src={`https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/skills%2F${skill.img}.png?alt=media&token=a0eb4570-8b1d-4859-8a66-90f4e32b2896`} />
              <Image className='trait-img foreground' src={require(`../assets/img/skill-${(skill.rarity)?(skill.rarity):('Rare')}.png`)} />
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
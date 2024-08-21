import React, {useState,useEffect} from 'react';
import { Image } from 'react-bootstrap';
import { doc, onSnapshot} from 'firebase/firestore';
import db from '../../firebase';

function SkillTreeNewSkill({slug, skillRec, side, setActiveSkill, activeSkill}) {

  const [skill, setSkill] = useState()
  useEffect(() => {
    onSnapshot(doc(db, "games/soc/skills/", slug), (doc) => {
      setSkill(doc.data());
    });
  }, [slug]);


  if (skill) {

    return (
      <div onClick={() => setActiveSkill(slug)}>
        <div className={`
          skill-detail-div_new px-2
          ${(activeSkill===slug)&&((side===1)?('new-skill-tree-1-active'):('new-skill-tree-2-active'))}
          ${(skillRec&&skillRec[1])&&(
            (skillRec[0]&&skillRec[1].includes(skillRec[2]))&&('skill-detail-rec')
          )} 
          ${(side===1)?('new-skill-tree-1'):('new-skill-tree-2 ')}
        `}>
          
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
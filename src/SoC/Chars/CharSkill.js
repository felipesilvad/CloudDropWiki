import React, {useState,useEffect} from 'react';
import { Image } from 'react-bootstrap';
import axios from 'axios';
import EffectTxt from '../Effect/EffectTxt';

function CharSkill({slug, skillRec, blueEffects, chars}) {
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

  const nrg_icon = require('../assets/img/nrg_icon.png')
  const cd_icon = require('../assets/img/cd_icon.png')
  const castalia = require("../assets/img/castalia.png")

  if (skill) {

    const skillRange = `${skill.range_1}-${skill.range_2}${(skill.range_3)?(`-${skill.range_3}`):("")}${(skill.range_detail)?(`-${skill.range_detail.replace("+","%2B")}`):("")}`

    return (
      <div className={`skill-detail-bg`}>
        <div className={`skill-detail-div 
          ${(skillRec&&skillRec[1])&&((skillRec[0]&&
            skillRec[1].includes("1"))?('skill-detail-rec'):
            ((skillRec[0]&&skillRec[1].includes("2"))?('skill-detail-rec2'):('')))}`}
        >
          <div className='d-flex justify-content-between'>
            <div className='skill-category-div'>
              <span className={`skill-category
                ${(skillRec&&skillRec[1])&&((skillRec[0]&&
                  skillRec[1].includes("1"))?('skill-category-rec'):
                  ((skillRec[0]&&skillRec[1].includes("2"))?('skill-category-rec2'):('')))}`}
              >{skill.category}</span>
            </div>
            {skillRec&&(skillRec[0]&&(skillRec[1]&&(skillRec[1].includes("c")&&(
              <div className='castlia-rec-container'>
                <Image src={castalia} className='castlia-rec-img' />
              </div>
            ))))}

            {(skill.mana||skill.cooldown)&&(
              <div className='skill-mana mr-1'>
                {skill.mana&&(
                  <div>
                    <span className='skill-mana-item'>
                      <span className='mx-1'>
                        {skill.mana}
                      </span>
                      <Image className='skill-mana-icon' src={nrg_icon} />
                    </span>
                  </div>
                )}
                {skill.cooldown&&(
                  <div>
                    <span className='skill-mana-item'>
                      <span className='mx-1'>
                        {skill.cooldown}
                      </span>
                      <Image className='skill-mana-icon' src={cd_icon} />
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className='trait-div d-flex align-items-center mx-1'>
            <div className='trait-title d-flex align-items-center'>
              <div className='trait-img-container'>
                <Image className='trait-img background' src={`https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/skills%2F${skill.img}.png?alt=media&token=a0eb4570-8b1d-4859-8a66-90f4e32b2896`} />
                <Image className='trait-img foreground' src={require(`../assets/img/skill-${(skill.rarity)?(skill.rarity):('Rare')}.png`)} />
              </div>
              <b className='trait-title-txt'>
                {skill.title}
              </b>
            </div>
          </div>

          <div className='mx-2'>
            <EffectTxt blueEffects={blueEffects} colorNumbers={true} text={skill.effect} chars={chars} dmg={skill.dmg}/>
          </div>
          
          {(skill.range_1!==null)&&(
            <div className='skill-range-div mx-2 d-flex'>
              <Image className='range-img ml-2' src={`https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/ranges%2F${skillRange}.png?alt=media`} />
              <div className='w-100 mr-2'>
                <div className='d-flex w-100'>
                  {skill.type&&skill.type!=="-"&&(
                    <div className='skill-type-div'>{skill.type}</div>
                  )}
                  {skill.type2&&skill.type2!=="-"&&(
                    <div className='skill-type-div'>{skill.type2}</div>
                  )}
                </div>
                  <div className='skill-range-value mx-2'>
                    {skill.range_1+skill.range_2>0&&(
                      <div className='d-flex justify-content-between align-items-center'>
                        <label>Range</label>
                        <span>{skill.range_1} - {skill.range_2}</span>
                      </div>
                    )}
                    <hr className='skill-range-hr' />
                    {skill.height_range_dw&&(
                      <>
                        <div className='d-flex justify-content-between align-items-center'>
                          <label>Height Range</label>
                          <span>⬇{skill.height_range_dw} - ⬆{skill.height_range_up}</span>
                        </div>
                        <hr className='skill-range-hr' />
                      </>
                    )}
                    {skill.effect_range_dw&&(
                      <>
                        <div className='d-flex justify-content-between align-items-center'>
                          <label>Effect Height</label>
                          <span>⬇{skill.effect_range_dw} - ⬆{skill.effect_range_up}</span>
                        </div>
                        <hr className='skill-range-hr' />
                      </>
                    )}
                  </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CharSkill;
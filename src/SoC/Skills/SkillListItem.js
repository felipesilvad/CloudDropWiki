import React, {useState,useEffect} from 'react';
import { Image } from 'react-bootstrap';
import EffectTxt from '../Effect/EffectTxt';
import CharFace from '../Chars/CharFace';

function SkillListItem({skill, blueEffects, chars, w100, factions}) {
  const nrg_icon = require('../assets/img/nrg_icon.png')
  const cd_icon = require('../assets/img/cd_icon.png')
  const [filteredChars, setfilteredChars] = useState([])

  useEffect(() => {
    setfilteredChars(chars.filter(char => (
      char.basic === skill.slug ||
      char.shill === skill.slug ||
      char.skill_tree.some(x => x.skill0 === skill.slug || x.skill1 === skill.slug)
    )))
  }, [skill]);
  
  // const showSkillChars = () => {
  //   if (filteredChars.length===0) {
  //     setfilteredChars(chars.filter(char => (
  //       char.basic === skill.slug ||
  //       char.shill === skill.slug ||
  //       char.skill_tree.some(x => x.skill0 === skill.slug || x.skill1 === skill.slug)
  //     )))
  //   }
  // }

  if (skill) {
    const skillRange = `${skill.range_1}-${skill.range_2}${(skill.range_3)?(`-${skill.range_3}`):("")}${(skill.range_detail)?(`-${skill.range_detail.replace("+","%2B")}`):("")}`

    return (
      <div className={`skill-list-item ${w100&&("w-100")}`}>
        <div className={`skill-detail-bg `}>
          <div className={`skill-detail-div `}>
            <div className='d-flex justify-content-between'>

              <div className='skill-category-div'>
                <span className={`skill-category`}
                >{skill.category}</span>
              </div>

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
              <EffectTxt 
                blueEffects={blueEffects} 
                text={skill.effect}
                dmg={skill.dmg}
                chars={chars}
                factions={factions}
              />
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
            
            {filteredChars.length>0&&(
              <>
                <div className='skill-chars mt-2' 
                // onClick={showSkillChars}
                >Characters That Can Learn This Skill
                </div>
                <div className="d-flex flex-wrap">
                  {filteredChars.map(char => (
                    <CharFace char={char} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SkillListItem;
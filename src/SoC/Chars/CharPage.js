import React, {useState, useEffect, useRef} from 'react';
import {Row,Col,Container,Image} from 'react-bootstrap';
import Mongo from '../../mango'
import {useParams} from 'react-router-dom';
import {Helmet} from "react-helmet-async";
import StatsItem from './StatsItem';
import StatsItemMove from './StatsItemMove';
import FactionImage from './FactionImage';
import CharTrait from './CharTrait';
import CharSkill from './CharSkill';
import CharsListItemRow from './CharsListItemRow';
import SourceItem from './SourceItem';
import FactionTitle from './FactionTitle';
import SkillListItem from '../Skills/SkillListItem';
import GearsListItem from '../Gear/GearsListItem';
import TarotsListItem from '../Gear/TarotsListItem';
import EngravingSingle from '../Gear/EngravingSingle';
import {Engravings} from '../Data/data.ts';
import Gearicon from '../Gear/Gearicon.js';
import CharPageProfileImg from './CharPage/CharPageProfileImg.js';
import CharPageArt from './CharPage/CharPageArt.js';
import CharPageSkillTree from './CharPage/CharPageSkillTree.js';

function CharPage() {

  const id = useParams().id
  const [char, setChar] = useState()
  const windowWidth = useRef(window.innerWidth);
  const rarityOrder = ['Legendary', 'Epic', 'Rare', 'Common'];

  const [chars, setChars] = useState([])
  const [blueEffects, setBlueEffects] = useState([])
  const [factions, setFactions] = useState([])
  const [trait, setTrait] = useState()
  const [charSkills, setCharSkills] = useState([])
  const [charGears, setCharGears] = useState([])
  const [charTarots, setCharTarots] = useState([])
  const [charSources, setCharSources] = useState([])

  const [showWeapons, setShowWeapons] = useState(false)
  const [showArmor, setShowArmor] = useState(false)
  const [showTarots, setShowTarots] = useState(false)

  useEffect (() => {
    Mongo.find('chars', {sort: {"name": 1}})
    .then(res => {
      setChars(res.data.documents)
    }).catch(err => console.warn(err));

    Mongo.find('effect_tags',{filter: {"color": "blue"}})
    .then(res => {
      setBlueEffects(res.data.documents)
    }, function(err) {console.log(err);})

    Mongo.find('factions')
    .then(res => {
      setFactions(res.data.documents)
    }, function(err) {console.log(err);})
  }, [])

  useEffect(() => {
    setChar(chars.filter(char => char.slug === id)[0])
    window.scrollTo(0, 0)
  }, [id,chars]);

  useEffect(() => {
    if (char) {
      Mongo.find('traits',{filter: {"slug": char.trait}})
      .then(res => {
        setTrait(res.data.documents[0])
      }, function(err) {
        console.log(err);
      })

      if (char.other_skills) {
        Mongo.find('skills',{filter: {"slug": {
          $in: [char.skill, char.basic, ...char.other_skills, ...char.skill_tree.map(lv => lv.skill0), ...char.skill_tree.map(lv => lv.skill1)]
        }}})
        .then(res => {
          setCharSkills(res.data.documents)
        }, function(err) {
          console.log(err);
        })
      } else {
        Mongo.find('skills',{filter: {"slug": {
          $in: [char.skill, char.basic, ...char.skill_tree.map(lv => lv.skill0), ...char.skill_tree.map(lv => lv.skill1)]
        }}})
        .then(res => {
          setCharSkills(res.data.documents)
        }, function(err) {
          console.log(err);
        })
      }

      if (char.weapon_rec) {
        Mongo.find('gears',{filter: {"img": {
          $in: [...char.weapon_rec, ...char.armor_rec]
        }}})
        .then(res => {
          setCharGears(res.data.documents)
        }, function(err) {
          console.log(err);
        })
      }

      if (char.tarot_rec) {
        Mongo.find('tarots',{filter: {"slug": {
          $in: [...char.tarot_rec]
        }}})
        .then(res => {
          setCharTarots(res.data.documents)
        }, function(err) {
          console.log(err);
        })
      }
      if (char.sources) {
        Mongo.find('sources',{filter: {"title": {
          $in: [...char.sources]
        }}})
        .then(res => {
          setCharSources(res.data.documents)
        }, function(err) {
          console.log(err);
        })
      }
    }
    
  }, [char]);
  
  if (char) {
    return (
      <Container className='char-container py-2'>
        {char.name&&(
          <Helmet>
            <title>{char.name} | Sword of Convallaria Wiki - Stats and Build</title>
            <meta name="description" content={`${char.name}S kills Recommendations and Priority, Recommended Gear, Tarots, Weapons, and Trinkets. Stats comparison and Trait Detail. - SoC Wiki Database`} />
            <link rel="canonical" href={`/chars/${id}`} />
          </Helmet>
        )}
        <h1 className='d-none'>{char.name} | Sword of Convallaria Wiki - Stats and Build</h1>

        <Row className='custom-row'>
          <Col md={3} className='d-none d-md-block d-lg-block'>
            <div className='w-100  side-char-list'>
              {chars&&(chars.map(char => (
                <CharsListItemRow char={char} />
              )))}
            </div>
          </Col>
          
          <Col md={9} className='desktop-char-row'>

            <Row className='custom-row'>
              <CharPageProfileImg rarity={char.rarity} slug={char.slug} />
              
              <Col xs={9}>
                <div className='char-detail-bg'>
                  <div className='char-name-div'>
                    <div  
                    className='char-name-bg-img d-flex pb-1-mobile justify-content-between align-items-center'>
                      <div className='d-flex align-items-center'>
                        {char&&(
                          <Image className='role-img mx-1' alt='role-img' width={20} height={20} src={`https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/roles%2F${char.role}.png?alt=media`} />
                        )}
                        <h2 className='mt-1 char-name'>{char.name}</h2>
                      </div>
                      {(windowWidth.current < 768)?(
                        <div className='d-flex justify-content-start flex-wrap'>
                          {char.factions&&(char.factions.map(faction => (
                            factions.filter(x => x.title === faction).length>0&&(   
                              <FactionImage 
                                faction={factions.filter(x => x.title === faction)[0]} 
                                chars={chars.sort((a, b) => {return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);})}
                              />
                            )
                          )))}
                        </div>
                      ):(
                        <div className='char-cut-div d-flex align-items-center'>
                          {char&&(
                            <Image className='char-cut-img' src={`https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/chars%2F${char.slug}_cut.png?alt=media`} alt='char-cut' width={"inherit"} height={"inherit"} />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {windowWidth.current > 768 &&(
                    <div className='d-flex justify-content-start flex-wrap mx-1'>
                      {char.factions&&(char.factions.map(faction => (
                        factions.filter(x => x.title === faction).length>0&&(
                        <FactionTitle 
                          faction={factions.filter(x => x.title === faction)[0]} 
                          chars={chars.sort((a, b) => {return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);})}
                        />
                      ))))}
                    </div>
                  )}

                  <div className='black-label-div'>
                    <h5>
                      STATS
                    </h5>
                  </div>
                  <Row className='custom-row'>
                    <Col md={8} >
                      <div className='d-flex justify-content-center flex-wrap'>
                        {char.base_stats&&(char.base_stats.map(stat => (
                          <StatsItem role={char.role} stat={stat} chars={chars} trait_buff={char.trait_buff} />
                        )))}
                      </div>
                    </Col>
                    <Col md={4}>
                      {char.move_stats&&(char.move_stats.map(stat => (
                        <StatsItemMove stat={stat} />
                      )))}
                    </Col>
                  </Row>
                </div>

              </Col>
            </Row>
            
            <div className='black-label-div mt-2'>
              <h5>
                TRAIT
              </h5>
            </div>
            {char.trait&&(
              <CharTrait blueEffects={blueEffects} trait={trait} chars={chars} />
            )}

            <div className='black-label-div mt-2'>
              <h5>
                INITIAL SKILLS
              </h5>
            </div>
            <div className='w-100'>

            </div>
            <Row>
              <Col>
                {charSkills.length>0&&(charSkills.filter(x => x.slug===char.basic).length>0&&(
                  <CharSkill blueEffects={blueEffects} chars={chars}
                  skill={charSkills.filter(x => x.slug===char.basic)[0]} />
                ))}
              </Col>
              <Col>
                {charSkills.length>0&&(charSkills.filter(x => x.slug===char.skill).length>0&&(
                  <CharSkill blueEffects={blueEffects}  chars={chars}
                  skill={charSkills.filter(x => x.slug===char.skill)[0]} />
                ))}
              </Col>
            </Row>
            
            <CharPageSkillTree 
              blueEffects={blueEffects} factions={factions} charSkills={charSkills} windowWidth={windowWidth}
              skill_tree_label1={char.skill_tree_label1} skill_tree_label2={char.skill_tree_label2}
              skill_tree={char.skill_tree} chars={chars}
            />

            {char.other_skills&&char.other_skills.length>0&&(
              <>
                <div className='black-label-div mt-2' id='skills'>
                  <h5>
                    OTHER SKILLS
                  </h5>
                </div>
                <div className='d-flex flex-wrap'>
                  {char.other_skills.map(slug=>(charSkills.length>0&&(
                    charSkills.filter(x => x.slug===slug).length>0&&(
                      <SkillListItem blueEffects={blueEffects} chars={chars}
                      skill={charSkills.filter(x => x.slug===slug)[0]} />
                    )
                  )))}
                </div>
              </>
            )}

            {char.weapon_rec&&(
              <>
                <div className='black-label-div mt-2'>
                  <h5>
                    GEAR RECOMENDATIONS
                  </h5>
                </div>
                <div className='gear-rec-bg d-flex align-items-center mt-3'
                style={{"marginBottom": "0.5rem"}}
                onClick={() => setShowWeapons(!showWeapons)}>
                  <div className='w-100 text-center gear-rec-label'>
                    {showWeapons?("▲Weapons▲"):("▼Weapons")}
                  </div>
                  {!showWeapons&&char.weapon_rec&&(charGears.length>0&&(char.weapon_rec.map(rec => (
                    charGears.filter(x => x.img === rec).length>0&&(
                      <div className='trait-title d-flex align-items-center ardela'>
                        <Gearicon gear={charGears.filter(x => x.img === rec)[0]} css={"gear-rec-icon"}/>
                      </div>
                    )
                  ))))}
                </div>
                {showWeapons&&(
                  <div className='d-flex flex-wrap'>
                    {char.weapon_rec&&(charGears.length>0&&(char.weapon_rec.map(rec => (
                      charGears.filter(x => x.img === rec).length>0&&(
                        <GearsListItem gear={charGears.filter(x => x.img === rec)[0]}/>
                      )
                    ))))}
                  </div>
                )}
                <div className='gear-rec-bg d-flex align-items-center'
                style={{"marginBottom": "0.5rem"}}
                onClick={() => setShowArmor(!showArmor)}>
                  <div className='w-100 text-center gear-rec-label'>
                    {showArmor?("▲Trinkets▲"):("▼Trinkets")}
                  </div>
                  {!showArmor&&char.armor_rec&&(charGears.length>0&&(char.armor_rec.map(rec => (
                    charGears.filter(x => x.img === rec).length>0&&(
                      <div className='trait-title d-flex align-items-center'>
                        <Gearicon gear={charGears.filter(x => x.img === rec)[0]} css={"gear-rec-icon"} />
                      </div>
                    )
                  ))))}
                </div>
                {showArmor&&(
                  <div className='d-flex flex-wrap'>
                    {char.armor_rec&&(charGears.length>0&&(char.armor_rec.map(rec => (
                      charGears.filter(x => x.img === rec).length>0&&(
                        <GearsListItem gear={charGears.filter(x => x.img === rec)[0]}/>
                      )
                    ))))}
                  </div>
                )}
                <div className='gear-rec-bg d-flex align-items-center'
                style={{"marginBottom": "0.5rem"}}
                onClick={() => setShowTarots(!showTarots)}>
                  <div className='w-100 text-center gear-rec-label'>
                    {showTarots?("▲Tarots▲"):("▼Tarots")}
                  </div>
                  {!showTarots&&char.tarot_rec&&(charTarots.length>0&&(char.tarot_rec.map(rec => (
                    charTarots.filter(x => x.slug === rec).length>0&&(
                      <div className='trait-title d-flex align-items-center'>
                        <div class="trait-img-container m-1" >
                          <Image src={`https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/tarot%2F${charTarots.filter(x=> x.slug===rec)[0].img}.png?alt=media`}
                          alt='tarot_img' className="trait-img" />
                        </div>
                      </div>
                    )
                  ))))}
                </div>
                {showTarots&&(
                  <div className='d-flex flex-wrap'>
                    {charTarots.length>0&&(char.tarot_rec.map(rec => (
                      charTarots.filter(x=> x.slug===rec).length>0&&(
                        <TarotsListItem tarot={charTarots.filter(x=> x.slug===rec)[0]} compact={true} />
                      )
                    )))}
                  </div>
                )}
              </>
            )}
             
            {char.engraving_1&&char.engraving_1[0]&&(
              <>
                <div className='black-label-div mt-2'>
                  Engravings
                </div>
                <h5 className='d-none'>
                  {char.name} ENGRAVING RECOMENDATIONS
                </h5>
                <Row className='custom-row'>
                  {char.engraving_1[0]&&(
                    <Col md={6}>
                      <EngravingSingle x={Engravings.filter(x=>(
                        x.engravings.includes(char.engraving_1[0])&&x.engravings.includes(char.engraving_1[1])
                      ))[0]} />
                    </Col>
                  )}
                  {char.engraving_2&&(char.engraving_2[0]&&(
                    <Col md={6}>
                      <EngravingSingle x={Engravings.filter(x=>(
                        x.engravings.includes(char.engraving_2[0])&&x.engravings.includes(char.engraving_2[1])
                      ))[0]} />
                    </Col>
                  ))}

                </Row>
              </>
            )}

            {char.sources&&(
              <div className='sources-bg align-items-centerflex-wrap m-1'>
                <span className='source-txt'>Main research sources for Build & Recommendations: </span>
                {char.sources.map(source => (
                  <SourceItem source={charSources.filter(x=> x.title === source)[0]} />
                ))}
              </div>
            )}

            <CharPageArt slug={char.slug} cv_cn={char.cv_cn} cv_jp={char.cv_jp}
            rarity={char.rarity} biography={char.biography} title={char.title} />

          </Col>
        </Row>
      </Container>
    );
  }
}

export default CharPage;
import React, {useState, useEffect, useRef} from 'react';
import {Row,Col,Container,Image,Form,Modal} from 'react-bootstrap';
import Mongo from '../../mango'
import {useParams} from 'react-router-dom';
import {Helmet} from "react-helmet-async";
import StatsItem from './StatsItem';
import StatsItemMove from './StatsItemMove';
import FactionImage from './FactionImage';
import CharTrait from './CharTrait';
import CharSkill from './CharSkill';
import SkillTreeLV from './SkillTreeLV';
import CharsListItemRow from './CharsListItemRow';
import SkillTreeNew from './SkillTreeNew';
import SourceItem from './SourceItem';
import FactionTitle from './FactionTitle';
import SkillListItem from '../Skills/SkillListItem';
import GearsListItem from '../Gear/GearsListItem';
import TarotsListItem from '../Gear/TarotsListItem';
import { orbit } from 'ldrs'

function CharPage() {

  const id = useParams().id
  const [char, setChar] = useState()
  const [reversedSkillTree, setReversedSkillTree] = useState([])
  const windowWidth = useRef(window.innerWidth);
  const rarityOrder = ['Legendary', 'Epic', 'Rare', 'Common'];
  orbit.register()

  const [skillRec, setSkillRec] = useState(false)
  const [activeSkill, setActiveSkill] = useState()
  const [skillTreeView, setSkillTreeView] = useState(false)

  const [chars, setChars] = useState([])
  const [blueEffects, setBlueEffects] = useState([])
  const [factions, setFactions] = useState([])
  const [trait, setTrait] = useState()
  const [charSkills, setCharSkills] = useState([])
  const [charGears, setCharGears] = useState([])
  const [charTarots, setCharTarots] = useState([])
  const [charSources, setCharSources] = useState([])

  // FOR MOBILE ONLY MODAL
  const [show, setShow] = useState(false);
  const handleCloseModal = () => setShow(false);
  const handleShowModal = () => setShow(true);

  const handleOnClickSkill = (slug) => {
    if (windowWidth.current < 768) {
      setActiveSkill(slug)
      handleShowModal(true)
    } else {
      setActiveSkill(slug)
    }
  }
  const [art, setArt] = useState('');

  useEffect (() => {
    Mongo.find('chars')
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
      if (char.skill_tree) {
        setActiveSkill(char.skill_tree[0].skill0)
      }

      if (char.rarity === "Legendary") {setArt("Awaken")}
      else {setArt("Main")}

      if (char.skill_tree) {setReversedSkillTree(char.skill_tree.reverse())}

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
    const sprite = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/chars%2F${char.slug}.gif?alt=media`
    const awaken = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/chars%2F${char.slug}_awaken.png?alt=media`
    const full = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/chars%2F${char.slug}_full.png?alt=media`
    const profile = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/chars%2F${char.slug}_profile.png?alt=media`
    const role = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/roles%2F${char.role}.png?alt=media`
    const cut = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/chars%2F${char.slug}_cut.png?alt=media`

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
              <Col xs={3}>
                {char.rarity&&(
                  <div className='profile-img-div' style={{
                    backgroundImage: "url(" + require(`../assets/img/unit_bg_${char.rarity}.png`) + ")"
                  }}>
                    <Image className='profile-img' alt='profile-img' src={profile} width={"inherit"} height={"20rem"} />
                  </div>
                )}
              </Col>
              <Col xs={9}>
                <div className='char-detail-bg'>

                  <div className='char-name-div'>
                    <div  
                    className='char-name-bg-img d-flex pb-1-mobile justify-content-between align-items-center'>
                      <div className='d-flex align-items-center'>
                        <Image className='role-img mx-1' alt='role-img' width={20} height={20} src={role} />
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
                          <Image className='char-cut-img' src={cut} alt='char-cut' width={"inherit"} height={"inherit"} />
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
                    <Col md={6} >
                      <div className='d-flex justify-content-center flex-wrap'>
                        {char.base_stats&&(char.base_stats.map(stat => (
                          <StatsItem stat={stat} chars={chars} />
                        )))}
                      </div>
                    </Col>
                    <Col md={6}>
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
            
            <div className='black-label-div mt-2'>
              <h5>
                SKILL TREE
              </h5>
            </div>

            <div className='d-flex justify-content-around flex-wrap m-1 bg-lighter'>
              <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                label="Show Skill Recomendations"
                onClick={() => setSkillRec(!skillRec)}
              />
              <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                label="Show All Skills Effects"
                onClick={() => setSkillTreeView(!skillTreeView)}
              />
            </div>
            
            {skillRec&&(
              <div className='d-flex mb-2 rec-bg align-items-center'>
                <div className='bg-lighter mx-1 px-2'>
                  <b className='rec-label-color bg-op'>▉</b><span className='rec-label' >Optional</span>
                  <b className='rec-label-color bg-rec'>▉</b><span className='rec-label' >Highly Recommended</span>
                </div>
              </div>
            )}

            {!skillTreeView?(
              <Row>
                <Col md={6}>
                  {char.skill_tree_label1&&(
                    <div className=''>
                      <div className='d-flex w-100 text-center'>
                        <div className='skilltree-label skilltree-label-left'>
                          {char.skill_tree_label1}
                        </div>
                        <div className='skilltree-label skilltree-label-right'>
                          {char.skill_tree_label2}
                        </div>
                      </div>
                    </div>
                  )}
                  {reversedSkillTree&&(reversedSkillTree.map((lv, index) => (
                      charSkills.length>0&&(
                        <SkillTreeNew blueEffects={blueEffects} skillRec={skillRec} handleOnClickSkill={handleOnClickSkill} activeSkill={activeSkill}
                        lv={lv} index={index} last={char.skill_tree&&(char.skill_tree.length)} charSkills={charSkills} />
                      )
                  )))}
                  
                  {/* MOBILE ONLY MODAL */}
                  <Modal show={show}  onHide={handleCloseModal}>
                    <Modal.Header className='skill-modal' closeButton>
                      
                    </Modal.Header>
                    <div>
                      {charSkills.length>0&&(
                        charSkills.filter(x => x.slug===activeSkill).length>0&&(
                          <SkillListItem blueEffects={blueEffects} chars={chars} w100={true}
                          skill={charSkills.filter(x => x.slug===activeSkill)[0]} />
                        )
                      )}
                    </div>
                  </Modal>
                </Col>
                <Col md={6} className='d-none d-md-block d-lg-block'>
                  {charSkills.length>0&&activeSkill&&(
                    charSkills.filter(x => x.slug===activeSkill).length>0&&(
                      <SkillListItem blueEffects={blueEffects} chars={chars} w100={true}
                      skill={charSkills.filter(x => x.slug===activeSkill)[0]} />
                    )
                  )}
                </Col>
              </Row>
            ):(
              <>  
                {char.skill_tree_label1&&(
                  <div className='d-none d-md-block'>
                    <div className='d-flex w-100 text-center'>
                      <div className='skilltree-label skilltree-label-left'>
                        {char.skill_tree_label1}
                      </div>
                      <div className='skilltree-label skilltree-label-right'>
                        {char.skill_tree_label2}
                      </div>
                    </div>
                  </div>
                )}
                {reversedSkillTree&&(reversedSkillTree.map((lv, index) => (
                  charSkills.length>0&&(
                    <SkillTreeLV blueEffects={blueEffects} skillRec={skillRec} lv={lv} chars={chars}
                    index={index} last={char.skill_tree&&(char.skill_tree.length)} charSkills={charSkills} />
                  )
                )))}
              </>
            )}


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
                <Row className='custom-row'>
                  <Col md={4}>
                    <div className='skill-detail-bg trait-title text-center '>Weapon</div>
                    {char.weapon_rec&&(charGears.length>0&&(char.weapon_rec.map(rec => (
                      charGears.filter(x => x.img === rec).length>0&&(
                        <GearsListItem gear={charGears.filter(x => x.img === rec)[0]} sideMenu={true} />
                      )
                    ))))}
                  </Col>
                  <Col md={4}>
                    <div className='skill-detail-bg trait-title text-center '>Trinket</div>
                    {char.armor_rec&&(charGears.length>0&&(char.armor_rec.map(rec => (
                      charGears.filter(x => x.img === rec).length>0&&(
                        <GearsListItem gear={charGears.filter(x => x.img === rec)[0]} sideMenu={true} />
                      )
                    ))))}
                  </Col>
                  <Col md={4}>
                    <div className='skill-detail-bg trait-title text-center '>Tarot</div>
                    {charTarots.length>0&&(char.tarot_rec.map(rec => (
                      charTarots.filter(x=> x.slug===rec).length>0&&(
                        <TarotsListItem tarot={charTarots.filter(x=> x.slug===rec)[0]} sideMenu={true} compact={true} />
                      )
                    )))}
                  </Col>
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

            <div className='black-label-div mt-2'>
              <h5>
                ART
              </h5>
            </div>
            
            <div className='ligter-bg'>
              <Row>
                <Col md={8} >
                  <div className='d-flex'>
                    {char.rarity==="Legendary"&&(
                      <div className={`art-bg mx-1 px-2 ardela ${(art==="Awaken")&&('art-active')}`}
                       onClick={() => setArt("Awaken")}>Awaken</div>
                    )}
                    <div className={`art-bg mx-1 px-2 ardela ${(art==="Main")&&('art-active')}`}
                     onClick={() => setArt("Main")}>Main Art</div>
                  </div>
                  
                  {(art==="Awaken")&&(
                    <div className='art-img-div'>
                      <Image className='art-img' src={awaken} alt={char.slug+"_awaken_art"} width={"auto"} height={"auto"} />
                    </div>
                  )}
                  {(art==="Main")&&(
                    <div className='d-flex justify-content-center'>
                      <Image className='art-img-full' src={full} alt={char.slug+"_full_art"} width={"auto"} height={"auto"} />
                    </div>
                  )}
                </Col>
                <Col>
                  {char.biography?(  
                    <div className='char-bio'>
                      <h3 className='mx-2'>Biography</h3>
                      <img src={sprite} alt={char.slug+"_sprite_idle"} width={"auto"} height={"auto"} onClick={() =>  navigator.clipboard.writeText(char._id)}
                      className="pixel-bio"/>
                      <p className='char-bio-txt' dangerouslySetInnerHTML={{__html: char.biography}}></p>
                    </div>
                  ):(
                    <img src={sprite} onClick={() =>  navigator.clipboard.writeText(char._id)}
                    alt={char.slug+"_sprite_idle"} width={"auto"} height={"auto"} class="pixel-bio"/>
                  )}
                </Col>
              </Row>
              
            </div>

          </Col>
        </Row>
      </Container>
    );
  } else return(
    <l-orbit
      size="35"
      speed="1.5" 
      color="black" 
    ></l-orbit>
  )
}

export default CharPage;
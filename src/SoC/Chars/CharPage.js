import React, {useState, useEffect, useRef} from 'react';
import {Row,Col,Container,Image,Form,Modal} from 'react-bootstrap';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {Helmet} from "react-helmet";
import StatsItem from './StatsItem';
import StatsItemMove from './StatsItemMove';
import FactionImage from './FactionImage';
import CharTrait from './CharTrait';
import CharSkill from './CharSkill';
import SkillTreeLV from './SkillTreeLV';
import CharsListItemRow from './CharsListItemRow';
import SkillTreeNew from './SkillTreeNew';
import GetActiveSkill from './GetActiveSkill';
import GetGearItem from '../Gear/GetGearItem';
import GetTarotItem from '../Gear/GetTarotItem';
import SourceItem from './SourceItem';
import FactionTitle from './FactionTitle';

function CharPage() {
  const id = useParams().id
  const [char, setChar] = useState([])
  const [reversedSkillTree, setReversedSkillTree] = useState([])
  const windowWidth = useRef(window.innerWidth);
  const rarityOrder = ['Legendary', 'Epic', 'Rare', 'Common'];

  const [skillRec, setSkillRec] = useState(false)
  const [activeSkill, setActiveSkill] = useState()
  const [skillTreeView, setSkillTreeView] = useState(false)

  const [chars, setChars] = useState([])
  const [blueEffects, setBlueEffects] = useState([])

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
    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/find",
      data: {"collection":"chars","database":"soc","dataSource":"Sword"}
    }).then(res => {
      setChars(res.data.documents)
    }).catch(err => console.warn(err));

    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/find",
      data: {"collection":"chars","database":"soc","dataSource":"Sword", 
        "filter": {
          "color": "blue"
        }}
    }).then(res => {
      setBlueEffects(res.data.documents)
    }).catch(err => console.warn(err));
  }, [])

  useEffect(() => {
    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/findOne",
      data: {"collection":"chars","database":"soc","dataSource":"Sword", 
        "filter": {
          "slug": id
        }}
    }).then(res => {
      setChar(res.data.document)
    }).catch(err => console.warn(err));
    
    window.scrollTo(0, 0)
  }, [id]);

  useEffect(() => {
    if (char) {
      if (char.skill_tree) {
        setActiveSkill(char.skill_tree[0].skill0)
      }
      if (char.rarity === "Legendary") {
        setArt("Awaken")
      } else {
        setArt("Main")
      }
      if (char.skill_tree) {
        setReversedSkillTree(char.skill_tree.reverse())
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
            <title>{char.name} Stats and Build - SoC Wiki</title>
            <meta name="description" content={`${char.name}Skills Recommendations and Priority, Recommended Gear, Tarots, Weapons, and Trinkets. Stats comparison and Trait Detail. - Sword of Convallaria Wiki Database`} />
          </Helmet>
        )}
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
                    <Image className='profile-img' src={profile} />
                  </div>
                )}
              </Col>

              <Col xs={9}>
                <div className='char-detail-bg'>

                  <div className='char-name-div'>
                    <div  
                    className='char-name-bg-img d-flex pb-1-mobile justify-content-between align-items-center'>
                      <div className='d-flex align-items-center'>
                        <Image className='role-img mx-1' src={role} />
                        <h2 className='mt-1 char-name'>{char.name}</h2>
                      </div>
                      {(windowWidth.current < 768)?(
                        <div className='d-flex justify-content-start flex-wrap'>
                          {char.factions&&(char.factions.map(faction => (
                            <FactionImage slug={faction} chars={chars.sort((a, b) => {
                              return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
                            })} />
                          )))}
                        </div>
                      ):(
                        <div className='char-cut-div d-flex align-items-center'>
                          <Image className='char-cut-img' src={cut} />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {windowWidth.current > 768 &&(
                    <div className='d-flex justify-content-start flex-wrap mx-1'>
                      {char.factions&&(char.factions.map(faction => (
                        <FactionTitle slug={faction} chars={chars.sort((a, b) => {
                          return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
                        })} />
                      )))}
                    </div>
                  )}

                  <div className='black-label-div'>
                    STATS
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
              TRAIT
            </div>
            {char.trait&&(
              <CharTrait blueEffects={blueEffects} slug={char.trait} chars={chars} />
            )}

            <div className='black-label-div mt-2'>
              INITIAL SKILLS
            </div>
            <div className='w-100'>

            </div>
            <Row>
              <Col>
                {char.basic&&(
                  <CharSkill blueEffects={blueEffects} slug={char.basic} chars={chars} />
                )}
              </Col>
              <Col>
                {char.skill&&(
                  <CharSkill blueEffects={blueEffects} slug={char.skill}  chars={chars}/>
                )}
              </Col>
            </Row>
            
            <div className='black-label-div mt-2'>
              SKILL TREE
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
                    <SkillTreeNew blueEffects={blueEffects} skillRec={skillRec} handleOnClickSkill={handleOnClickSkill} activeSkill={activeSkill}
                    lv={lv} index={index} last={char.skill_tree&&(char.skill_tree.length)} />
                    // <SkillTreeLV blueEffects={blueEffects} skillRec={skillRec} lv={lv} index={index} last={char.skill_tree&&(char.skill_tree.length)} />
                  )))}
                  
                  {/* MOBILE ONLY MODAL */}
                  <Modal show={show}  onHide={handleCloseModal}>
                    <Modal.Header className='skill-modal' closeButton>
                      
                    </Modal.Header>
                    <div>
                      <GetActiveSkill slug={activeSkill} blueEffects={blueEffects} chars={chars} w100={true} />
                    </div>
                  </Modal>
                </Col>
                <Col md={6} className='d-none d-md-block d-lg-block'>
                  {activeSkill&&(
                    <GetActiveSkill slug={activeSkill} blueEffects={blueEffects} chars={chars} w100={true} />
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
                  <SkillTreeLV blueEffects={blueEffects} skillRec={skillRec} lv={lv} chars={chars}
                  index={index} last={char.skill_tree&&(char.skill_tree.length)} />
                )))}
              </>
            )}


            {char.other_skills&&char.other_skills.length>0&&(
              <>
                <div className='black-label-div mt-2' id='skills'>
                  OTHER SKILLS
                </div>
                <div className='d-flex flex-wrap'>
                  {char.other_skills.map(skill=>(
                    <GetActiveSkill slug={skill} blueEffects={blueEffects} chars={chars}  />
                  ))}
                </div>
              </>
            )}

            {char.weapon_rec&&(
              <>
                <div className='black-label-div mt-2'>
                  GEAR RECOMENDATIONS
                </div>
                <Row className='custom-row'>
                  <Col md={4}>
                    <div className='skill-detail-bg trait-title text-center '>Weapon</div>
                    {char.weapon_rec.map(rec => (
                      <GetGearItem id={rec} />
                    ))}
                  </Col>
                  <Col md={4}>
                    <div className='skill-detail-bg trait-title text-center '>Trinket</div>
                    {char.armor_rec.map(rec => (
                      <GetGearItem id={rec} />
                    ))}
                  </Col>
                  <Col md={4}>
                    <div className='skill-detail-bg trait-title text-center '>Tarot</div>
                    {char.tarot_rec.map(rec => (
                      <GetTarotItem id={rec} />
                    ))}
                  </Col>
                </Row>
              </>
            )}

            {char.sources&&(
              <div className='sources-bg align-items-centerflex-wrap m-1'>
                <span className='source-txt'>Main research sources for Build & Recommendations: </span>
                {char.sources.map(source => (
                  <SourceItem sourceTitle={source} />
                ))}
              </div>
            )}

            <div className='black-label-div mt-2'>
              ART
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
                      <Image className='art-img' src={awaken} />
                    </div>
                  )}
                  {(art==="Main")&&(
                    <div className='d-flex justify-content-center'>
                      <Image className='art-img-full' src={full} />
                    </div>
                  )}
                </Col>
                <Col>
                  {char.biography?(  
                    <div className='char-bio'>
                      <h3 className='mx-2'>Biography</h3>
                      <img src={sprite} alt="Description" className="pixel-bio"/>
                      <p className='char-bio-txt' dangerouslySetInnerHTML={{__html: char.biography}}></p>
                    </div>
                  ):(
                    <img src={sprite} alt="Description" class="pixel-bio"/>
                  )}
                </Col>
              </Row>
              
            </div>

          </Col>
        </Row>
      </Container>
    );
  }
}

export default CharPage;
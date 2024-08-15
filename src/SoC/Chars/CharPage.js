import React, {useState, useEffect} from 'react';
import {Row,Col, Container, Image, Button} from 'react-bootstrap';
import { doc, onSnapshot, query, collection, where} from 'firebase/firestore';
import {useParams} from 'react-router-dom';
import db from '../../firebase';
import StatsItem from './StatsItem';
import StatsItemMove from './StatsItemMove';
import FactionImage from './FactionImage';
import CharTrait from './CharTrait';
import CharSkill from './CharSkill';
import SkillTreeLV from './SkillTreeLV';
import CharsListItemRow from './CharsListItemRow';

function CharPage() {
  const id = useParams().id
  const [char, setChar] = useState([])
  const sprite = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/chars%2F${char.slug}.gif?alt=media`
  const profile = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/chars%2F${char.slug}_profile.png?alt=media`
  const role = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/roles%2F${char.role}.png?alt=media`

  const [skillRec, setSkillRec] = useState(false)

  const [chars, setChars] = useState([])
  function compare( a, b ) {
    if ( a.id < b.id ){
      return -1;
    }
    if ( a.id > b.id ){
      return 1;
    }
    return 0;
  }
  useEffect (() => {
    onSnapshot(query(collection(db, `games/soc/chars`), where("rarity","==","Legendary")), (snapshot) => {
      setChars(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])

  useEffect(() => {
    onSnapshot(doc(db, "games/soc/chars/", id), (doc) => {
      setChar(doc.data());
    });
  }, [id]);


  if (char) {
    return (
      <Container className='char-container py-2'>
        <Row className='custom-row'>
          <Col md={3} className='d-none d-md-block d-lg-block'>
            <div className='char-list-div w-100  side-char-list'>
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
                    backgroundImage: "url(" + require(`../assets/img/recruit_bg_${char.rarity}.png`) + ")"
                  }}>
                    <Image className='profile-img' src={profile} />
                  </div>
                )}
              </Col>

              <Col xs={9}>
                <div className='char-detail-bg'>

                  <div className='d-flex justify-content-between pb-1 align-items-center char-name-div'>
                    <div className='d-flex align-items-center'>
                      <Image className='role-img mx-1' src={role} />
                      <h2 className='mt-1 char-name'>{char.name}</h2>
                    </div>
                    <div className='d-flex justify-content-start flex-wrap'>
                      {char.factions&&(char.factions.map(faction => (
                        <FactionImage slug={faction} />
                      )))}
                    </div>
                  </div>

                  

                  <div className='black-label-div'>
                    STATS
                  </div>
                  <Row>
                    <Col md={6} >
                      <div className='d-flex justify-content-center flex-wrap'>
                        {char.base_stats&&(char.base_stats.map(stat => (
                          <StatsItem stat={stat} base={true} />
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
              <CharTrait slug={char.trait} />
            )}

            <div className='black-label-div mt-2'>
              INITIAL SKILLS
            </div>
            <div className='w-100'>

            </div>
            <Row>
              <Col>
                {char.basic&&(
                  <CharSkill slug={char.basic} />
                )}
              </Col>
              <Col>
                {char.skill&&(
                  <CharSkill slug={char.skill} />
                )}
              </Col>
            </Row>
            
            <div className='black-label-div mt-2'>
              SKILL TREE
            </div>

            <div className='d-flex justify-content-center m-1'>
              <Button onClick={() => setSkillRec(!skillRec)} 
              className={`show-rec-btn ${skillRec&&("show-rec-btn-active")}`}>
                Show Skill Recomendations
              </Button>
            </div>

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

            {char.skill_tree&&(char.skill_tree.map((lv, index) => (
              <SkillTreeLV skillRec={skillRec} lv={lv} index={index} last={char.skill_tree&&(char.skill_tree.length)} />
            )))}
            
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CharPage;
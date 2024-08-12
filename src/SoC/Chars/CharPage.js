import React, {useState, useEffect} from 'react';
import {Row,Col, Container, Image} from 'react-bootstrap';
import { doc, onSnapshot,query, collection} from 'firebase/firestore';
import {useParams} from 'react-router-dom';
import db from '../../firebase';
import StatsItem from './StatsItem';
import StatsItemMove from './StatsItemMove';
import FactionImage from './FactionImage';
import CharTrait from './CharTrait';
import CharSkill from './CharSkill';

function CharPage() {
  const id = useParams().id
  const [char, setChar] = useState([])
  const sprite = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/chars%2F${char.slug}.gif?alt=media`
  const profile = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/chars%2F${char.slug}_profile.png?alt=media`
  const role = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/roles%2F${char.role}.png?alt=media`

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
  // useEffect (() => {
  //   onSnapshot(query(collection(db, `games/soc/chars`)), (snapshot) => {
  //     setChars(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
  //   });
  // }, [])

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
            {/* <CharSideMenu id={id} chars={chars.sort(compare)} /> */}
            Chars List
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
            {char.basic&&(
              <CharSkill slug={char.basic} />
            )}
            
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CharPage;
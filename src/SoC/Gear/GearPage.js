import React, {useState, useEffect} from 'react';
import { doc, onSnapshot} from 'firebase/firestore';
import {useParams} from 'react-router-dom';
import db from '../../firebase';
import { Col, Container, Image,Row } from 'react-bootstrap';
import EffectTxt from '../Effect/EffectTxt';

function GearPage() {
  const id = useParams().id
  const [gear, setGear] = useState([])
  
  useEffect(() => {
    onSnapshot(doc(db, "games/soc/gears/", id), (doc) => {
      setGear(doc.data());
    });
  }, [id]);
  
  if (gear) {
    const gear_img = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/gear%2Fweapon_full_${gear.img&&(gear.img.replace('weapon_',''))}.png?alt=media`

    return (
      <Container className='new-container'>
        <Row className='custom-row'>
          <Col md={9}>
            <div className={`skill-detail-bg mx-1`}>
              <div className={`skill-detail-div `}>
                <Row>
                  <Col>
                    <Image src={gear_img} />
                  </Col>
                  <Col>
                    <b className='trait-title-txt gear-title'>
                      {gear.title}
                    </b>
                  </Col>
                </Row>
              
                <div className='mx-2 text-center'>
                  <EffectTxt text={gear.skill}/>
                </div>

              </div>
            </div>
          </Col>
          {/* <Col md={3}>
            <div className='black-label-div'>
              Other Events
            </div>
            <EventsList side={true} />
          </Col> */}
        </Row>
        
      </Container>
    );
  }
}

export default GearPage;
import React, {useState, useEffect} from 'react';
import { doc, onSnapshot, where, query, collection, limit} from 'firebase/firestore';
import {useParams} from 'react-router-dom';
import db from '../../firebase';
import { Col, Container, Image,Row } from 'react-bootstrap';
import EffectTxt from '../Effect/EffectTxt';
import CharFace from '../Chars/CharFace';
import GearsListItem from './GearsListItem';

function GearPage() {
  const id = useParams().id
  const [gear, setGear] = useState([])
  const [chars, setChars] = useState([])
  const [gears, setGears] = useState([])

  useEffect(() => {
    onSnapshot(doc(db, "games/soc/gears/", id), (doc) => {
      setGear(doc.data());
    });
  }, [id]);

  useEffect(() => {
    if (gear.type) {
      onSnapshot(query(collection(db, `/games/soc/chars`), where('weapon_type', '==', gear.type)), (snapshot) => {
        setChars(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
      })
    }
    if (gear.img) {
      onSnapshot(query(collection(db, `/games/soc/gears`), where("img", ">", gear.img), limit(3)), (snapshot) => {
        setGears(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
      });
    }
  }, [gear]);

  
  
  if (gear.rarity) {
    const gear_full_img = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/gear%2Fweapon_full_${gear.img&&(gear.img.replace('weapon_',''))}.png?alt=media`
    const gear_img = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/gear%2F${gear.img}.png?alt=media`
    const bg = require(`../assets/img/face_bg_${gear.rarity&&(gear.rarity)}.png`)
    const border = require(`../assets/img/face_border_${gear.rarity&&(gear.rarity)}.png`)

    return (
      <Container className='new-container'>
        <Row className='custom-row'>
          <Col md={9}>
            <div className={`skill-detail-bg mx-1 d-flex`}>
              <Image className='gear-img d-none d-md-block d-lg-block' src={gear_full_img} />

              <div className={`skill-detail-div text-center w-100`}>

                <div className='trait-div d-flex align-items-center mx-1'>
                  <div className='trait-title d-flex align-items-center'>
                    <div class="trait-img-container m-1">
                      <Image src={bg} alt='bg' className="trait-img background" />
                      <Image src={gear_img} alt='gear_img'  className="trait-img foreground" />
                      <Image src={border} alt='border'  className="trait-img char-face-border" />
                    </div>
                    <b className='trait-title-txt gear-title'>
                      {gear.title}
                    </b>
                  </div>
                </div>


                <div>
                  Skill
                </div>
                <div className='mx-2 text-center bg-lighter'>
                  <EffectTxt text={gear.skill}/>
                </div>

                {gear.desc&&(
                  <div className='gear-desc mt-2'>
                    Description
                    <div className='mx-2 text-center bg-lighter'>
                      {gear.desc}
                    </div>
                  </div>
                )}

                <div className='mt-2'>
                  Source
                </div>
                <div className='mx-2 text-center bg-lighter mb-2'>
                  {gear.source}
                </div>
              </div>
            </div>
            
            {gear.type!="Armor"&&(
              <>
                <div className='black-label-div mt-2'>
                  Werable Characters
                </div>
                <div className='d-flex flex-wrap justify-content-center'>
                  {chars&&(chars.map(char => (
                    <CharFace char={char} />
                  )))}
                </div>
              </>
            )}
          </Col>
          <Col md={3}>
            <div className='black-label-div'>
              Other Gears
            </div>
            {gears.map(gear => (
              <GearsListItem gear={gear} sideMenu={true} />
            ))}
          </Col>
        </Row>
        
      </Container>
    );
  }
}

export default GearPage;
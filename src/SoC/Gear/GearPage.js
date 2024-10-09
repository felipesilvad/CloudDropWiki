import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Helmet} from "react-helmet";
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
    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/findOne",
      data: {"collection":"gears","database":"soc","dataSource":"Sword", 
      "filter": {
          "img": id
        }
      }
    }).then(res => {
      setGear(res.data.document)
    }).catch(err => console.warn(err));

    window.scrollTo(0, 0)
  }, [id]);

  useEffect(() => {
    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/find",
      data: {"collection":"chars","database":"soc","dataSource":"Sword",
        "filter": {
          "weapon_type": gear.type
        }
      }
    }).then(res => {
      setChars(res.data.documents)
    }).catch(err => console.warn(err));

    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/find",
      data: {"collection":"gears","database":"soc","dataSource":"Sword","limit":4,
        "filter": {
          "img": { $gt: gear.img }
        }
      }
    }).then(res => {
      setGears(res.data.documents)
    }).catch(err => console.warn(err));
  }, [gear]);

  
  
  if (gear.rarity) {
    const gear_full_img = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/gear%2Fweapon_full_${gear.img&&(gear.img.replace('weapon_',''))}.png?alt=media`
    const gear_img = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/gear%2F${gear.img}.png?alt=media`
    const bg = require(`../assets/img/face_bg_${gear.rarity&&(gear.rarity)}.png`)
    const border = require(`../assets/img/face_border_${gear.rarity&&(gear.rarity)}.png`)

    return (
      <Container className='new-container'>
        {gear&&(
          <Helmet>
            <title>{gear.title} - SoC Wiki</title>
            <meta name="description" content={`Sword of Convallaria Gear Stat & Effects, Where to get ${gear.title} Equipment`} />
          </Helmet>
        )}
        <Row className='custom-row'>
          <Col md={9}>
            <div className={`skill-detail-bg mx-1 d-flex`}>
              <Image className='gear-img d-none d-md-block d-lg-block' src={gear_full_img} />

              <div className={`skill-detail-div text-center w-100`}>

                <div className='trait-div d-flex align-items-center mx-1'>
                  <div className='trait-title d-flex align-items-center'>
                    <div className="trait-img-container m-1">
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
                  <EffectTxt text={gear.skill} chars={chars}/>
                </div>

                <div className='gear-desc mt-2'>
                  Description
                  <div className='mx-2 text-center bg-lighter'>
                    {gear.desc}
                  </div>
                </div>

                <div className='mt-2'>
                  Source
                </div>
                <div className='mx-2 text-center bg-lighter mb-2'>
                  {gear.source}
                </div>
              </div>
            </div>
            
            {gear.type!=="Armor"&&(
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
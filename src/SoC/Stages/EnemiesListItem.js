import React from 'react';
import { Image } from 'react-bootstrap';
import {Row, Col} from 'react-bootstrap';
import GetTraitDoc from '../Skills/GetTraitDoc';

function EnemiesListItem({enemy, blueEffects}) {

  const enemy_img = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/enemy%2F${enemy.img}.png?alt=media`

  if (enemy) {
    return (
      <div className='w-100'>
        <div className='skill-detail-bg trait-title text-center '>{enemy.stage}</div>
        <Row>
          <Col md={4}>
            <Image alt={enemy_img} className='boss-img' src={enemy_img} />
            <div className='w-100 skill-detail-bg text-center'>
              {enemy.title}
            </div>
          </Col>
          <Col md={8}>
            <div className='d-flex flex-wrap'>
              {enemy.trait&&(
                <GetTraitDoc slug={enemy.trait} chars={[]} blueEffects={blueEffects} boss={true} />
              )}
              {/* {enemy.skills&&(enemy.skills.map(skill => (
                <GetActiveSkill slug={skill} chars={[]} blueEffects={blueEffects} />
              )))} */}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EnemiesListItem;
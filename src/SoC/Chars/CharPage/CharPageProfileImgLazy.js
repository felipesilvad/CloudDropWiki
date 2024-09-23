import React from 'react';
import {Col} from 'react-bootstrap';

function CharPageProfileImgLazy() {
  return (
    <Col xs={3}>
      <div className='profile-img-div animate-flicker' style={{
        backgroundImage: "url(" + require(`../../assets/img/unit_bg_Rare.png`) + ")"
      }}>
      </div>
    </Col>
  );
}

export default CharPageProfileImgLazy;
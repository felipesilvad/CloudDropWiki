import React from 'react';
import {Col, Image} from 'react-bootstrap';

function CharPageProfileImg({rarity, slug}) {
  const profile = `https://firebasestorage.googleapis.com/v0/b/cdwiki-73e46.appspot.com/o/chars%2F${slug}_profile.png?alt=media`
  return (
    <Col xs={3}>
      {rarity&&(
        <div className='profile-img-div' style={{
          backgroundImage: "url(" + require(`../../assets/img/unit_bg_${rarity}.png`) + ")"
        }}>
          <Image className='profile-img' alt='profile-img' src={profile} width={"inherit"} height={"20rem"} />
        </div>
      )}
    </Col>
  );
}

export default CharPageProfileImg;
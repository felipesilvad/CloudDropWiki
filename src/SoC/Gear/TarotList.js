import React, { useState, useEffect } from 'react';
import Mongo from '../../mango'
import {Helmet} from "react-helmet";
import {Container} from 'react-bootstrap';
import TarotsListItem from './TarotsListItem';

function TarotsList() {
  const [tarots, setTarots] = useState([])

  useEffect (() => {
    Mongo.find('tarots',{sort: {"series": 1}})
    .then(res => {
      setTarots(res.data.documents)
    }, function(err) {
      console.log(err);
    })
  }, [])

  return (
    <Container className='new-container'>
      <Helmet>
        <title>Tarot List - SoC Wiki</title>
        <meta name="description" content="Sword of Convallaria All Tarot Whisper Effects and Hidden Lv.60 Unlocked Effects" />
      </Helmet>
      <div className='d-flex flex-wrap'>
        {tarots&&(tarots.map(tarot => (
          <TarotsListItem tarot={tarot} />
        )))}
      </div>
    </Container>
  )
  
}

export default TarotsList;
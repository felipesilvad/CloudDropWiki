import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Helmet} from "react-helmet";
import {Container} from 'react-bootstrap';
import TarotsListItem from './TarotsListItem';

function TarotsList() {
  const [tarots, setTarots] = useState([])

  useEffect (() => {

    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/find",
      data: {"collection":"tarots","database":"soc","dataSource":"Sword", 
      "sort": {
          "series": 1
        }
      }
    }).then(res => {
      setTarots(res.data.documents)
    }).catch(err => console.warn(err));
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
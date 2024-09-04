import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Helmet} from "react-helmet";
import {Container} from 'react-bootstrap';
import EnemiesListItem from './EnemiesListItem';

function EnemiesList() {
  const [enemies, setEnemies] = useState([])
  const [blueEffects, setBlueEffects] = useState([])

  useEffect (() => {
    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/find",
      data: {"collection":"enemies","database":"soc","dataSource":"Sword"}
    }).then(res => {
      setEnemies(res.data.documents)
    }).catch(err => console.warn(err));
    axios({method: 'post',url: "https://sa-east-1.aws.data.mongodb-api.com/app/data-wzzmwsl/endpoint/data/v1/action/find",
      data: {"collection":"chars","database":"soc","dataSource":"Sword", 
        "filter": {
          "color": "blue"
        }}
    }).then(res => {
      setBlueEffects(res.data.documents)
    }).catch(err => console.warn(err));
  }, [])

  return (
    <Container className='new-container'>
      <Helmet>
        <title>Bosses List - SoC Wiki</title>
        <meta name="description" content="Sword of Convallaria All Bosses Skill & Stats Guide" />
      </Helmet>
      <div className='d-flex flex-wrap'>
        {enemies&&(enemies.map(enemy => (
          <EnemiesListItem enemy={enemy} blueEffects={blueEffects} />
        )))}
      </div>
    </Container>
  )
  
}

export default EnemiesList;
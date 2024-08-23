import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot, where} from "firebase/firestore"; 
import db from '../../firebase';
import {Helmet} from "react-helmet";
import {Container} from 'react-bootstrap';
import EnemiesListItem from './EnemiesListItem';

function EnemiesList() {
  const [enemies, setEnemies] = useState([])
  const [blueEffects, setBlueEffects] = useState([])

  useEffect (() => {
    onSnapshot(query(collection(db, `/games/soc/enemies`)), (snapshot) => {
      setEnemies(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
    onSnapshot(query(collection(db, `games/soc/effect_tags`), where("color","==","blue")), (snapshot) => {
      setBlueEffects(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
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
import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot, orderBy} from "firebase/firestore"; 
import db from '../../firebase';
import {Helmet} from "react-helmet";
import {Container} from 'react-bootstrap';
import TarotsListItem from './TarotsListItem';

function TarotsList() {
  const [tarots, setTarotTags] = useState([])

  useEffect (() => {
    onSnapshot(query(collection(db, `/games/soc/tarots`), orderBy("series")), (snapshot) => {
      setTarotTags(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });

  }, [])

  return (
    <Container className='new-container'>
      <Helmet>
        <title>Tarot List - SoC Wiki</title>
        <meta name="description" content="Sword of Convallaria All Tarot Effects" />
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
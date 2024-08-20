import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot} from "firebase/firestore"; 
import db from '../../firebase';
import {Container} from 'react-bootstrap';
import GearsListItem from './GearsListItem';

function GearsList() {
  const [gears, setGears] = useState([])

  useEffect (() => {
    onSnapshot(query(collection(db, `/games/soc/gears`)), (snapshot) => {
      setGears(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])

  const rarityOrder = ['Legendary', 'Epic', 'Rare', 'Common'];


  return (
    <Container className='new-container'>
      <div className='d-flex flex-wrap'>
        {gears.sort((a, b) => {
          const rarityComparison = rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
          if (rarityComparison !== 0) {
            return rarityComparison;
          }
        }).map(gear => (
          <GearsListItem gear={gear} />
        ))}
      </div>
    </Container>
  )
  
}

export default GearsList;
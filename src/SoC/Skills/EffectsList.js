import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot} from "firebase/firestore"; 
import db from '../../firebase';
import {Container, Table} from 'react-bootstrap';
import EffectTxt from '../Effect/EffectTxt';
import EffectTagTitle from '../Effect/EffectTagTitle';
function EffectsList() {
  const [effectTags, setEffectTags] = useState([])

  useEffect (() => {
    onSnapshot(query(collection(db, `/games/soc/effect_tags`)), (snapshot) => {
      setEffectTags(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });

  }, [])

  return (
    <Container className='new-container'>
      <div className='d-flex flex-wrap'>
        <Table striped bordered hover variant="dark">
          <tbody>
            {effectTags&&(effectTags.map(effect => (
              <tr>
                <td><EffectTagTitle text={effect.title} color={effect.color} /></td>
                <td><EffectTxt text={effect.txt} /></td>
              </tr>
            )))}
          </tbody>
        </Table>
      </div>
    </Container>
  )
  
}

export default EffectsList;